import { NextResponse } from "next/server";
import { z } from "zod";

import { sendToMake } from "@/lib/make";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { createAdminSupabase } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bodySchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  whatsapp: z.string().max(40).optional().or(z.literal("")),
  company: z.string().max(160).optional().or(z.literal("")),
  message: z.string().min(5).max(2000),
  website: z.string().max(200).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limit = rateLimit(`contact:${ip}`, 6, 60_000);
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

  // Honeypot: bots fill hidden fields, humans never do.
  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  const supabase = createAdminSupabase();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, reason: "not_configured" },
      { status: 503 },
    );
  }

  const { data, error } = await supabase
    .from("contact_messages")
    .insert({
      name: payload.name,
      email: payload.email,
      whatsapp: payload.whatsapp || null,
      company: payload.company || null,
      message: payload.message,
      status: "new",
    })
    .select("*")
    .single();

  if (error) {
    console.error("[contact] insert failed:", error.message);
    return NextResponse.json(
      { ok: false, reason: "insert_failed" },
      { status: 500 },
    );
  }

  void sendToMake("contact.created", data);
  return NextResponse.json({ ok: true });
}
