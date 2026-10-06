/**
 * Seed data lives here once and is used twice:
 *
 *  1. `tools/seed.ts` inserts it into a fresh Supabase project.
 *  2. The data layer serves it read-only when Supabase is not configured yet,
 *     so the site can be previewed before the database exists.
 */

import type {
  Automation,
  CardProduct,
  Category,
  Faq,
  FooterLink,
  NavigationItem,
  ReplyTemplate,
  SiteSettings,
  SocialLink,
  SocialPackage,
  SocialPageService,
  SocialPageStep,
} from "@/lib/types";

import { seedAutomations } from "@/lib/seed/automations";
import {
  seedCards,
  seedCategories,
  seedFaqs,
  seedPackages,
  seedSocialServices,
  seedSocialSteps,
} from "@/lib/seed/catalog";
import {
  seedFooterLinks,
  seedHomeSections,
  seedNavigation,
  seedReplyTemplates,
  seedSettings,
  seedSocialLinks,
} from "@/lib/seed/site";

export {
  seedAutomations,
  seedCards,
  seedCategories,
  seedFaqs,
  seedPackages,
  seedSocialServices,
  seedSocialSteps,
  seedFooterLinks,
  seedHomeSections,
  seedNavigation,
  seedReplyTemplates,
  seedSettings,
  seedSocialLinks,
};

const id = (prefix: string, value: string | number) =>
  `seed-${prefix}-${value}`;

export const fallbackSettings: SiteSettings = {
  id: id("settings", 1),
  ...seedSettings,
};

export const fallbackCategories: Category[] = seedCategories.map((row) => ({
  id: id("category", row.slug),
  ...row,
}));

export const fallbackAutomations: Automation[] = seedAutomations.map((row) => ({
  id: id("automation", row.slug),
  ...row,
}));

export const fallbackPackages: SocialPackage[] = seedPackages.map((row) => {
  const packageId = id("package", row.slug);
  const { features, ...rest } = row;
  return {
    id: packageId,
    ...rest,
    features: features.map((feature, index) => ({
      id: `${packageId}-feature-${index + 1}`,
      package_id: packageId,
      text: feature.text,
      sort_order: feature.sort_order,
    })),
  };
});

export const fallbackCards: CardProduct[] = seedCards.map((row) => {
  const cardId = id("card", row.slug);
  const { tiers, ...rest } = row;
  return {
    id: cardId,
    ...rest,
    tiers: tiers.map((tier, index) => ({
      id: `${cardId}-tier-${index + 1}`,
      card_id: cardId,
      quantity: tier.quantity,
      price_mad: tier.price_mad,
      enabled: true,
      sort_order: tier.sort_order,
    })),
  };
});

export const fallbackFaqs: Faq[] = seedFaqs.map((row, index) => ({
  id: id("faq", index + 1),
  ...row,
}));

export const fallbackNavigation: NavigationItem[] = seedNavigation.map(
  (row, index) => ({ id: id("nav", index + 1), ...row }),
);

export const fallbackFooterLinks: FooterLink[] = seedFooterLinks.map(
  (row, index) => ({ id: id("footer", index + 1), ...row }),
);

export const fallbackSocialLinks: SocialLink[] = seedSocialLinks.map((row) => ({
  id: id("social-link", row.platform),
  ...row,
}));

export const fallbackSocialServices: SocialPageService[] =
  seedSocialServices.map((row, index) => ({
    id: id("social-service", index + 1),
    ...row,
  }));

export const fallbackSocialSteps: SocialPageStep[] = seedSocialSteps.map(
  (row, index) => ({ id: id("social-step", index + 1), ...row }),
);

export const fallbackReplyTemplates: ReplyTemplate[] = seedReplyTemplates.map(
  (row) => ({ id: id("template", row.key), ...row }),
);
