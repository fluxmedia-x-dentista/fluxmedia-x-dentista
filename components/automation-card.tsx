import Link from "next/link";

import { ArrowIcon, Icon } from "@/components/ui";
import type { Automation, Category, Locale } from "@/lib/types";
import { L } from "@/lib/utils";

/**
 * Automation list card: thumbnail, icon badge, category pill, title, short
 * description and a "View details" link. No price — automations are quoted
 * after a conversation.
 */
export function AutomationCard({
  automation,
  category,
  locale,
  viewLabel,
}: {
  automation: Automation;
  category?: Category;
  locale: Locale;
  viewLabel: string;
}) {
  return (
    <Link
      href={`/automations/${automation.slug}`}
      className="card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-sky/40 hover:shadow-glow"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-surface2">
        {automation.thumbnail_url ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={automation.thumbnail_url}
            alt={L(automation.title, locale)}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-brand-soft">
            <Icon name={automation.icon} className="h-10 w-10 text-sky/70" />
          </div>
        )}

        <span className="absolute start-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-line/20 bg-bg/70 text-sky backdrop-blur-md">
          <Icon name={automation.icon} className="h-4.5 w-4.5" />
        </span>

        {category ? (
          <span className="absolute end-3 top-3 rounded-full border border-line/20 bg-bg/70 px-2.5 py-1 text-[11px] font-semibold text-muted backdrop-blur-md">
            {L(category.name, locale)}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-[17px] font-bold leading-snug">
          {L(automation.title, locale)}
        </h3>
        <p className="text-[13.5px] leading-relaxed text-muted">
          {L(automation.short, locale)}
        </p>
        <span className="mt-auto inline-flex items-center gap-2 pt-1 text-[13px] font-semibold text-sky">
          {viewLabel}
          <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
