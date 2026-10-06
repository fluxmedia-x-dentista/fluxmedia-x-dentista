import { notFound } from "next/navigation";

import { AutomationEditor } from "@/components/admin/automation-editor";
import { createAdminSupabase } from "@/lib/supabase/admin";
import type { Automation, Category } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditAutomationPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createAdminSupabase();
  if (!supabase) notFound();

  const [automationResult, categoriesResult] = await Promise.all([
    supabase.from("automations").select("*").eq("id", params.id).maybeSingle(),
    supabase.from("categories").select("*").order("sort_order"),
  ]);

  if (!automationResult.data) notFound();

  return (
    <AutomationEditor
      automation={automationResult.data as Automation}
      categories={(categoriesResult.data ?? []) as Category[]}
    />
  );
}
