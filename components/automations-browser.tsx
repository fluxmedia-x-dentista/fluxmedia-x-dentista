"use client";

import { useMemo, useState } from "react";

import { AutomationCard } from "@/components/automation-card";
import { useI18n } from "@/components/providers";
import type { Automation, Category } from "@/lib/types";
import { cn, L } from "@/lib/utils";

/** Category filter tabs + animated grid of automation cards. */
export function AutomationsBrowser({
  automations,
  categories,
}: {
  automations: Automation[];
  categories: Category[];
}) {
  const { locale, t } = useI18n();
  const [active, setActive] = useState<string>("all");

  const used = useMemo(
    () =>
      categories.filter((category) =>
        automations.some((item) => item.category_slug === category.slug),
      ),
    [categories, automations],
  );

  const filtered = useMemo(
    () =>
      active === "all"
        ? automations
        : automations.filter((item) => item.category_slug === active),
    [active, automations],
  );

  const tabs = [
    { slug: "all", label: t("ui.all", "All") },
    ...used.map((category) => ({
      slug: category.slug,
      label: L(category.name, locale),
    })),
  ];

  return (
    <div>
      <div
        role="tablist"
        aria-label={t("automations.page.title", "Automations")}
        className="flex flex-wrap gap-2"
      >
        {tabs.map((tab) => (
          <button
            key={tab.slug}
            type="button"
            role="tab"
            aria-selected={active === tab.slug}
            onClick={() => setActive(tab.slug)}
            className={cn(
              "rounded-full border px-4 py-2 text-[13px] font-semibold transition-all",
              active === tab.slug
                ? "border-transparent bg-brand text-white shadow-glow-sm"
                : "border-line/20 bg-surface/50 text-muted hover:text-ink",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((automation, index) => (
          <div
            key={automation.id}
            className="animate-[fadeUp_.5s_ease-out_both]"
            style={{ animationDelay: `${index * 45}ms` }}
          >
            <AutomationCard
              automation={automation}
              category={categories.find(
                (category) => category.slug === automation.category_slug,
              )}
              locale={locale}
              viewLabel={t("ui.view_details", "View details")}
            />
          </div>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted">
          {t("ui.empty", "Nothing here yet.")}
        </p>
      ) : null}

      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
