import type { Metadata } from "next";
import Link from "next/link";

import { FaqList } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { Reveal, SectionHead } from "@/components/ui";
import { WhatsAppOrderButton } from "@/components/whatsapp-button";
import { getContent } from "@/lib/content/get-content";
import { getFaqs } from "@/lib/data/catalog";
import { getSiteSettings } from "@/lib/data/site";
import { getRequestLocale } from "@/lib/locale";
import { L } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent(getRequestLocale());
  return {
    title: "DENTISTA | " + content.t("cards.promo.hero.title1"),
    description: content.t("cards.promo.hero.sub"),
  };
}

export default async function DentistaPage() {
  const locale = getRequestLocale();
  const [content, faqs, settings] = await Promise.all([
    getContent(locale),
    getFaqs("cards"),
    getSiteSettings(),
  ]);
  const products = content.list("cards.promo.items");

  return (
    <>
      <PageHero
        locale={locale}
        image={content.img("cards.bg")}
        badge="DENTISTA"
        accent="dentista"
        title={<>{content.t("cards.promo.hero.title1")}{" "}<span className="text-dentista">{content.t("cards.promo.hero.title2")}</span></>}
        sub={content.t("cards.promo.hero.sub")}
      >
        <div className="mt-3 inline-flex rounded-xl border border-dentista/25 bg-surface/70 px-4 py-2 text-sm font-semibold text-dentista">
          DENTISTA · Dental promotional products
        </div>
      </PageHero>

      <section className="container-x py-14">
        <Reveal>
          <SectionHead
            align="start"
            accent="dentista"
            title={content.t("cards.promo.section.title")}
            sub={content.t("cards.promo.section.sub")}
          />
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => {
            const imageUrl = L(product.extra, locale).trim();
            return (
              <Reveal key={product.id} delay={index * 70}>
                <article className="card flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex aspect-[4/3] items-center justify-center overflow-hidden border-b border-line/15 bg-surface2/50">
                    {imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={imageUrl} alt={L(product.title, locale)} className="h-full w-full object-cover" />
                    ) : (
                      <div className="px-8 text-center">
                        <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-dentista/10 text-dentista text-xl">✦</span>
                        <p className="text-xs text-muted">Product image can be added in Admin → Pages → DENTISTA products</p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg font-bold">{L(product.title, locale)}</h3>
                    <p className="mt-3 flex-1 whitespace-pre-line text-sm leading-relaxed text-muted">{L(product.text, locale)}</p>
                    <div className="mt-6">
                      <WhatsAppOrderButton
                        payload={{ kind: "general" }}
                        phone={settings.whatsapp_number}
                        variant="dentista"
                        label="Ask about this product"
                        className="w-full justify-center"
                      />
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {faqs.length > 0 ? (
        <section className="container-x py-14">
          <Reveal><SectionHead accent="dentista" title={content.t("cards.faq.title")} /></Reveal>
          <div className="mt-8"><FaqList faqs={faqs} /></div>
        </section>
      ) : null}

      <section className="container-x pb-20 pt-4">
        <div className="mb-8 rounded-2xl border border-brand/20 bg-surface/50 p-5 sm:flex sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display font-bold">Looking for digital NFC cards?</h3>
            <p className="mt-1 text-sm text-muted">Explore FLUXMEDIA’s separate NFC product line.</p>
          </div>
          <Link href="/nfc-cards" className="btn-brand mt-4 inline-flex sm:mt-0">Explore FLUXMEDIA NFC cards</Link>
        </div>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-dentista/25 bg-surface/60 p-8 text-center sm:p-12">
            <span className="glow-orb -start-10 -top-10 h-56 w-56 bg-dentista/20" />
            <h2 className="section-title mx-auto max-w-2xl">Make your clinic memorable.</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted">Personalised promotional mirrors and QR products help patients remember your clinic and find you again.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <WhatsAppOrderButton payload={{ kind: "general" }} phone={settings.whatsapp_number} variant="dentista" label="Discuss a custom order" />
              <Link href="/nfc-cards" className="btn-ghost">Explore FLUXMEDIA NFC cards</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
