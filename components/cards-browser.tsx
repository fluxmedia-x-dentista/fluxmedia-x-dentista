"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { CardMockup } from "@/components/card-mockup";
import { CardQuantityPicker } from "@/components/card-quantity-picker";
import { useI18n } from "@/components/providers";
import { CheckIcon } from "@/components/ui";
import { WhatsAppOrderButton } from "@/components/whatsapp-button";
import { formatPriceMAD, perCardPrice } from "@/lib/format";
import type { CardProduct, CardType } from "@/lib/types";
import { cn, L } from "@/lib/utils";

type Filter = "all" | CardType;

/* -------------------------------------------------------------------------- */
/* One product                                                                */
/* -------------------------------------------------------------------------- */

function CardProductCard({
  card,
  phone,
}: {
  card: CardProduct;
  phone: string;
}) {
  const { locale, t } = useI18n();
  const tiers = card.tiers.length > 0 ? card.tiers : [];
  const [selectedId, setSelectedId] = useState(tiers[0]?.id ?? "");

  const tier = tiers.find((item) => item.id === selectedId) ?? tiers[0];
  const quantity = tier?.quantity ?? 1;
  const price = formatPriceMAD(tier?.price_mad ?? null, locale);
  const unit =
    quantity > 1
      ? perCardPrice(tier?.price_mad ?? null, quantity, locale)
      : null;

  const forCards = t("ui.for_cards", "for {n} cards").replace(
    "{n}",
    String(quantity),
  );
  const perCardLabel = unit
    ? t("ui.per_card", "{price} per card").replace("{price}", unit)
    : null;

  return (
    <div className="card flex h-full flex-col gap-5 p-5">
      <div className="relative">
        <CardMockup card={card} />
        {card.popular ? (
          <span className="absolute -top-2 end-2 rounded-full bg-dentista px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-glow-dentista">
            {t("ui.popular", "Popular")}
          </span>
        ) : null}
      </div>

      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-display text-[17px] font-bold">
            {L(card.title, locale)}
          </h3>
          <span className="tag border-dentista/30 px-2 py-0.5 text-[10px] text-dentista">
            {card.type === "nfc"
              ? t("ui.nfc", "NFC")
              : t("ui.regular", "Regular")}
          </span>
        </div>
        <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
          {L(card.description, locale)}
        </p>
      </div>

      <ul className="flex flex-col gap-2">
        {card.specs.map((spec, index) => (
          <li
            key={`${card.id}-spec-${index}`}
            className="flex items-start gap-2.5 text-[13px]"
          >
            <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-dentista" />
            <span className="text-muted">{L(spec, locale)}</span>
          </li>
        ))}
      </ul>

      {tiers.length > 0 ? (
        <CardQuantityPicker
          tiers={tiers}
          selectedId={tier?.id ?? ""}
          onSelect={setSelectedId}
          label={t("ui.quantity", "Quantity")}
          cardWord={t("ui.card_word", "card")}
        />
      ) : null}

      <div className="mt-auto">
        {price ? (
          <div className="mb-3">
            <p className="font-display text-2xl font-extrabold text-dentista">
              {price}{" "}
              {quantity > 1 ? (
                <span className="text-[13px] font-medium text-muted">
                  {forCards}
                </span>
              ) : null}
            </p>
            {perCardLabel ? (
              <p className="text-[12.5px] text-muted">{perCardLabel}</p>
            ) : null}
          </div>
        ) : (
          <p className="mb-3 text-[15px] font-bold text-dentista">
            {t("ui.price_on_whatsapp", "Price on WhatsApp")}
          </p>
        )}

        <WhatsAppOrderButton
          className="w-full"
          variant="dentista"
          phone={phone}
          label={t("ui.order_whatsapp", "Order on WhatsApp")}
          payload={{
            kind: "card",
            title: L(card.title, locale),
            titleEn: card.title_en,
            slug: card.slug,
            cardType: card.type,
            quantity,
            priceMad: tier?.price_mad ?? null,
          }}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Browser                                                                    */
/* -------------------------------------------------------------------------- */

export function CardsBrowser({
  cards,
  phone,
}: {
  cards: CardProduct[];
  phone: string;
}) {
  const { t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initial = (searchParams.get("type") as Filter | null) ?? "all";
  const [filter, setFilter] = useState<Filter>(
    initial === "regular" || initial === "nfc" ? initial : "all",
  );

  useEffect(() => {
    const current = searchParams.get("type") ?? "all";
    if (current === filter) return;
    const params = new URLSearchParams(searchParams.toString());
    if (filter === "all") {
      params.delete("type");
    } else {
      params.set("type", filter);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }, [filter, pathname, router, searchParams]);

  const filtered = useMemo(
    () => (filter === "all" ? cards : cards.filter((c) => c.type === filter)),
    [cards, filter],
  );

  const tabs: { id: Filter; label: string }[] = [
    { id: "all", label: t("ui.all", "All") },
    { id: "regular", label: t("ui.regular", "Regular") },
    { id: "nfc", label: t("ui.nfc", "NFC") },
  ];

  return (
    <div>
      <div
        role="tablist"
        aria-label={t("cards.products.title", "Cards")}
        className="inline-flex rounded-full border border-line/20 bg-surface/60 p-1"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={filter === tab.id}
            onClick={() => setFilter(tab.id)}
            className={cn(
              "rounded-full px-4 py-2 text-[13px] font-semibold transition-all",
              filter === tab.id
                ? "bg-dentista text-white shadow-glow-dentista"
                : "text-muted hover:text-ink",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((card) => (
          <CardProductCard key={card.id} card={card} phone={phone} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted">
          {t("ui.empty", "Nothing here yet.")}
        </p>
      ) : null}
    </div>
  );
}
