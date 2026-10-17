import type { Metadata } from "next";
import { Suspense } from "react";

import { PageHero } from "@/components/page-hero";
import { Reveal, SectionHead } from "@/components/ui";
import { WhatsAppOrderButton } from "@/components/whatsapp-button";
import { CardsBrowser } from "@/components/cards-browser";
import { getContent } from "@/lib/content/get-content";
import { getCardProducts } from "@/lib/data/catalog";
import { getSiteSettings } from "@/lib/data/site";
import { getRequestLocale } from "@/lib/locale";
import { L } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent(getRequestLocale());
  return {
    title: content.t("nfc.hero.title1"),
    description: content.t("nfc.hero.sub"),
  };
}

export default async function NfcCardsPage() {
  const locale = getRequestLocale();
  const [content, allCards, settings] = await Promise.all([
    getContent(locale),
    getCardProducts(),
    getSiteSettings(),
  ]);
  const cards = allCards.filter((card) => card.type === "nfc");
  const examples = content.list("nfc.examples.items");
  const steps = content.list("nfc.process.steps");
  const videoUrl = content.t("nfc.video.url").trim();
  const youtubeVideoId = videoUrl.includes("youtube.com/watch?v=")
    ? videoUrl.split("v=")[1]?.split("&")[0]
    : videoUrl.includes("youtu.be/")
      ? videoUrl.split("youtu.be/")[1]?.split("?")[0]
      : "";
  const exampleImages = [
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=85",
  ];

  return (
    <>
      <PageHero
        locale={locale}
        image={content.img("nfc.bg")}
        badge={content.t("nfc.hero.badge")}
        accent="brand"
        title={<>{content.t("nfc.hero.title1")}{" "}<span className="text-gradient">{content.t("nfc.hero.title2")}</span></>}
        sub={content.t("nfc.hero.sub")}
      >
        <div className="mt-5 flex flex-wrap gap-3">
          <a href="#nfc-products" className="btn-brand">{content.t("nfc.hero.cta_primary")}</a>
          <a href="#nfc-examples" className="btn-ghost">{content.t("nfc.hero.cta_secondary")}</a>
        </div>
      </PageHero>

      <section id="nfc-products" className={`container-x py-14 ${content.bool("nfc.section.products.visible") ? "" : "hidden"}`}>
        <Reveal>
          <SectionHead align="start" title={content.t("nfc.products.title")} sub={content.t("nfc.products.sub")} />
        </Reveal>
        <div className="mt-8">
          <Suspense fallback={null}><CardsBrowser cards={cards} phone={settings.whatsapp_number} /></Suspense>
        </div>
      </section>

      <section id="nfc-examples" className={`relative py-16 ${content.bool("nfc.section.examples.visible") ? "" : "hidden"}`}>
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-50" />
        <div className="container-x">
          <Reveal>
            <SectionHead title={content.t("nfc.examples.title")} sub={content.t("nfc.examples.sub")} />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {examples.map((item, index) => (
              <Reveal key={item.id} delay={index * 70}>
                <article className="card h-full overflow-hidden p-0 transition-transform duration-300 hover:-translate-y-1">
                  {L(item.extra, locale).trim() ? (
                    <img src={L(item.extra, locale).trim() || exampleImages[index % exampleImages.length]} alt={L(item.title, locale)} loading="lazy" className="aspect-[16/10] w-full object-cover" />
                  ) : (
                    <div className="flex aspect-[16/10] items-center justify-center bg-brand/10 text-sm font-semibold text-brand">FLUXMEDIA NFC</div>
                  )}
                  <div className="p-6">
                  <h3 className="font-display text-lg font-bold">{L(item.title, locale)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{L(item.text, locale)}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`container-x py-16 ${content.bool("nfc.section.process.visible") ? "" : "hidden"}`}>
        <Reveal>
          <SectionHead title={content.t("nfc.process.title")} sub={content.t("nfc.process.sub")} />
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.id} delay={index * 70}>
              <article className="card h-full p-6">
                <span className="font-display text-3xl font-extrabold text-brand/35">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-base font-bold">{L(step.title, locale)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{L(step.text, locale)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>



      <section className={`container-x pb-24 ${content.bool("nfc.section.final.visible") ? "" : "hidden"}`}>
        <Reveal>
          <div className="rounded-3xl border border-brand/25 bg-surface/60 p-8 text-center sm:p-12">
            <h2 className="section-title">{content.t("nfc.final.title")}</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted">{content.t("nfc.final.sub")}</p>
            <div className="mt-7 flex justify-center">
              <WhatsAppOrderButton payload={{ kind: "general" }} phone={settings.whatsapp_number} label={content.t("nfc.final.cta")} variant="brand" />
            </div>
          </div>
        </Reveal>
      </section>

      <section id="nfc-how-to-use" className={`container-x pb-20 ${content.bool("nfc.section.video.visible") ? "" : "hidden"}`}>
        <Reveal>
          <div className="grid items-center gap-8 rounded-3xl border border-line/20 bg-surface/60 p-6 md:grid-cols-2 md:p-10">
            <div>
              <SectionHead align="start" title={content.t("nfc.video.title")} sub={content.t("nfc.video.sub")} />
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {content.t("nfc.video.instructions")}
              </p>
            </div>
            {youtubeVideoId ? (
              <iframe
                className="aspect-video w-full rounded-2xl border border-line/20 bg-black"
                src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}`}
                title={content.t("nfc.video.title")}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <video className="aspect-video w-full rounded-2xl border border-line/20 bg-black" controls preload="metadata" playsInline src={videoUrl}>
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </Reveal>
      </section>
    </>
  );
}
