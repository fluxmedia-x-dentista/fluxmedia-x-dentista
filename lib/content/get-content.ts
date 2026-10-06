import { unstable_cache } from "next/cache";

import { REGISTRY_DEFAULTS, REGISTRY_BY_KEY } from "@/lib/content/registry";
import { createPublicSupabase } from "@/lib/supabase/public";
import type {
  ClientDictionary,
  ContentDictionary,
  ContentImage,
  ContentLink,
  ContentListItem,
  ContentValue,
  Locale,
  ML,
} from "@/lib/types";
import { L } from "@/lib/utils";

export const CONTENT_TAG = "content";

/**
 * Loads `site_content` and merges the stored values over the registry
 * defaults. Cached and revalidated with the `content` tag on every save.
 */
const loadDictionary = unstable_cache(
  async (): Promise<ContentDictionary> => {
    const supabase = createPublicSupabase();
    if (!supabase) return { ...REGISTRY_DEFAULTS };

    const { data, error } = await supabase
      .from("site_content")
      .select("key, value");

    if (error || !data) {
      if (error) console.error("[content] load failed:", error.message);
      return { ...REGISTRY_DEFAULTS };
    }

    const merged: ContentDictionary = { ...REGISTRY_DEFAULTS };
    for (const row of data as { key: string; value: ContentValue }[]) {
      if (row.value !== null && row.value !== undefined) {
        merged[row.key] = row.value;
      }
    }
    return merged;
  },
  ["site-content-dictionary"],
  { tags: [CONTENT_TAG], revalidate: 300 },
);

export async function getContentDictionary(): Promise<ContentDictionary> {
  return loadDictionary();
}

/* -------------------------------------------------------------------------- */
/* Reader                                                                      */
/* -------------------------------------------------------------------------- */

const EMPTY_ML: ML = { en: "", fr: "", ar: "" };

export type ContentReader = {
  locale: Locale;
  dictionary: ContentDictionary;
  /** Localised string for a text / textarea / richtext key. */
  t: (key: string) => string;
  /** Raw multilingual value (useful for alt text and metadata). */
  ml: (key: string) => ML;
  img: (key: string) => ContentImage;
  link: (key: string) => ContentLink;
  list: (key: string) => ContentListItem[];
  bool: (key: string) => boolean;
  num: (key: string) => number;
};

function isML(value: unknown): value is ML {
  return (
    typeof value === "object" &&
    value !== null &&
    "en" in (value as Record<string, unknown>)
  );
}

export function createContentReader(
  dictionary: ContentDictionary,
  locale: Locale,
): ContentReader {
  const read = (key: string): ContentValue | undefined =>
    dictionary[key] ?? REGISTRY_BY_KEY.get(key)?.default;

  return {
    locale,
    dictionary,
    t(key) {
      const value = read(key);
      if (isML(value)) return L(value, locale);
      if (typeof value === "string") return value;
      if (typeof value === "number") return String(value);
      return "";
    },
    ml(key) {
      const value = read(key);
      return isML(value) ? value : EMPTY_ML;
    },
    img(key) {
      const value = read(key) as ContentImage | undefined;
      if (value && typeof value === "object" && "url" in value) return value;
      return { url: "", alt: EMPTY_ML, overlay: 55 };
    },
    link(key) {
      const value = read(key) as ContentLink | undefined;
      if (value && typeof value === "object" && "href" in value) return value;
      return { href: "#", label: EMPTY_ML };
    },
    list(key) {
      const value = read(key);
      return Array.isArray(value) ? (value as ContentListItem[]) : [];
    },
    bool(key) {
      return Boolean(read(key));
    },
    num(key) {
      const value = read(key);
      return typeof value === "number" ? value : Number(value ?? 0);
    },
  };
}

/** Server helper: dictionary + reader in one call. */
export async function getContent(locale: Locale): Promise<ContentReader> {
  const dictionary = await getContentDictionary();
  return createContentReader(dictionary, locale);
}

/**
 * Flattens text values for the active locale so client components can call
 * `t(key)` without shipping the whole trilingual dictionary.
 */
export function toClientDictionary(
  dictionary: ContentDictionary,
  locale: Locale,
): ClientDictionary {
  const strings: ClientDictionary = {};
  for (const [key, value] of Object.entries(dictionary)) {
    if (isML(value)) strings[key] = L(value, locale);
  }
  return strings;
}
