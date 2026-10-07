import { CollectionEditor } from "@/components/admin/collection-editor";
import { createAdminSupabase } from "@/lib/supabase/admin";
import type { FooterLink, NavigationItem } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminNavigationPage() {
  const supabase = createAdminSupabase();

  let items: NavigationItem[] = [];
  let footerLinks: FooterLink[] = [];

  if (supabase) {
    const [itemsResult, footerResult] = await Promise.all([
      supabase.from("navigation_items").select("*").order("sort_order"),
      supabase.from("footer_links").select("*").order("sort_order"),
    ]);
    items = (itemsResult.data ?? []) as NavigationItem[];
    footerLinks = (footerResult.data ?? []) as FooterLink[];
  }

  return (
    <div className="flex flex-col gap-12">
      <div>
        <h1 className="font-display text-2xl font-extrabold">Navigation</h1>
        <p className="mt-1.5 text-[13px] text-muted">
          Links in the header and in the footer columns. The call-to-action
          button label lives in Pages → Navbar labels.
        </p>
      </div>

      <CollectionEditor
        compact
        resource="navigation_items"
        title="Header menu"
        addLabel="Add menu item"
        rows={items.map((item) => ({ ...item }))}
        rowTitleField="label"
        rowTitleLocale="en"
        rowBadgeField="href"
        defaults={{
          label: { en: "", fr: "", ar: "" },
          href: "/",
          active: true,
          placement: "header",
        }}
        fields={[
          { name: "label", label: "Label", type: "ml" },
          { name: "href", label: "URL", type: "text" },
          { name: "active", label: "Visible", type: "bool" },
          {
            name: "placement",
            label: "Placement",
            type: "select",
            options: [
              { value: "header", label: "Header" },
              { value: "footer", label: "Footer" },
            ],
          },
        ]}
      />

      <CollectionEditor
        compact
        resource="footer_links"
        title="Footer links"
        sub="Group key decides the column: navigation, services or bottom."
        addLabel="Add footer link"
        rows={footerLinks.map((link) => ({ ...link }))}
        rowTitleField="label"
        rowTitleLocale="en"
        rowBadgeField="group_key"
        defaults={{
          group_key: "navigation",
          label: { en: "", fr: "", ar: "" },
          href: "/",
          active: true,
        }}
        fields={[
          { name: "label", label: "Label", type: "ml" },
          { name: "href", label: "URL", type: "text" },
          {
            name: "group_key",
            label: "Column",
            type: "select",
            options: [
              { value: "navigation", label: "Navigation" },
              { value: "services", label: "Services" },
              { value: "bottom", label: "Bottom bar" },
            ],
          },
          { name: "active", label: "Visible", type: "bool" },
        ]}
      />
    </div>
  );
}