import Link from "next/link";
import {
  Calendar,
  FileText,
  Inbox,
  Layers,
  TrendingUp,
  Users2,
} from "lucide-react";

import { DemoBadge, Panel } from "@/components/admin/kit";
import { createAdminSupabase } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function SocialOverviewPage() {
  const supabase = createAdminSupabase();

  let packages = 0;
  let clients = 0;
  let orders = 0;

  if (supabase) {
    const [packagesResult, clientsResult, ordersResult] = await Promise.all([
      supabase
        .from("social_packages")
        .select("id", { count: "exact", head: true })
        .eq("visible", true),
      supabase
        .from("clients")
        .select("id", { count: "exact", head: true })
        .eq("status", "active"),
      supabase
        .from("orders")
        .select("id", { count: "exact", head: true })
        .eq("service_type", "social_media"),
    ]);
    packages = packagesResult.count ?? 0;
    clients = clientsResult.count ?? 0;
    orders = ordersResult.count ?? 0;
  }

  const stats = [
    {
      label: "Visible packages",
      value: packages,
      href: "/admin/social/packages",
    },
    { label: "Active clients", value: clients, href: "/admin/social/clients" },
    {
      label: "Social orders",
      value: orders,
      href: "/admin/orders?type=social_media",
    },
  ];

  const tools = [
    {
      href: "/admin/social/page-content",
      label: "Page content",
      text: "Services, process steps and FAQ of the public page.",
      icon: FileText,
      demo: false,
    },
    {
      href: "/admin/social/packages",
      label: "Packages",
      text: "Prices, features and visibility.",
      icon: Layers,
      demo: false,
    },
    {
      href: "/admin/social/clients",
      label: "Clients",
      text: "Who you manage, their package and handles.",
      icon: Users2,
      demo: false,
    },
    {
      href: "/admin/social/calendar",
      label: "Calendar",
      text: "Weekly publishing plan.",
      icon: Calendar,
      demo: true,
    },
    {
      href: "/admin/social/inbox",
      label: "Inbox",
      text: "Conversations from connected pages.",
      icon: Inbox,
      demo: true,
    },
    {
      href: "/admin/social/analytics",
      label: "Analytics",
      text: "Reach, engagement and growth.",
      icon: TrendingUp,
      demo: true,
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-extrabold">Social Media</h1>
        <p className="mt-1.5 text-[13px] text-muted">
          Everything about the social media service: the public page, the
          packages, and the workspace used to run client accounts.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="card p-5 transition-transform hover:-translate-y-0.5"
          >
            <p className="font-display text-2xl font-extrabold">{stat.value}</p>
            <p className="mt-1.5 text-[12.5px] text-muted">{stat.label}</p>
          </Link>
        ))}
      </div>

      <Panel title="Workspace" className="mt-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-xl border border-line/15 bg-surface2/40 p-4 transition-colors hover:border-sky/40"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface2 text-sky">
                    <Icon className="h-4 w-4" />
                  </span>
                  {tool.demo ? <DemoBadge /> : null}
                </div>
                <p className="mt-3 text-[13.5px] font-semibold">{tool.label}</p>
                <p className="mt-1 text-[12.5px] text-muted">{tool.text}</p>
              </Link>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}
