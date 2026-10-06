import { commonEntries } from "@/lib/content/registry/common";
import { homeEntries } from "@/lib/content/registry/home";
import { legalEntries } from "@/lib/content/registry/legal";
import { pageEntries } from "@/lib/content/registry/pages";
import type { ContentDictionary, ContentEntry, ContentPage } from "@/lib/types";

/**
 * THE registry: every editable value on the public site is declared here.
 * Adding an entry automatically makes it editable in the admin panel and
 * seedable by `npm run db:seed`.
 */
export const CONTENT_REGISTRY: ContentEntry[] = [
  ...homeEntries,
  ...pageEntries,
  ...commonEntries,
  ...legalEntries,
];

export const REGISTRY_BY_KEY: Map<string, ContentEntry> = new Map(
  CONTENT_REGISTRY.map((entry) => [entry.key, entry]),
);

/** Registry defaults as a ready-to-use dictionary. */
export const REGISTRY_DEFAULTS: ContentDictionary = Object.fromEntries(
  CONTENT_REGISTRY.map((entry) => [entry.key, entry.default]),
);

export const CONTENT_PAGES: {
  page: ContentPage;
  title: string;
  href: string;
}[] = [
  { page: "home", title: "Home page", href: "/admin/pages/home" },
  { page: "about", title: "About page", href: "/admin/pages/about" },
  { page: "cards", title: "Cards page", href: "/admin/pages/cards" },
  {
    page: "automations",
    title: "Automations page",
    href: "/admin/pages/automations",
  },
  { page: "social", title: "Social page", href: "/admin/pages/social" },
  {
    page: "request-contact",
    title: "Request & Contact",
    href: "/admin/pages/request-contact",
  },
  { page: "footer", title: "Footer", href: "/admin/pages/footer" },
  {
    page: "navigation",
    title: "Navbar labels",
    href: "/admin/pages/navigation",
  },
  { page: "privacy", title: "Privacy", href: "/admin/pages/privacy" },
  { page: "terms", title: "Terms", href: "/admin/pages/terms" },
  { page: "seo", title: "SEO defaults", href: "/admin/pages/seo" },
  { page: "ui", title: "Buttons & labels", href: "/admin/pages/ui" },
];

export function entriesForPage(page: ContentPage): ContentEntry[] {
  return CONTENT_REGISTRY.filter((entry) => entry.page === page);
}

/** Groups a page's entries by section, preserving registry order. */
export function sectionsForPage(
  page: ContentPage,
): { section: string; entries: ContentEntry[] }[] {
  const groups: { section: string; entries: ContentEntry[] }[] = [];
  for (const entry of entriesForPage(page)) {
    const existing = groups.find((group) => group.section === entry.section);
    if (existing) {
      existing.entries.push(entry);
    } else {
      groups.push({ section: entry.section, entries: [entry] });
    }
  }
  return groups;
}
