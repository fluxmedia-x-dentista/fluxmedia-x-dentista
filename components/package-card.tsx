import { CheckIcon, PlatformGlyph } from "@/components/ui";
import { WhatsAppOrderButton } from "@/components/whatsapp-button";
import { formatPriceMAD } from "@/lib/format";
import type { Locale, SocialPackage } from "@/lib/types";
import { cn, L } from "@/lib/utils";

/** Monthly social media package. Prices are always shown in dirham (DH). */
export function PackageCard({
  pack,
  locale,
  labels,
  phone,
}: {
  pack: SocialPackage;
  locale: Locale;
  labels: {
    popular: string;
    perMonth: string;
    order: string;
    priceOnWhatsApp: string;
  };
  phone: string;
}) {
  const price = formatPriceMAD(pack.price_mad, locale);
  const badge = L(pack.badge, locale);

  return (
    <div
      className={cn(
        "card relative flex h-full flex-col gap-5 p-6",
        pack.popular && "border-violet/40 shadow-glow",
      )}
    >
      {pack.popular ? (
        <span className="absolute -top-3 start-6 rounded-full bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-glow-sm">
          {badge || labels.popular}
        </span>
      ) : null}

      <div>
        <h3 className="font-display text-xl font-extrabold">
          {L(pack.name, locale)}
        </h3>
        <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
          {L(pack.description, locale)}
        </p>
      </div>

      <div className="flex items-end gap-2">
        {price ? (
          <>
            <span className="font-display text-3xl font-extrabold grad-text">
              {price}
            </span>
            <span className="pb-1 text-[13px] text-muted">
              {L(pack.billing_period, locale) || labels.perMonth}
            </span>
          </>
        ) : (
          <span className="font-display text-xl font-bold text-sky">
            {labels.priceOnWhatsApp}
          </span>
        )}
      </div>

      <div className="hairline" />

      <ul className="flex flex-col gap-2.5">
        {pack.features.map((feature) => (
          <li
            key={feature.id}
            className="flex items-start gap-2.5 text-[13.5px]"
          >
            <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky" />
            <span className="text-muted">{L(feature.text, locale)}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 pt-1">
        {pack.platforms.map((platform) => (
          <span
            key={platform}
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-surface2 text-muted"
            title={platform}
          >
            <PlatformGlyph id={platform} className="h-3.5 w-3.5" />
          </span>
        ))}
      </div>

      <WhatsAppOrderButton
        className="mt-auto w-full"
        variant={pack.popular ? "brand" : "ghost"}
        phone={phone}
        label={labels.order}
        payload={{
          kind: "social_media",
          title: L(pack.name, locale),
          titleEn: pack.title_en,
          slug: pack.slug,
          priceMad: pack.price_mad,
        }}
      />
    </div>
  );
}
