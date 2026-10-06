import Link from "next/link";
import { Plus } from "lucide-react";

import { Badge, Panel, Table } from "@/components/admin/kit";
import { formatPriceMAD } from "@/lib/format";
import { createAdminSupabase } from "@/lib/supabase/admin";
import type { PackageFeature, SocialPackage } from "@/lib/types";
import { L } from "@/lib/utils";

export const dynamic = "force-dynamic";

type PackageRow = SocialPackage & { package_features: PackageFeature[] };

export default async function AdminPackagesPage() {
  const supabase = createAdminSupabase();
  const { data } = supabase
    ? await supabase
        .from("social_packages")
        .select("*, package_features(*)")
        .order("sort_order", { ascending: true })
    : { data: [] };

  const packages = (data ?? []) as PackageRow[];

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold">Packages</h1>
          <p className="mt-1.5 text-[13px] text-muted">
            Monthly social media packages. Prices are in MAD and may stay empty.
          </p>
        </div>
        <Link href="/admin/social/packages/new" className="btn-brand btn-sm">
          <Plus className="h-3.5 w-3.5" />
          New package
        </Link>
      </div>

      <Panel>
        <Table
          head={["Name", "Price", "Volume", "Features", "Order", "Status", ""]}
        >
          {packages.map((pkg) => (
            <tr key={pkg.id} className="hover:bg-surface2/40">
              <td className="px-3 py-2 font-semibold">
                <Link
                  href={`/admin/social/packages/${pkg.id}`}
                  className="hover:text-sky"
                >
                  {L(pkg.name, "en")}
                </Link>
                {pkg.popular ? (
                  <span className="ms-2">
                    <Badge tone="violet">Popular</Badge>
                  </span>
                ) : null}
              </td>
              <td className="whitespace-nowrap px-3 py-2">
                {formatPriceMAD(pkg.price_mad, "en") ?? "On WhatsApp"}
              </td>
              <td className="px-3 py-2 text-[12px] text-muted">
                {pkg.posts_per_month} posts · {pkg.reels_per_month} reels ·{" "}
                {pkg.stories_per_month} stories
              </td>
              <td className="px-3 py-2">
                {(pkg.package_features ?? []).length}
              </td>
              <td className="px-3 py-2">{pkg.sort_order}</td>
              <td className="px-3 py-2">
                <Badge tone={pkg.visible ? "green" : "neutral"}>
                  {pkg.visible ? "Live" : "Hidden"}
                </Badge>
              </td>
              <td className="px-3 py-2 text-end">
                <Link
                  href={`/admin/social/packages/${pkg.id}`}
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
