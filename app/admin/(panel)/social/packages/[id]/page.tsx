import { notFound } from "next/navigation";

import { PackageEditor } from "@/components/admin/package-editor";
import { createAdminSupabase } from "@/lib/supabase/admin";
import type { PackageFeature, SocialPackage } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditPackagePage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createAdminSupabase();
  if (!supabase) notFound();

  const { data } = await supabase
    .from("social_packages")
    .select("*, package_features(*)")
    .eq("id", params.id)
    .maybeSingle();

  if (!data) notFound();

  const row = data as SocialPackage & { package_features: PackageFeature[] };
  const pkg: SocialPackage = {
    ...row,
    features: (row.package_features ?? []).sort(
      (a, b) => a.sort_order - b.sort_order,
    ),
  };

  return <PackageEditor package={pkg} />;
}
