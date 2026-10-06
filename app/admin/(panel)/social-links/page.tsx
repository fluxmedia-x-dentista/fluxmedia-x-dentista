import { CollectionEditor } from "@/components/admin/collection-editor";
import { createAdminSupabase } from "@/lib/supabase/admin";
import type { SocialLink } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminSocialLinksPage() {
  const supabase = createAdminSupabase();
  const { data } = supabase
    ? await supabase.from("social_links").select("*").order("sort_order")
    : { data: [] };

  return (
    <CollectionEditor
      resource="social_links"
      title="Social links"
      sub="Shown on /social, in the footer and on the contact page."
      addLabel="Add link"
      rows={((data ?? []) as SocialLink[]).map((link) => ({ ...link }))}
      rowTitle={(row) => String(row.name ?? "")}
      rowBadge={(row) => String(row.platform ?? "")}
      defaults={{
        platform: "instagram",
        name: "",
        username: "",
        description: { en: "", fr: "", ar: "" },
        url: "",
        active: true,
      }}
      fields={[
        { name: "name", label: "Display name", type: "text" },
        {
          name: "platform",
          label: "Platform",
          type: "select",
          options: [
            { value: "whatsapp", label: "WhatsApp" },
            { value: "instagram", label: "Instagram" },
            { value: "facebook", label: "Facebook" },
            { value: "tiktok", label: "TikTok" },
            { value: "linkedin", label: "LinkedIn" },
            { value: "youtube", label: "YouTube" },
            { value: "x", label: "X" },
          ],
        },
        { name: "username", label: "Username / handle", type: "text" },
        { name: "url", label: "URL", type: "url" },
        { name: "description", label: "Description", type: "mlarea" },
        { name: "active", label: "Visible", type: "bool" },
      ]}
    />
  );
}
