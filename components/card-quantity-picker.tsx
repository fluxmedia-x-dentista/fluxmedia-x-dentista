"use client";

import type { CardPriceTier } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Segmented control for the quantity tiers (100 / 200 / 500, or 1 for NFC). */
export function CardQuantityPicker({
  tiers,
  selectedId,
  onSelect,
  label,
  cardWord,
}: {
  tiers: CardPriceTier[];
  selectedId: string;
  onSelect: (tierId: string) => void;
  label: string;
  cardWord: string;
}) {
  if (tiers.length === 0) return null;

  return (
    <div>
      <span className="label">{label}</span>
      <div
        role="radiogroup"
        aria-label={label}
        className="inline-flex rounded-full border border-line/20 bg-surface2/60 p-1"
      >
        {tiers.map((tier) => {
          const active = tier.id === selectedId;
          return (
            <button
              key={tier.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onSelect(tier.id)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-all",
                active
                  ? "bg-dentista text-white shadow-glow-dentista"
                  : "text-muted hover:text-ink",
              )}
            >
              {tier.quantity === 1 ? `1 ${cardWord}` : tier.quantity}
            </button>
          );
        })}
      </div>
    </div>
  );
}
