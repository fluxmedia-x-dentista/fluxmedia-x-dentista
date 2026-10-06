import { MediaLibrary } from "@/components/admin/media-library";
import { createAdminSupabase } from "@/lib/supabase/admin";
import type { MediaAsset } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const supabase = createAdminSupabase();
  const { data } = supabase
    ? await supabase
        .from("media_assets")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200)
    : { data: [] };

  return <MediaLibrary assets={(data ?? []) as MediaAsset[]} />;
}
