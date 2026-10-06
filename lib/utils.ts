import type { Locale, ML } from "@/lib/types";
import { LOCALES } from "@/lib/types";

/** Tailwind-friendly conditional class name joiner. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Reads a multilingual value with an English fallback. */
export function L(value: ML | null | undefined, locale: Locale): string {
  if (!value) return "";
  const picked = value[locale];
  if (picked && picked.trim().length > 0) return picked;
  return value.en ?? "";
}

export function isLocale(value: unknown): value is Locale {
  return (
    typeof value === "string" && (LOCALES as readonly string[]).includes(value)
  );
}

export function dirFor(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Small non-cryptographic id, good enough for list rows and session ids. */
export function uid(prefix = ""): string {
  const random = Math.random().toString(36).slice(2, 10);
  const stamp = Date.now().toString(36);
  return `${prefix}${stamp}${random}`;
}

/**
 * Normalises a Moroccan phone number to the wa.me format (212XXXXXXXXX).
 * Accepts 06…, 07…, +212…, 00212…, spaces, dashes and dots.
 */
export function normalizeMoroccanPhone(raw: string): string {
  const digits = (raw || "").replace(/[^\d+]/g, "");
  let value = digits.replace(/^\+/, "");
  if (value.startsWith("00")) value = value.slice(2);
  if (value.startsWith("212")) return value;
  if (value.startsWith("0")) return `212${value.slice(1)}`;
  if (value.length === 9) return `212${value}`;
  return value;
}

export function truncate(value: string, max: number): string {
  if (value.length <= max) return value;
  return `${value.slice(0, Math.max(0, max - 1)).trimEnd()}…`;
}

export function unique<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

export function sortBySortOrder<T extends { sort_order: number }>(
  items: T[],
): T[] {
  return [...items].sort((a, b) => a.sort_order - b.sort_order);
}
