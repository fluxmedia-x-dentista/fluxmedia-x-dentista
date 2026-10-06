import { notFound } from "next/navigation";

import { ContentEditor } from "@/components/admin/content-editor";
import { HomeSectionsEditor } from "@/components/admin/home-sections-editor";
import { CONTENT_PAGES, sectionsForPage } from "@/lib/content/registry";
import { loadAdminContent } from "@/lib/admin/load-content";
import { createAdminSupabase } from "@/lib/supabase/admin";
import type { ContentPage, HomeSection } from "@/lib/types";

export const dynamic = "force-dynamic";

const PREVIEW_HREF: Partial<Record<ContentPage, string>> = {
  home: "/",
  about: "/about",
  cards: "/cards",
  automations: "/automations",
  social: "/social-media",
  "request-contact": "/request",
  privacy: "/privacy",
  terms: "/terms",
};

const PAGE_SUB: Partial<Record<ContentPage, string>> = {
  home: "Every word, image and button on the home page, plus the section order.",
  about: "The story, services and principles shown on /about.",
  cards: "Hero, NFC steps, comparison table and FAQ intro of the cards page.",
  automations: "Headline, filters and detail-page labels for automations.",
  social: "Headline, process and CTA texts of the social media page.",
  "request-contact": "The three request choices and the contact page texts.",
  footer: "Footer intro, note and column titles.",
  navigation: "Header labels and the main call to action.",
  privacy: "Privacy policy content, written in Markdown.",
  terms: "Terms of service content, written in Markdown.",
  seo: "Default page title, description and share image.",
  ui: "Shared button labels and small interface words.",
};

export function generateStaticParams() {
  return CONTENT_PAGES.map((page) => ({ page: page.page }));
}

export default async function AdminContentPage({
  params,
}: {
  params: { page: string };
}) {
  const meta = CONTENT_PAGES.find((item) => item.page === params.page);
  if (!meta) notFound();

  const page = meta.page;
  const sections = sectionsForPage(page);
  const values = await loadAdminContent();

  let homeSections: HomeSection[] = [];
  if (page === "home") {
    const supabase = createAdminSupabase();
    if (supabase) {
      const { data } = await supabase
        .from("home_sections")
        .select("*")
        .order("sort_order", { ascending: true });
      homeSections = (data ?? []) as HomeSection[];
    }
  }

  return (
    <ContentEditor
      title={meta.title}
      sub={PAGE_SUB[page]}
      sections={sections}
      initialValues={values}
      previewHref={PREVIEW_HREF[page]}
    >
      {page === "home" && homeSections.length > 0 ? (
        <HomeSectionsEditor sections={homeSections} />
      ) : null}
    </ContentEditor>
  );
}
