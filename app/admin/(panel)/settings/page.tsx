import { SettingsForm } from "@/components/admin/settings-form";
import { getAdminSession } from "@/lib/auth";
import { fallbackSettings } from "@/lib/seed";
import { createAdminSupabase } from "@/lib/supabase/admin";
import type { SiteSettings } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const session = await getAdminSession();
  const supabase = createAdminSupabase();

  const { data } = supabase
    ? await supabase.from("site_settings").select("*").limit(1).maybeSingle()
    : { data: null };

  const settings = (data ?? fallbackSettings) as SiteSettings;

  return (
    <SettingsForm settings={settings} canEdit={session?.role === "owner"} />
  );
}
