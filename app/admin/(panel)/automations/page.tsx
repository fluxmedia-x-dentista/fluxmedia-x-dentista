import Link from "next/link";
import { Plus } from "lucide-react";

import { Badge, Panel, Table } from "@/components/admin/kit";
import { createAdminSupabase } from "@/lib/supabase/admin";
import type { Automation, Category } from "@/lib/types";
import { L } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminAutomationsPage() {
  const supabase = createAdminSupabase();

  let automations: Automation[] = [];
  let categories: Category[] = [];

  if (supabase) {
    const [automationsResult, categoriesResult] = await Promise.all([
      supabase
        .from("automations")
        .select("*")
        .order("sort_order", { ascending: true }),
      supabase.from("categories").select("*"),
    ]);
    automations = (automationsResult.data ?? []) as Automation[];
    categories = (categoriesResult.data ?? []) as Category[];
  }

  const categoryName = (slug: string) =>
    L(categories.find((category) => category.slug === slug)?.name, "en") ||
    slug;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold">Automations</h1>
          <p className="mt-1.5 text-[13px] text-muted">
            {automations.length} automations. Order and visibility control the
            public /automations page.
          </p>
        </div>
        <Link href="/admin/automations/new" className="btn-brand btn-sm">
          <Plus className="h-3.5 w-3.5" />
          New automation
        </Link>
      </div>

      <Panel>
        <Table head={["", "Title", "Slug", "Category", "Order", "Status", ""]}>
          {automations.map((automation) => (
            <tr key={automation.id} className="hover:bg-surface2/40">
              <td className="px-3 py-2">
                <div className="h-10 w-16 overflow-hidden rounded-lg border border-line/15 bg-surface2">
                  {automation.thumbnail_url ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={automation.thumbnail_url}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
              </td>
              <td className="px-3 py-2 font-semibold">
                <Link
                  href={`/admin/automations/${automation.id}`}
                  className="hover:text-sky"
                >
                  {L(automation.title, "en")}
                </Link>
              </td>
              <td className="px-3 py-2 font-mono text-[12px] text-muted">
                {automation.slug}
              </td>
              <td className="px-3 py-2">
                {categoryName(automation.category_slug)}
              </td>
              <td className="px-3 py-2">{automation.sort_order}</td>
              <td className="px-3 py-2">
                <Badge tone={automation.active ? "green" : "neutral"}>
                  {automation.active ? "Live" : "Hidden"}
                </Badge>
              </td>
              <td className="px-3 py-2 text-end">
                <Link
                  href={`/admin/automations/${automation.id}`}
                  className="rounded-lg px-2 py-1 text-[12px] font-semibold text-muted hover:bg-surface2 hover:text-ink"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </Table>
      </Panel>
    </div>
  );
}
