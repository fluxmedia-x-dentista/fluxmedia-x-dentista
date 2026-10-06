import { CollectionEditor } from "@/components/admin/collection-editor";
import { createAdminSupabase } from "@/lib/supabase/admin";
import type { Category } from "@/lib/types";
import { L } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const supabase = createAdminSupabase();
  const { data } = supabase
    ? await supabase.from("categories").select("*").order("sort_order")
    : { data: [] };

  const rows = ((data ?? []) as Category[]).map((category) => ({
    ...category,
  }));

  return (
    <CollectionEditor
      resource="categories"
      title="Categories"
      sub="Filter buttons on the automations page. The slug links an automation to its category."
      addLabel="Add category"
      rows={rows}
      rowTitle={(row) => L(row.name as Category["name"], "en")}
      rowBadge={(row) => String(row.slug ?? "")}
      defaults={{
        slug: "",
        name: { en: "", fr: "", ar: "" },
        active: true,
      }}
      fields={[
        { name: "name", label: "Name", type: "ml" },
        {
          name: "slug",
          label: "Slug",
          type: "text",
          hint: "lowercase-with-dashes",
        },
        { name: "active", label: "Visible", type: "bool" },
      ]}
    />
  );
}
