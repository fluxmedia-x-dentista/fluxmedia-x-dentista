import type { Metadata } from "next";

import { FaqList } from "@/components/faq";
import { PackageCard } from "@/components/package-card";
import { PageHero } from "@/components/page-hero";
import {
  ArrowIcon,
  Icon,
  PlatformGlyph,
  Reveal,
  SectionHead,
} from "@/components/ui";
import { WhatsAppOrderButton } from "@/components/whatsapp-button";
import { getContent } from "@/lib/content/get-content";
import {
  getFaqs,
  getPackages,
  getSocialPageServices,
  getSocialPageSteps,
} from "@/lib/data/catalog";
import { getSiteSettings } from "@/lib/data/site";
import { getRequestLocale } from "@/lib/locale";
import { L, unique } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent(getRequestLocale());
  return {
    title: `${content.t("social.hero.title1")} ${content.t("social.hero.title2")}`,
    description: content.t("social.hero.sub"),
  };
}

export default async function SocialMediaPage() {
  const locale = getRequestLocale();
  const [content, packages, services, steps, faqs, settings] =
    await Promise.all([
      getContent(locale),
      getPackages(),
      getSocialPageServices(),
      getSocialPageSteps(),
      getFaqs("social"),
      getSiteSettings(),
    ]);

  const platforms = unique(packages.flatMap((pack) => pack.platforms));

  return (
    <>
      <PageHero
        locale={locale}
        image={content.img("social.bg")}
        badge={content.t("social.hero.badge")}
        title={
          <>
            {content.t("social.hero.title1")}{" "}
            <span className="grad-text">{content.t("social.hero.title2")}</span>
          </>
        }
        sub={content.t("social.hero.sub")}
      >
        <a href="#packages" className="btn-brand mt-2">
          {content.t("social.hero.cta")}
          <ArrowIcon />
        </a>
      </PageHero>

      {/* Services */}
      <section className="container-x py-16">
        <Reveal>
          <SectionHead
            title={content.t("social.services.title")}
            sub={content.t("social.services.sub")}
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 60}>
              <div className="card h-full p-5">
                <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky/15 text-sky">
                  <Icon name={service.icon} className="h-4.5 w-4.5" />
                </span>
                <h3 className="font-display text-[15px] font-bold">
                  {L(service.title, locale)}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  {L(service.text, locale)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Platforms */}
      <section className="relative py-16">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-50" />
        <div className="container-x">
          <Reveal>
            <SectionHead title={content.t("social.platforms.title")} />
          </Reveal>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {platforms.map((platform) => (
              <span
                key={platform}
                className="inline-flex items-center gap-2 rounded-full border border-line/20 bg-surface/60 px-4 py-2 text-[13px] font-semibold capitalize text-ink"
              >
                <PlatformGlyph id={platform} className="h-4 w-4 text-sky" />
                {platform}
              </span>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-[13px] leading-relaxed text-muted">
            {content.t("social.platforms.note")}
          </p>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="container-x scroll-mt-24 py-16">
        <Reveal>
          <SectionHead
            title={content.t("social.packages.title")}
            sub={content.t("social.packages.sub")}
          />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {packages.map((pack, index) => (
            <Reveal key={pack.id} delay={index * 80}>
              <PackageCard
                pack={pack}
                locale={locale}
                phone={settings.whatsapp_number}
                labels={{
                  popular: content.t("ui.popular"),
                  perMonth: content.t("ui.per_month"),
                  order: content.t("ui.order_whatsapp"),
                  priceOnWhatsApp: content.t("ui.price_on_whatsapp"),
                }}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="container-x py-16">
        <Reveal>
          <SectionHead title={content.t("social.process.title")} />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-5">
          {steps.map((step, index) => (
            <Reveal key={step.id} delay={index * 70}>
              <div className="card h-full p-5">
                <span className="font-display text-3xl font-extrabold text-line/20">
                  {String(step.step_no).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-[15px] font-bold">
                  {L(step.title, locale)}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  {L(step.text, locale)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 ? (
        <section className="container-x py-16">
          <Reveal>
            <SectionHead title={content.t("social.faq.title")} />
          </Reveal>
          <div className="mt-10">
            <FaqList faqs={faqs} />
          </div>
        </section>
      ) : null}

      {/* Final CTA */}
      <section className="container-x pb-24 pt-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line/15 bg-surface/60 p-10 text-center sm:p-14">
            <span className="glow-orb -start-10 -top-10 h-64 w-64 bg-blue/25" />
            <span className="glow-orb -end-10 -bottom-10 h-64 w-64 bg-violet/25" />
            <h2 className="section-title mx-auto max-w-2xl text-balance">
              {content.t("social.final.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
              {content.t("social.final.sub")}
            </p>
            <div className="mt-8 flex justify-center">
              <WhatsAppOrderButton
                payload={{ kind: "general" }}
                phone={settings.whatsapp_number}
                label={content.t("ui.chat_whatsapp")}
              />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
