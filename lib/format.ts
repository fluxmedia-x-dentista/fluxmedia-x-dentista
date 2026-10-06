import type { Locale } from "@/lib/types";

const CURRENCY_LABEL: Record<Locale, string> = {
  en: "DH",
  fr: "DH",
  ar: "درهم",
};

const NUMBER_LOCALE: Record<Locale, string> = {
  en: "en-US",
  fr: "fr-MA",
  ar: "ar-MA",
};

/** Formats an amount in Moroccan dirham. Never renders a $ sign. */
export function formatPriceMAD(
  amount: number | null | undefined,
  locale: Locale,
): string | null {
  if (amount === null || amount === undefined || Number.isNaN(amount)) {
    return null;
  }
  const formatted = new Intl.NumberFormat(NUMBER_LOCALE[locale], {
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
  return `${formatted} ${CURRENCY_LABEL[locale]}`;
}

/** Plain-ASCII price used inside WhatsApp machine blocks. */
export function priceForMessage(
  amount: number | null | undefined,
  locale: Locale,
): string | null {
  if (amount === null || amount === undefined) return null;
  const formatted = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
  return `${formatted} ${CURRENCY_LABEL[locale]}`;
}

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(NUMBER_LOCALE[locale]).format(value);
}

export function formatDate(
  value: string | Date | null | undefined,
  locale: Locale,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
): string {
  if (!value) return "";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(NUMBER_LOCALE[locale], options).format(date);
}

/** Compact date/time used across the admin (always en-GB, admin is LTR). */
export function formatAdminDateTime(value: string | null | undefined): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function perCardPrice(
  total: number | null | undefined,
  quantity: number,
  locale: Locale,
): string | null {
  if (total === null || total === undefined || quantity <= 0) return null;
  return formatPriceMAD(Math.round((total / quantity) * 100) / 100, locale);
}
