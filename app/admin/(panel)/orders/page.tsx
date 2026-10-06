import { Suspense } from "react";

import { OrdersSheet } from "@/components/admin/orders-sheet";
import { getAdminSession } from "@/lib/auth";
import { createAdminSupabase } from "@/lib/supabase/admin";
import type { Order, ReplyTemplate } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const session = await getAdminSession();
  const supabase = createAdminSupabase();

  let orders: Order[] = [];
  let templates: ReplyTemplate[] = [];

  if (supabase) {
    const [ordersResult, templatesResult] = await Promise.all([
      supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1000),
      supabase
        .from("reply_templates")
        .select("*")
        .order("sort_order", { ascending: true }),
    ]);
    orders = (ordersResult.data ?? []) as Order[];
    templates = (templatesResult.data ?? []) as ReplyTemplate[];
  }

  return (
    <Suspense fallback={null}>
      <OrdersSheet
        initialOrders={orders}
        templates={templates}
        canDelete={session?.role === "owner"}
      />
    </Suspense>
  );
}
