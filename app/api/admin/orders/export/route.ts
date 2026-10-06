import { NextResponse } from "next/server";

import { getAdminSession } from "@/lib/auth";
import { createAdminSupabase } from "@/lib/supabase/admin";
import type { Order } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COLUMNS: { key: keyof Order; header: string }[] = [
  { key: "order_no", header: "Order #" },
  { key: "created_at", header: "Date" },
  { key: "service_type", header: "Service type" },
  { key: "item_title", header: "Item" },
  { key: "card_type", header: "Card type" },
  { key: "quantity", header: "Qty" },
  { key: "unit_price_mad", header: "Unit price (DH)" },
  { key: "total_price_mad", header: "Total (DH)" },
  { key: "client_name", header: "Client name" },
  { key: "client_phone", header: "Phone" },
  { key: "client_email", header: "Email" },
  { key: "business_name", header: "Business" },
  { key: "city", header: "City" },
  { key: "status", header: "Status" },
  { key: "payment_status", header: "Payment" },
  { key: "delivery_date", header: "Delivery date" },
  { key: "notes", header: "Notes" },
  { key: "source", header: "Source" },
  { key: "locale", header: "Language" },
  { key: "click_count", header: "Clicks" },
];

function escapeCsv(value: unknown): string {
  if (value === null || value === undefined) return "";
  const text = String(value);
  if (/[",\n;]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

/** CSV export of the currently filtered rows (UTF-8 BOM so Excel reads Arabic). */
export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured" },
      { status: 503 },
    );
  }

  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  const status = url.searchParams.get("status");
  const payment = url.searchParams.get("payment");
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");
  const q = url.searchParams.get("q");

  let query = supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5000);

  if (type && type !== "all") query = query.eq("service_type", type);
  if (status && status !== "all") query = query.eq("status", status);
  if (payment && payment !== "all") query = query.eq("payment_status", payment);
  if (from) query = query.gte("created_at", from);
  if (to) query = query.lte("created_at", `${to}T23:59:59`);
  if (q) {
    const term = `%${q}%`;
    query = query.or(
      [
        `order_no.ilike.${term}`,
        `item_title.ilike.${term}`,
        `client_name.ilike.${term}`,
        `client_phone.ilike.${term}`,
        `business_name.ilike.${term}`,
      ].join(","),
    );
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const rows = (data ?? []) as Order[];
  const lines = [
    COLUMNS.map((column) => column.header).join(","),
    ...rows.map((row) =>
      COLUMNS.map((column) => escapeCsv(row[column.key])).join(","),
    ),
  ];

  const csv = `\uFEFF${lines.join("\r\n")}`;
  const stamp = new Date().toISOString().slice(0, 10);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="fluxmedia-orders-${stamp}.csv"`,
    },
  });
}
