import { CollectionEditor } from "@/components/admin/collection-editor";
import { getAdminSession } from "@/lib/auth";
import { createAdminSupabase } from "@/lib/supabase/admin";
import type { AdminUser } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const session = await getAdminSession();
  const supabase = createAdminSupabase();

  if (session?.role !== "owner") {
    return (
      <div>
        <h1 className="font-display text-2xl font-extrabold">Users & roles</h1>
        <p className="mt-4 rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-[13px] text-amber-200">
          Only an owner can manage admin accounts.
        </p>
      </div>
    );
  }

  const { data } = supabase
    ? await supabase.from("admin_users").select("*").order("created_at")
    : { data: [] };

  return (
    <div>
      <p className="mb-6 rounded-xl border border-line/15 bg-surface2/40 px-4 py-3 text-[12.5px] leading-relaxed text-muted">
        Create the person in Supabase → Authentication → Users first, copy their
        user UID, then add a row here. <strong>Owner</strong> can manage users,
        settings and delete orders. <strong>Editor</strong> can edit content and
        work the orders sheet.
      </p>

      <CollectionEditor
        resource="admin_users"
        title="Users & roles"
        addLabel="Add admin"
        sortable={false}
        rows={((data ?? []) as AdminUser[]).map((user) => ({ ...user }))}
        rowTitleField="email"
        rowBadgeField="role"
        defaults={{ user_id: "", email: "", role: "editor", active: true }}
        fields={[
          { name: "email", label: "Email", type: "text" },
          { name: "user_id", label: "Supabase user UID", type: "text" },
          {
            name: "role",
            label: "Role",
            type: "select",
            options: [
              { value: "owner", label: "Owner" },
              { value: "editor", label: "Editor" },
            ],
          },
          { name: "active", label: "Active", type: "bool" },
        ]}
      />
    </div>
  );
}