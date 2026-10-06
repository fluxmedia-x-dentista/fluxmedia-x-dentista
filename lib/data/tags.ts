/** Cache tags shared by the public data layer and the admin API routes. */
export const TAGS = {
  content: "content",
  settings: "settings",
  homeSections: "home-sections",
  navigation: "navigation",
  footer: "footer-links",
  categories: "categories",
  automations: "automations",
  packages: "packages",
  cards: "cards",
  faqs: "faqs",
  socialPage: "social-page",
  socialLinks: "social-links",
} as const;

export type CacheTag = (typeof TAGS)[keyof typeof TAGS];

export const ALL_TAGS: CacheTag[] = Object.values(TAGS);
