import { AutomationEditor } from "@/components/admin/automation-editor";
import { createAdminSupabase } from "@/lib/supabase/admin";
import type { Category } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function NewAutomationPage() {
  const supabase = createAdminSupabase();
  const { data } = supabase
    ? await supabase.from("categories").select("*").order("sort_order")
    : { data: [] };

  return (
    <AutomationEditor
      automation={null}
      categories={(data ?? []) as Category[]}
    />
  );
}
