import type { Metadata } from "next";

import { BrandLockup } from "@/components/brand-lockup";
import { DentistaLogo } from "@/components/dentista-logo";
import { Logo } from "@/components/logo";
import { Icon, Reveal, SectionHead } from "@/components/ui";
import { WhatsAppOrderButton } from "@/components/whatsapp-button";
import { getContent } from "@/lib/content/get-content";
import { getSiteSettings } from "@/lib/data/site";
import { getRequestLocale } from "@/lib/locale";
import { L } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent(getRequestLocale());
  return {
    title: content.t("about.hero.title"),
    description: content.t("about.hero.sub"),
  };
}

export default async function AboutPage() {
  const locale = getRequestLocale();
  const [content, settings] = await Promise.all([
    getContent(locale),
    getSiteSettings(),
  ]);

  const principles = content.list("about.principles.items");

  const services = [
    {
      icon: "bot",
      title: content.t("home.specialties.automation.title"),
      text: content.t("home.specialties.automation.text"),
    },
    {
      icon: "users",
      title: content.t("home.specialties.social.title"),
      text: content.t("home.specialties.social.text"),
    },
    {
      icon: "card",
      title: content.t("home.specialties.cards.title"),
      text: content.t("home.specialties.cards.text"),
    },
  ];

  return (
    <div className="container-x pb-24 pt-28 sm:pt-32">
      <Reveal>
        <div className="flex max-w-3xl flex-col items-start gap-5">
          <span className="tag border-sky/30 text-sky">
            <span className="h-1.5 w-1.5 rounded-full bg-sky" />
            {content.t("about.hero.badge")}
          </span>
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] text-balance sm:text-5xl">
            {content.t("about.hero.title")}
          </h1>
          <p className="text-[15px] leading-relaxed text-muted">
            {content.t("about.hero.sub")}
          </p>
          <BrandLockup size={30} boxed className="mt-2" />
        </div>
      </Reveal>

      <section className="mt-20">
        <Reveal>
          <SectionHead
            align="start"
            title={content.t("about.services.title")}
          />
        </Reveal>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 80}>
              <div className="card h-full p-6">
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky/15 text-sky">
                  <Icon name={service.icon} />
                </span>
                <h3 className="font-display text-[16px] font-bold">
                  {service.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                  {service.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <Reveal>
          <SectionHead
            align="start"
            title={content.t("about.principles.title")}
          />
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {principles.map((item, index) => (
            <Reveal key={item.id} delay={index * 70}>
              <div className="flex flex-col gap-2">
                <span className="h-px w-10 bg-brand" />
                <h3 className="font-display text-[15px] font-bold">
                  {L(item.title, locale)}
                </h3>
                <p className="text-[13px] leading-relaxed text-muted">
                  {L(item.text, locale)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <Reveal>
          <SectionHead align="start" title={content.t("about.brands.title")} />
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="card h-full p-7">
              <Logo size={40} href={null} />
              <p className="mt-5 text-[13.5px] leading-relaxed text-muted">
                {content.t("about.brands.flux")}
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="card h-full border-dentista/25 p-7">
              <DentistaLogo size={40} />
              <p className="mt-5 text-[13.5px] leading-relaxed text-muted">
                {content.t("about.brands.dentista")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mt-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line/15 bg-surface/60 p-10 text-center sm:p-14">
            <span className="glow-orb -start-10 -top-10 h-64 w-64 bg-blue/25" />
            <h2 className="section-title mx-auto max-w-2xl text-balance">
              {content.t("about.final.title")}
            </h2>
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
    </div>
  );
}
