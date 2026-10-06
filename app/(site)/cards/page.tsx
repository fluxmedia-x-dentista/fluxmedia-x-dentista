import type { Metadata } from "next";
import { Suspense } from "react";

import { BrandLockup } from "@/components/brand-lockup";
import { CardsBrowser } from "@/components/cards-browser";
import { FaqList } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { Icon, Reveal, SectionHead } from "@/components/ui";
import { WhatsAppOrderButton } from "@/components/whatsapp-button";
import { getContent } from "@/lib/content/get-content";
import { getCardProducts, getFaqs } from "@/lib/data/catalog";
import { getSiteSettings } from "@/lib/data/site";
import { getRequestLocale } from "@/lib/locale";
import { L } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent(getRequestLocale());
  return {
    title: content.t("cards.hero.title1"),
    description: content.t("cards.hero.sub"),
  };
}

export default async function CardsPage() {
  const locale = getRequestLocale();
  const [content, cards, faqs, settings] = await Promise.all([
    getContent(locale),
    getCardProducts(),
    getFaqs("cards"),
    getSiteSettings(),
  ]);

  const nfcSteps = content.list("cards.nfc.steps");
  const compareRows = content.list("cards.compare.rows");
  const orderSteps = content.list("cards.order.steps");

  return (
    <>
      <PageHero
        locale={locale}
        image={content.img("cards.bg")}
        badge={content.t("cards.hero.badge")}
        accent="dentista"
        title={
          <>
            {content.t("cards.hero.title1")}{" "}
            <span className="text-dentista">
              {content.t("cards.hero.title2")}
            </span>
          </>
        }
        sub={content.t("cards.hero.sub")}
      >
        <BrandLockup size={30} boxed className="mt-2" />
      </PageHero>

      {/* Products */}
      <section className="container-x py-12">
        <Reveal>
          <SectionHead
            align="start"
            accent="dentista"
            title={content.t("cards.products.title")}
            sub={content.t("cards.products.sub")}
          />
        </Reveal>
        <div className="mt-10">
          <Suspense fallback={null}>
            <CardsBrowser cards={cards} phone={settings.whatsapp_number} />
          </Suspense>
        </div>
      </section>

      {/* How NFC works */}
      <section className="relative py-16">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-50" />
        <div className="container-x">
          <Reveal>
            <SectionHead
              accent="dentista"
              title={content.t("cards.nfc.title")}
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {nfcSteps.map((step, index) => (
              <Reveal key={step.id} delay={index * 70}>
                <div className="card h-full p-5">
                  <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-dentista/15 text-dentista">
                    <Icon
                      name={["nfc", "globe", "users", "pen"][index] ?? "nfc"}
                      className="h-4.5 w-4.5"
                    />
                  </span>
                  <h3 className="font-display text-[15px] font-bold">
                    {L(step.title, locale)}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">
                    {L(step.text, locale)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="container-x py-16">
        <Reveal>
          <SectionHead
            accent="dentista"
            title={content.t("cards.compare.title")}
          />
        </Reveal>
        <Reveal>
          <div className="mt-10 overflow-hidden rounded-2xl border border-line/15">
            <table className="w-full text-start text-[13.5px]">
              <thead className="bg-surface2/60">
                <tr>
                  <th className="px-5 py-3.5 text-start font-semibold text-muted" />
                  <th className="px-5 py-3.5 text-start font-display font-bold">
                    {content.t("ui.regular")}
                  </th>
                  <th className="px-5 py-3.5 text-start font-display font-bold text-dentista">
                    {content.t("ui.nfc")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={index % 2 === 0 ? "bg-surface/40" : ""}
                  >
                    <th className="px-5 py-3.5 text-start font-semibold text-muted">
                      {L(row.title, locale)}
                    </th>
                    <td className="px-5 py-3.5 text-ink/90">
                      {L(row.text, locale)}
                    </td>
                    <td className="px-5 py-3.5 text-ink/90">
                      {L(row.extra, locale)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      {/* Ordering process */}
      <section className="container-x py-16">
        <Reveal>
          <SectionHead
            accent="dentista"
            title={content.t("cards.order.title")}
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {orderSteps.map((step, index) => (
            <Reveal key={step.id} delay={index * 70}>
              <div className="card h-full p-5">
                <span className="font-display text-3xl font-extrabold text-dentista/30">
                  {String(index + 1).padStart(2, "0")}
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
            <SectionHead
              accent="dentista"
              title={content.t("cards.faq.title")}
            />
          </Reveal>
          <div className="mt-10">
            <FaqList faqs={faqs} />
          </div>
        </section>
      ) : null}

      {/* Final CTA */}
      <section className="container-x pb-24 pt-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-dentista/25 bg-surface/60 p-10 text-center sm:p-14">
            <span className="glow-orb -start-10 -top-10 h-64 w-64 bg-dentista/25" />
            <span className="glow-orb -end-10 -bottom-10 h-64 w-64 bg-violet/25" />
            <h2 className="section-title mx-auto max-w-2xl text-balance">
              {content.t("cards.final.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
              {content.t("cards.final.sub")}
            </p>
            <div className="mt-8 flex justify-center">
              <WhatsAppOrderButton
                payload={{ kind: "general" }}
                phone={settings.whatsapp_number}
                variant="dentista"
                label={content.t("ui.chat_whatsapp")}
              />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
