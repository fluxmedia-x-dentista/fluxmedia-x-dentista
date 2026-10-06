import { CollectionEditor } from "@/components/admin/collection-editor";
import { createAdminSupabase } from "@/lib/supabase/admin";
import type { ReplyTemplate } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminReplyTemplatesPage() {
  const supabase = createAdminSupabase();
  const { data } = supabase
    ? await supabase.from("reply_templates").select("*").order("sort_order")
    : { data: [] };

  return (
    <div>
      <p className="mb-6 rounded-xl border border-line/15 bg-surface2/40 px-4 py-3 text-[12.5px] text-muted">
        Available variables: <code className="text-sky">{"{client_name}"}</code>{" "}
        <code className="text-sky">{"{item}"}</code>{" "}
        <code className="text-sky">{"{qty}"}</code>{" "}
        <code className="text-sky">{"{price}"}</code>{" "}
        <code className="text-sky">{"{order_no}"}</code> — they are replaced
        when you open a reply from the orders sheet.
      </p>

      <CollectionEditor
        resource="reply_templates"
        title="Reply templates"
        sub="Ready-made WhatsApp answers used from the orders sheet."
        addLabel="Add template"
        rows={((data ?? []) as ReplyTemplate[]).map((template) => ({
          ...template,
        }))}
        rowTitle={(row) => String(row.name ?? "")}
        rowBadge={(row) => String(row.service_type ?? "")}
        defaults={{
          key: "",
          service_type: "general",
          name: "",
          body: { en: "", fr: "", ar: "" },
          active: true,
        }}
        fields={[
          { name: "name", label: "Name", type: "text" },
          {
            name: "key",
            label: "Key",
            type: "text",
            hint: "lowercase_with_underscores",
          },
          {
            name: "service_type",
            label: "Service",
            type: "select",
            options: [
              { value: "general", label: "General" },
              { value: "card", label: "Cards" },
              { value: "automation", label: "Automation" },
              { value: "social_media", label: "Social media" },
            ],
          },
          { name: "active", label: "Active", type: "bool" },
          { name: "body", label: "Message", type: "mlarea" },
        ]}
      />
    </div>
  );
}
