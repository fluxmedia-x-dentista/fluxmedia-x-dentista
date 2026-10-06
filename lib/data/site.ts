import { unstable_cache } from "next/cache";

import { TAGS } from "@/lib/data/tags";
import {
  fallbackFooterLinks,
  fallbackNavigation,
  fallbackSettings,
  fallbackSocialLinks,
  seedHomeSections,
} from "@/lib/seed";
import { createPublicSupabase } from "@/lib/supabase/public";
import type {
  FooterLink,
  HomeSection,
  NavigationItem,
  SiteSettings,
  SocialLink,
} from "@/lib/types";
import { sortBySortOrder } from "@/lib/utils";

export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    const supabase = createPublicSupabase();
    if (!supabase) return fallbackSettings;

    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error || !data) return fallbackSettings;
    return data as SiteSettings;
  },
  ["site-settings"],
  { tags: [TAGS.settings], revalidate: 300 },
);

export const getHomeSections = unstable_cache(
  async (): Promise<HomeSection[]> => {
    const supabase = createPublicSupabase();
    if (!supabase) return seedHomeSections;

    const { data, error } = await supabase
      .from("home_sections")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return seedHomeSections;
    return data as HomeSection[];
  },
  ["home-sections"],
  { tags: [TAGS.homeSections], revalidate: 300 },
);

export const getNavigation = unstable_cache(
  async (
    placement: "header" | "footer" = "header",
  ): Promise<NavigationItem[]> => {
    const supabase = createPublicSupabase();
    if (!supabase) {
      return sortBySortOrder(
        fallbackNavigation.filter(
          (item) => item.active && item.placement === placement,
        ),
      );
    }

    const { data, error } = await supabase
      .from("navigation_items")
      .select("*")
      .eq("active", true)
      .eq("placement", placement)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return sortBySortOrder(
        fallbackNavigation.filter(
          (item) => item.active && item.placement === placement,
        ),
      );
    }
    return data as NavigationItem[];
  },
  ["navigation"],
  { tags: [TAGS.navigation], revalidate: 300 },
);

export const getFooterLinks = unstable_cache(
  async (): Promise<FooterLink[]> => {
    const supabase = createPublicSupabase();
    if (!supabase) return sortBySortOrder(fallbackFooterLinks);

    const { data, error } = await supabase
      .from("footer_links")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return sortBySortOrder(fallbackFooterLinks);
    }
    return data as FooterLink[];
  },
  ["footer-links"],
  { tags: [TAGS.footer], revalidate: 300 },
);

export const getSocialLinks = unstable_cache(
  async (): Promise<SocialLink[]> => {
    const supabase = createPublicSupabase();
    if (!supabase) return sortBySortOrder(fallbackSocialLinks);

    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return sortBySortOrder(fallbackSocialLinks);
    }
    return data as SocialLink[];
  },
  ["social-links"],
  { tags: [TAGS.socialLinks], revalidate: 300 },
);
