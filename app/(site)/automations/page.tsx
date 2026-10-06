import type { Metadata } from "next";

import { AutomationsBrowser } from "@/components/automations-browser";
import { PageHero } from "@/components/page-hero";
import { getContent } from "@/lib/content/get-content";
import { getAutomations, getCategories } from "@/lib/data/catalog";
import { getRequestLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent(getRequestLocale());
  return {
    title: content.t("automations.page.title"),
    description: content.t("automations.page.sub"),
  };
}

export default async function AutomationsPage() {
  const locale = getRequestLocale();
  const [content, automations, categories] = await Promise.all([
    getContent(locale),
    getAutomations(),
    getCategories(),
  ]);

  return (
    <>
      <PageHero
        locale={locale}
        image={content.img("automations.bg")}
        badge={content.t("automations.page.badge")}
        title={content.t("automations.page.title")}
        sub={content.t("automations.page.sub")}
      />

      <section className="container-x pb-24">
        <AutomationsBrowser automations={automations} categories={categories} />
      </section>
    </>
  );
}
