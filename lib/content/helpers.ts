import type {
  ContentEntry,
  ContentListItem,
  ContentPage,
  ML,
} from "@/lib/types";

type ListRow = {
  title: ML;
  text?: ML;
  extra?: ML;
};

const EMPTY: ML = { en: "", fr: "", ar: "" };

export function listItems(key: string, rows: ListRow[]): ContentListItem[] {
  return rows.map((row, index) => ({
    id: `${key}-${index + 1}`,
    title: row.title,
    text: row.text ?? EMPTY,
    extra: row.extra ?? EMPTY,
  }));
}

/**
 * Small builder that keeps the registry readable: one `section()` call per
 * admin panel, then one line per editable value.
 */
export function section(page: ContentPage, sectionName: string) {
  const base = { page, section: sectionName };

  return {
    text(key: string, label: string, value: ML): ContentEntry {
      return { ...base, key, label, kind: "text", default: value };
    },
    area(key: string, label: string, value: ML): ContentEntry {
      return { ...base, key, label, kind: "textarea", default: value };
    },
    rich(key: string, label: string, value: ML): ContentEntry {
      return { ...base, key, label, kind: "richtext", default: value };
    },
    image(
      key: string,
      label: string,
      url: string,
      alt: ML,
      overlay = 55,
    ): ContentEntry {
      return {
        ...base,
        key,
        label,
        kind: "image",
        default: { url, alt, overlay },
      };
    },
    link(key: string, label: string, href: string, text: ML): ContentEntry {
      return {
        ...base,
        key,
        label,
        kind: "link",
        default: { href, label: text },
      };
    },
    bool(key: string, label: string, value: boolean): ContentEntry {
      return { ...base, key, label, kind: "bool", default: value };
    },
    num(key: string, label: string, value: number): ContentEntry {
      return { ...base, key, label, kind: "number", default: value };
    },
    list(
      key: string,
      label: string,
      rows: ListRow[],
      help?: string,
    ): ContentEntry {
      return {
        ...base,
        key,
        label,
        kind: "list",
        help,
        default: listItems(key, rows),
      };
    },
  };
}
