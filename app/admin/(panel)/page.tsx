import Link from "next/link";
import {
  ClipboardList,
  CreditCard,
  Layers,
  MessageSquare,
  MousePointerClick,
  TrendingUp,
  Users,
  Wand2,
} from "lucide-react";

import { Badge, Panel, Table } from "@/components/admin/kit";
import { createAdminSupabase } from "@/lib/supabase/admin";
import { formatAdminDateTime, formatPriceMAD } from "@/lib/format";
import type { Order } from "@/lib/types";

export const dynamic = "force-dynamic";

const SERVICE_LABELS: Record<string, string> = {
  automation: "Automation",
  social_media: "Social",
  card: "Card",
  general: "General",
};

export default async function AdminDashboardPage() {
  const supabase = createAdminSupabase();

  if (!supabase) {
    return (
      <Panel title="Dashboard">
        <p className="text-[13px] text-muted">
          Add SUPABASE_SERVICE_ROLE_KEY to .env.local to load the dashboard.
        </p>
      </Panel>
    );
  }

  const weekAgo = new Date(Date.now() - 7 * 86_400_000).toISOString();

  const [
    totalOrders,
    weekOrders,
    cardOrders,
    automationOrders,
    socialOrders,
    messages,
    automations,
    packages,
    cards,
    clients,
    recent,
  ] = await Promise.all([
    supabase.from("orders").select("id", { count: "exact", head: true }),
    supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .gte("created_at", weekAgo),
    supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .eq("service_type", "card"),
    supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .eq("service_type", "automation"),
    supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .eq("service_type", "social_media"),
    supabase
      .from("contact_messages")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("automations")
      .select("id", { count: "exact", head: true })
      .eq("active", true),
    supabase
      .from("social_packages")
      .select("id", { count: "exact", head: true })
      .eq("visible", true),
    supabase
      .from("card_products")
      .select("id", { count: "exact", head: true })
      .eq("visible", true),
    supabase
      .from("clients")
      .select("id", { count: "exact", head: true })
      .eq("status", "active"),
    supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(8),
  ]);

  const stats = [
    {
      label: "Total orders",
      value: totalOrders.count ?? 0,
      icon: ClipboardList,
      tone: "text-sky",
      href: "/admin/orders",
    },
    {
      label: "Last 7 days",
      value: weekOrders.count ?? 0,
      icon: TrendingUp,
      tone: "text-emerald-300",
      href: "/admin/orders",
    },
    {
      label: "Card orders",
      value: cardOrders.count ?? 0,
      icon: CreditCard,
      tone: "text-dentista",
      href: "/admin/orders?type=card",
    },
    {
      label: "Automation orders",
      value: automationOrders.count ?? 0,
      icon: Wand2,
      tone: "text-violet",
      href: "/admin/orders?type=automation",
    },
    {
      label: "Social orders",
      value: socialOrders.count ?? 0,
      icon: Users,
      tone: "text-blue",
      href: "/admin/orders?type=social_media",
    },
    {
      label: "New messages",
      value: messages.count ?? 0,
      icon: MessageSquare,
      tone: "text-amber-300",
      href: "/admin/messages",
    },
  ];

  const catalog = [
    {
      label: "Live automations",
      value: automations.count ?? 0,
      href: "/admin/automations",
      icon: Wand2,
    },
    {
      label: "Visible packages",
      value: packages.count ?? 0,
      href: "/admin/social/packages",
      icon: Layers,
    },
    {
      label: "Visible cards",
      value: cards.count ?? 0,
      href: "/admin/cards",
      icon: CreditCard,
    },
    {
      label: "Active clients",
      value: clients.count ?? 0,
      href: "/admin/social/clients",
      icon: Users,
    },
  ];

  const recentOrders = (recent.data ?? []) as Order[];

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-extrabold">Dashboard</h1>
        <p className="mt-1.5 text-[13px] text-muted">
          Every WhatsApp order click lands in the orders sheet automatically.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="card flex items-center gap-4 p-5 transition-transform hover:-translate-y-0.5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface2">
                <Icon className={`h-5 w-5 ${stat.tone}`} />
              </span>
              <div>
                <p className="font-display text-2xl font-extrabold leading-none">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-[12.5px] text-muted">{stat.label}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Panel
          title="Recent orders"
          sub="The newest WhatsApp clicks and manual rows."
          actions={
            <Link href="/admin/orders" className="btn-ghost btn-sm">
              Open sheet
            </Link>
          }
        >
          {recentOrders.length === 0 ? (
            <p className="rounded-xl border border-dashed border-line/20 px-4 py-8 text-center text-[13px] text-muted">
              No orders yet. They appear here the moment someone taps an order
              button on the website.
            </p>
          ) : (
            <Table head={["Order", "Item", "Type", "Total", "Status", "Date"]}>
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-surface2/40">
                  <td className="px-3 py-2.5 font-mono text-[12px]">
                    <Link
                      href={`/admin/orders?order=${order.id}`}
                      className="hover:text-sky"
                    >
                      {order.order_no}
                    </Link>
                  </td>
                  <td className="max-w-[220px] truncate px-3 py-2.5">
                    {order.item_title ?? "—"}
                  </td>
                  <td className="px-3 py-2.5">
                    <Badge
                      tone={
                        order.service_type === "card"
                          ? "dentista"
                          : order.service_type === "automation"
                            ? "violet"
                            : order.service_type === "social_media"
                              ? "blue"
                              : "neutral"
                      }
                    >
                      {SERVICE_LABELS[order.service_type]}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5">
                    {order.total_price_mad === null
                      ? "—"
                      : formatPriceMAD(order.total_price_mad, "en")}
                  </td>
                  <td className="px-3 py-2.5">
                    <Badge
                      tone={
                        order.status === "completed"
                          ? "green"
                          : order.status === "cancelled"
                            ? "rose"
                            : order.status === "click"
                              ? "amber"
                              : "neutral"
                      }
                    >
                      {order.status.replace(/_/g, " ")}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-muted">
                    {formatAdminDateTime(order.created_at)}
                  </td>
                </tr>
              ))}
            </Table>
          )}
        </Panel>

        <div className="flex flex-col gap-6">
          <Panel title="Catalog">
            <ul className="flex flex-col gap-2">
              {catalog.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] transition-colors hover:bg-surface2/60"
                    >
                      <Icon className="h-4 w-4 text-muted" />
                      <span className="flex-1">{item.label}</span>
                      <span className="font-display font-bold">
                        {item.value}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Panel>

          <Panel title="Shortcuts">
            <div className="flex flex-wrap gap-2">
              <Link href="/admin/pages/home" className="btn-ghost btn-sm">
                Edit home page
              </Link>
              <Link href="/admin/automations/new" className="btn-ghost btn-sm">
                New automation
              </Link>
              <Link href="/admin/cards/new" className="btn-ghost btn-sm">
                New card
              </Link>
              <Link href="/admin/settings" className="btn-ghost btn-sm">
                WhatsApp number
              </Link>
            </div>
            <p className="mt-4 flex items-center gap-2 text-[12px] text-muted">
              <MousePointerClick className="h-3.5 w-3.5" />
              Repeat clicks from the same visitor merge into one order row.
            </p>
          </Panel>
        </div>
      </div>
    </div>
  );
}
