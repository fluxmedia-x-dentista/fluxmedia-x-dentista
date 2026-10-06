import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin/shell";
import { SetupScreen } from "@/components/admin/setup-screen";
import { getAdminSession } from "@/lib/auth";
import { createAdminSupabase } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export default async function AdminPanelLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (!isSupabaseConfigured()) return <SetupScreen />;

  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  let newOrders = 0;
  let unreadMessages = 0;

  const supabase = createAdminSupabase();
  if (supabase) {
    const [orders, messages] = await Promise.all([
      supabase
        .from("orders")
        .select("id", { count: "exact", head: true })
        .in("status", ["click", "new"]),
      supabase
        .from("contact_messages")
        .select("id", { count: "exact", head: true })
        .eq("status", "new"),
    ]);
    newOrders = orders.count ?? 0;
    unreadMessages = messages.count ?? 0;
  }

  return (
    <AdminShell
      email={session.email}
      role={session.role}
      newOrders={newOrders}
      unreadMessages={unreadMessages}
    >
      {children}
    </AdminShell>
  );
}
