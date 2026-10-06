import { notFound } from "next/navigation";

import { CardEditor } from "@/components/admin/card-editor";
import { createAdminSupabase } from "@/lib/supabase/admin";
import type { CardPriceTier, CardProduct } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditCardPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createAdminSupabase();
  if (!supabase) notFound();

  const { data } = await supabase
    .from("card_products")
    .select("*, card_price_tiers(*)")
    .eq("id", params.id)
    .maybeSingle();

  if (!data) notFound();

  const row = data as CardProduct & { card_price_tiers: CardPriceTier[] };
  const card: CardProduct = {
    ...row,
    tiers: (row.card_price_tiers ?? []).sort(
      (a, b) => a.sort_order - b.sort_order,
    ),
  };

  return <CardEditor card={card} />;
}
