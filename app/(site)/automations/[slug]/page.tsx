import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AutomationCard } from "@/components/automation-card";
import { Flow } from "@/components/flow";
import { ArrowIcon, CheckIcon, Icon } from "@/components/ui";
import { WhatsAppOrderButton } from "@/components/whatsapp-button";
import { getContent } from "@/lib/content/get-content";
import {
  getAutomation,
  getAutomations,
  getCategories,
} from "@/lib/data/catalog";
import { getSiteSettings } from "@/lib/data/site";
import { getRequestLocale } from "@/lib/locale";
import { L } from "@/lib/utils";

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  const automations = await getAutomations();
  return automations.map((automation) => ({ slug: automation.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const locale = getRequestLocale();
  const automation = await getAutomation(params.slug);
  if (!automation) return { title: "Automation" };

  return {
    title: L(automation.title, locale),
    description: L(automation.short, locale),
    openGraph: {
      title: L(automation.title, locale),
      description: L(automation.short, locale),
      images: automation.thumbnail_url ? [automation.thumbnail_url] : undefined,
    },
  };
}

export default async function AutomationDetailPage({ params }: Params) {
  const locale = getRequestLocale();
  const [content, automation, all, categories, settings] = await Promise.all([
    getContent(locale),
    getAutomation(params.slug),
    getAutomations(),
    getCategories(),
    getSiteSettings(),
  ]);

  if (!automation) notFound();

  const category = categories.find(
    (item) => item.slug === automation.category_slug,
  );
  const related = all
    .filter(
      (item) =>
        item.slug !== automation.slug &&
        item.category_slug === automation.category_slug,
    )
    .slice(0, 3);
  const background = content.img("automations.bg");

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] overflow-hidden">
        {background.url ? (
          <>
            <div className="absolute inset-0 mask-fade-b opacity-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={background.url}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-bg/70" />
          </>
        ) : null}
      </div>

      <div className="container-x pb-24 pt-28 sm:pt-32">
        <Link
          href="/automations"
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-muted transition-colors hover:text-ink"
        >
          <ArrowIcon className="h-3.5 w-3.5 rotate-180 rtl-flip" />
          {content.t("ui.back_to_automations")}
        </Link>

        <div className="mt-6 overflow-hidden rounded-3xl border border-line/15 bg-surface/60">
          <div className="relative aspect-[21/9] w-full bg-surface2">
            {automation.thumbnail_url ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={automation.thumbnail_url}
                alt={L(automation.title, locale)}
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky/15 text-sky">
                <Icon name={automation.icon} />
              </span>
              {category ? (
                <span className="tag">{L(category.name, locale)}</span>
              ) : null}
            </div>

            <h1 className="mt-5 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
              {L(automation.title, locale)}
            </h1>

            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              {L(automation.description, locale)}
            </p>

            <h2 className="mt-10 font-display text-lg font-bold">
              {content.t("ui.benefits")}
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {automation.benefits.map((benefit, index) => (
                <li
                  key={index}
                  className="card flex items-start gap-3 p-4 text-[13.5px]"
                >
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-sky" />
                  <span className="text-muted">{L(benefit, locale)}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-display text-lg font-bold">
              {content.t("ui.integrations")}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {automation.integrations.map((integration) => (
                <span key={integration} className="tag">
                  {integration}
                </span>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-line/15 bg-surface/60 p-6">
              <p className="text-[13.5px] leading-relaxed text-muted">
                {content.t("automations.page.detail_note")}
              </p>
              <WhatsAppOrderButton
                className="mt-5"
                phone={settings.whatsapp_number}
                label={content.t("automations.page.detail_cta")}
                payload={{
                  kind: "automation",
                  title: L(automation.title, locale),
                  titleEn: automation.title_en,
                  slug: automation.slug,
                }}
              />
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <h2 className="mb-5 font-display text-lg font-bold">
                {content.t("ui.how_it_works")}
              </h2>
              <Flow
                nodes={automation.workflow.map((step) => L(step.title, locale))}
              />
            </div>
          </aside>
        </div>

        {related.length > 0 ? (
          <section className="mt-20">
            <h2 className="font-display text-lg font-bold">
              {content.t("ui.related")}
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <AutomationCard
                  key={item.id}
                  automation={item}
                  category={categories.find(
                    (cat) => cat.slug === item.category_slug,
                  )}
                  locale={locale}
                  viewLabel={content.t("ui.view_details")}
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
