import { NextResponse } from "next/server";
import { z } from "zod";

import { sendToMake } from "@/lib/make";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { createAdminSupabase } from "@/lib/supabase/admin";
import { uid } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SESSION_COOKIE = "fm_sid";
const DEDUPE_WINDOW_MINUTES = 10;

const bodySchema = z.object({
  service_type: z.enum(["automation", "social_media", "card", "general"]),
  card_type: z.enum(["regular", "nfc"]).nullable().optional(),
  item_ref: z.string().max(160).nullable().optional(),
  item_title: z.string().max(240).nullable().optional(),
  quantity: z.number().int().min(1).max(100000).nullable().optional(),
  unit_price_mad: z.number().min(0).max(10_000_000).nullable().optional(),
  total_price_mad: z.number().min(0).max(10_000_000).nullable().optional(),
  locale: z.enum(["en", "fr", "ar"]).default("en"),
});

/**
 * Records a WhatsApp order click in the orders sheet.
 *
 * Called with navigator.sendBeacon right before the browser opens WhatsApp,
 * so it must stay fast and must never block or fail the redirect.
 */
export async function POST(request: Request) {
  const ip = clientIp(request);
  const limit = rateLimit(`order-intent:${ip}`, 40, 60_000);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, reason: "rate_limited" },
      { status: 429 },
    );
  }

  let payload: z.infer<typeof bodySchema>;
  try {
    payload = bodySchema.parse(await request.json());
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  const supabase = createAdminSupabase();
  if (!supabase) {
    // Preview mode: Supabase is not connected yet.
    return NextResponse.json({ ok: false, reason: "not_configured" });
  }

  const cookieHeader = request.headers.get("cookie") ?? "";
  const existingSid = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${SESSION_COOKIE}=`))
    ?.split("=")[1];
  const sessionId = existingSid || uid("sid_");

  const now = new Date();
  const windowStart = new Date(
    now.getTime() - DEDUPE_WINDOW_MINUTES * 60_000,
  ).toISOString();

  let orderId: string | null = null;
  let created = false;

  const { data: recent } = await supabase
    .from("orders")
    .select("id, click_count")
    .eq("session_id", sessionId)
    .eq("service_type", payload.service_type)
    .eq("item_ref", payload.item_ref ?? "")
    .gte("last_click_at", windowStart)
    .order("last_click_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (recent?.id) {
    orderId = recent.id;
    await supabase
      .from("orders")
      .update({
        click_count: (recent.click_count ?? 1) + 1,
        last_click_at: now.toISOString(),
        updated_at: now.toISOString(),
      })
      .eq("id", recent.id);
  } else {
    const { data: inserted, error } = await supabase
      .from("orders")
      .insert({
        service_type: payload.service_type,
        card_type: payload.card_type ?? null,
        item_ref: payload.item_ref ?? "",
        item_title: payload.item_title ?? null,
        quantity: payload.quantity ?? null,
        unit_price_mad: payload.unit_price_mad ?? null,
        total_price_mad: payload.total_price_mad ?? null,
        locale: payload.locale,
        status: "click",
        payment_status: "unpaid",
        source: "whatsapp_click",
        click_count: 1,
        first_click_at: now.toISOString(),
        last_click_at: now.toISOString(),
        session_id: sessionId,
      })
      .select("*")
      .single();

    if (error) {
      console.error("[orders/intent] insert failed:", error.message);
      return NextResponse.json(
        { ok: false, reason: "insert_failed" },
        { status: 500 },
      );
    }

    orderId = inserted.id;
    created = true;

    await supabase.from("order_events").insert({
      order_id: inserted.id,
      kind: "system",
      text: "WhatsApp order button clicked on the website.",
      actor: "website",
    });

    void sendToMake("order.created", inserted);
  }

  const response = NextResponse.json({ ok: true, id: orderId, created });
  if (!existingSid) {
    response.cookies.set({
      name: SESSION_COOKIE,
      value: sessionId,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 180,
    });
  }
  return response;
}
