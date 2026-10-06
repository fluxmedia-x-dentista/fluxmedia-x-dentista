import Link from "next/link";
import { Plus } from "lucide-react";

import { CollectionEditor } from "@/components/admin/collection-editor";
import { Badge, Panel, Table } from "@/components/admin/kit";
import { formatPriceMAD } from "@/lib/format";
import { createAdminSupabase } from "@/lib/supabase/admin";
import type { CardPriceTier, CardProduct, Faq } from "@/lib/types";
import { L } from "@/lib/utils";

export const dynamic = "force-dynamic";

type CardRow = CardProduct & { card_price_tiers: CardPriceTier[] };

export default async function AdminCardsPage() {
  const supabase = createAdminSupabase();

  let cards: CardRow[] = [];
  let faqs: Faq[] = [];

  if (supabase) {
    const [cardsResult, faqsResult] = await Promise.all([
      supabase
        .from("card_products")
        .select("*, card_price_tiers(*)")
        .order("sort_order", { ascending: true }),
      supabase
        .from("faqs")
        .select("*")
        .eq("scope", "cards")
        .order("sort_order", { ascending: true }),
    ]);
    cards = (cardsResult.data ?? []) as CardRow[];
    faqs = (faqsResult.data ?? []) as Faq[];
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-extrabold">
              DENTISTA cards
            </h1>
            <p className="mt-1.5 text-[13px] text-muted">
              Regular cards use 100 / 200 / 500 quantity tiers. NFC cards are
              sold as a single card.
            </p>
          </div>
          <Link href="/admin/cards/new" className="btn-brand btn-sm">
            <Plus className="h-3.5 w-3.5" />
            New card
          </Link>
        </div>

        <Panel>
          <Table
            head={["Title", "Type", "Finish", "Tiers", "Order", "Status", ""]}
          >
            {cards.map((card) => {
              const tiers = (card.card_price_tiers ?? []).sort(
                (a, b) => a.quantity - b.quantity,
              );
              return (
                <tr key={card.id} className="hover:bg-surface2/40">
                  <td className="px-3 py-2 font-semibold">
                    <Link
                      href={`/admin/cards/${card.id}`}
                      className="hover:text-sky"
                    >
                      {L(card.title, "en")}
                    </Link>
                    {card.popular ? (
                      <span className="ms-2">
                        <Badge tone="dentista">Popular</Badge>
                      </span>
                    ) : null}
                  </td>
                  <td className="px-3 py-2 uppercase">{card.type}</td>
                  <td className="px-3 py-2">{card.finish}</td>
                  <td className="px-3 py-2 text-[12px] text-muted">
                    {tiers.length === 0
                      ? "—"
                      : tiers
                          .map(
                            (tier) =>
                              `${tier.quantity}: ${
                                formatPriceMAD(tier.price_mad, "en") ??
                                "on WhatsApp"
                              }`,
                          )
                          .join(" · ")}
                  </td>
                  <td className="px-3 py-2">{card.sort_order}</td>
                  <td className="px-3 py-2">
                    <Badge tone={card.visible ? "green" : "neutral"}>
                      {card.visible ? "Live" : "Hidden"}
                    </Badge>
                  </td>
                  <td className="px-3 py-2 text-end">
                    <Link
                      href={`/admin/cards/${card.id}`}
                      className="rounded-lg px-2 py-1 text-[12px] font-semibold text-muted hover:bg-surface2 hover:text-ink"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </Table>
        </Panel>
      </div>

      <CollectionEditor
        compact
        resource="faqs"
        title="Cards FAQ"
        sub="Questions shown at the bottom of the /cards page."
        addLabel="Add question"
        rows={faqs.map((faq) => ({ ...faq }))}
        rowTitle={(row) => L(row.question as Faq["question"], "en")}
        defaults={{
          scope: "cards",
          question: { en: "", fr: "", ar: "" },
          answer: { en: "", fr: "", ar: "" },
          visible: true,
        }}
        fields={[
          { name: "question", label: "Question", type: "ml", full: true },
          { name: "answer", label: "Answer", type: "mlarea" },
          { name: "visible", label: "Visible", type: "bool" },
        ]}
      />
    </div>
  );
}
