import { unstable_cache } from "next/cache";

import { TAGS } from "@/lib/data/tags";
import {
  fallbackAutomations,
  fallbackCards,
  fallbackCategories,
  fallbackFaqs,
  fallbackPackages,
  fallbackSocialServices,
  fallbackSocialSteps,
} from "@/lib/seed";
import { createPublicSupabase } from "@/lib/supabase/public";
import type {
  Automation,
  CardPriceTier,
  CardProduct,
  Category,
  Faq,
  FaqScope,
  PackageFeature,
  SocialPackage,
  SocialPageService,
  SocialPageStep,
} from "@/lib/types";
import { sortBySortOrder } from "@/lib/utils";

export const getCategories = unstable_cache(
  async (): Promise<Category[]> => {
    const supabase = createPublicSupabase();
    if (!supabase) return sortBySortOrder(fallbackCategories);

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return sortBySortOrder(fallbackCategories);
    }
    return data as Category[];
  },
  ["categories"],
  { tags: [TAGS.categories], revalidate: 300 },
);

export const getAutomations = unstable_cache(
  async (): Promise<Automation[]> => {
    const supabase = createPublicSupabase();
    if (!supabase) return sortBySortOrder(fallbackAutomations);

    const { data, error } = await supabase
      .from("automations")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return sortBySortOrder(fallbackAutomations);
    }
    return data as Automation[];
  },
  ["automations"],
  { tags: [TAGS.automations], revalidate: 300 },
);

export async function getAutomation(
  slug: string,
): Promise<Automation | undefined> {
  const all = await getAutomations();
  return all.find((item) => item.slug === slug);
}

export const getPackages = unstable_cache(
  async (): Promise<SocialPackage[]> => {
    const supabase = createPublicSupabase();
    if (!supabase) return sortBySortOrder(fallbackPackages);

    const { data, error } = await supabase
      .from("social_packages")
      .select("*, package_features(*)")
      .eq("visible", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return sortBySortOrder(fallbackPackages);
    }

    return (
      data as (SocialPackage & { package_features: PackageFeature[] })[]
    ).map((row) => {
      const { package_features: features, ...rest } = row;
      return {
        ...rest,
        features: sortBySortOrder(features ?? []),
      } satisfies SocialPackage;
    });
  },
  ["social-packages"],
  { tags: [TAGS.packages], revalidate: 300 },
);

export const getCardProducts = unstable_cache(
  async (): Promise<CardProduct[]> => {
    const supabase = createPublicSupabase();
    if (!supabase) return sortBySortOrder(fallbackCards);

    const { data, error } = await supabase
      .from("card_products")
      .select("*, card_price_tiers(*)")
      .eq("visible", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return sortBySortOrder(fallbackCards);
    }

    return (
      data as (CardProduct & { card_price_tiers: CardPriceTier[] })[]
    ).map((row) => {
      const { card_price_tiers: tiers, ...rest } = row;
      return {
        ...rest,
        tiers: sortBySortOrder((tiers ?? []).filter((tier) => tier.enabled)),
      } satisfies CardProduct;
    });
  },
  ["card-products"],
  { tags: [TAGS.cards], revalidate: 300 },
);

export const getFaqs = unstable_cache(
  async (scope: FaqScope): Promise<Faq[]> => {
    const supabase = createPublicSupabase();
    if (!supabase) {
      return sortBySortOrder(
        fallbackFaqs.filter((faq) => faq.scope === scope && faq.visible),
      );
    }

    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .eq("scope", scope)
      .eq("visible", true)
      .order("sort_order", { ascending: true });

    if (error || !data) {
      return sortBySortOrder(
        fallbackFaqs.filter((faq) => faq.scope === scope && faq.visible),
      );
    }
    return data as Faq[];
  },
  ["faqs"],
  { tags: [TAGS.faqs], revalidate: 300 },
);

export const getSocialPageServices = unstable_cache(
  async (): Promise<SocialPageService[]> => {
    const supabase = createPublicSupabase();
    if (!supabase) return sortBySortOrder(fallbackSocialServices);

    const { data, error } = await supabase
      .from("social_page_services")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return sortBySortOrder(fallbackSocialServices);
    }
    return data as SocialPageService[];
  },
  ["social-page-services"],
  { tags: [TAGS.socialPage], revalidate: 300 },
);

export const getSocialPageSteps = unstable_cache(
  async (): Promise<SocialPageStep[]> => {
    const supabase = createPublicSupabase();
    if (!supabase) return sortBySortOrder(fallbackSocialSteps);

    const { data, error } = await supabase
      .from("social_page_steps")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return sortBySortOrder(fallbackSocialSteps);
    }
    return data as SocialPageStep[];
  },
  ["social-page-steps"],
  { tags: [TAGS.socialPage], revalidate: 300 },
);
