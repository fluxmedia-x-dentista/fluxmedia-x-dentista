"use client";

import { useI18n } from "@/components/providers";
import { LOCALES, type Locale } from "@/lib/types";
import { cn } from "@/lib/utils";

const LABELS: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  ar: "AR",
};

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t("ui.language", "Language")}
      className={cn(
        "inline-flex items-center rounded-full border border-line/20 bg-surface/60 p-0.5",
        className,
      )}
    >
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          aria-current={locale === code}
          className={cn(
            "rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide transition-colors",
            locale === code
              ? "bg-brand text-white shadow-glow-sm"
              : "text-muted hover:text-ink",
          )}
        >
          {LABELS[code]}
        </button>
      ))}
    </div>
  );
}
