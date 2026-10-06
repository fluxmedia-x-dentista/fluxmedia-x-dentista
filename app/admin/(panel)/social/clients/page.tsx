import { CollectionEditor } from "@/components/admin/collection-editor";
import { createAdminSupabase } from "@/lib/supabase/admin";
import type { Client, SocialPackage } from "@/lib/types";
import { L } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminClientsPage() {
  const supabase = createAdminSupabase();

  let clients: Client[] = [];
  let packages: SocialPackage[] = [];

  if (supabase) {
    const [clientsResult, packagesResult] = await Promise.all([
      supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase.from("social_packages").select("*").order("sort_order"),
    ]);
    clients = (clientsResult.data ?? []) as Client[];
    packages = (packagesResult.data ?? []) as SocialPackage[];
  }

  return (
    <CollectionEditor
      resource="clients"
      title="Clients"
      sub="Managed social media accounts. This list is private and never shown on the website."
      addLabel="Add client"
      sortable={false}
      rows={clients.map((client) => ({ ...client }))}
      rowTitle={(row) => String(row.name ?? "")}
      rowBadge={(row) => String(row.status ?? "")}
      defaults={{
        name: "",
        phone: "",
        email: "",
        business_name: "",
        city: "",
        notes: "",
        package_slug: "",
        handles: "",
        monthly_price_mad: null,
        start_date: null,
        status: "active",
      }}
      fields={[
        { name: "name", label: "Contact name", type: "text" },
        { name: "phone", label: "WhatsApp number", type: "text" },
        { name: "business_name", label: "Business", type: "text" },
        { name: "city", label: "City", type: "text" },
        { name: "email", label: "Email", type: "text" },
        {
          name: "package_slug",
          label: "Package",
          type: "select",
          options: [
            { value: "", label: "—" },
            ...packages.map((pkg) => ({
              value: pkg.slug,
              label: L(pkg.name, "en"),
            })),
          ],
        },
        {
          name: "monthly_price_mad",
          label: "Monthly price (DH)",
          type: "number",
        },
        { name: "handles", label: "Handles", type: "text" },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: [
            { value: "active", label: "Active" },
            { value: "paused", label: "Paused" },
            { value: "ended", label: "Ended" },
          ],
        },
        { name: "notes", label: "Notes", type: "text", full: true },
      ]}
    />
  );
}
