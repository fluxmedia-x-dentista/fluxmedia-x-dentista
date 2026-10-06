import { MessagesList } from "@/components/admin/messages-list";
import { createAdminSupabase } from "@/lib/supabase/admin";
import type { ContactMessage } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const supabase = createAdminSupabase();
  const { data } = supabase
    ? await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(300)
    : { data: [] };

  return <MessagesList messages={(data ?? []) as ContactMessage[]} />;
}
