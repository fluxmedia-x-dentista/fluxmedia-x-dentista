import { cookies } from "next/headers";

import type { Locale } from "@/lib/types";
import { isLocale } from "@/lib/utils";

/** Reads the visitor's language from the `locale` cookie (default: en). */
export function getRequestLocale(): Locale {
  const value = cookies().get("locale")?.value;
  return isLocale(value) ? value : "en";
}
