import type { Metadata } from "next";
import Link from "next/link";

import { ArrowIcon, Icon, Reveal, SectionHead } from "@/components/ui";
import { WhatsAppOrderButton } from "@/components/whatsapp-button";
import { getContent } from "@/lib/content/get-content";
import { getSiteSettings } from "@/lib/data/site";
import { getRequestLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent(getRequestLocale());
  return {
    title: content.t("request.title"),
    description: content.t("request.sub"),
  };
}

export default async function RequestPage() {
  const locale = getRequestLocale();
  const [content, settings] = await Promise.all([
    getContent(locale),
    getSiteSettings(),
  ]);

  const choices = [
    {
      icon: "bot",
      title: content.t("request.card1.title"),
      text: content.t("request.card1.text"),
      href: "/automations",
      accent: "sky",
    },
    {
      icon: "users",
      title: content.t("request.card2.title"),
      text: content.t("request.card2.text"),
      href: "/social-media#packages",
      accent: "violet",
    },
    {
      icon: "card",
      title: content.t("request.card3.title"),
      text: content.t("request.card3.text"),
      href: "/cards",
      accent: "dentista",
    },
  ];

  return (
    <section className="container-x pb-24 pt-28 sm:pt-32">
      <Reveal>
        <SectionHead
          title={content.t("request.title")}
          sub={content.t("request.sub")}
        />
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {choices.map((choice, index) => (
          <Reveal key={choice.href} delay={index * 80}>
            <Link
              href={choice.href}
              className="card group flex h-full flex-col gap-4 p-7 transition-all hover:-translate-y-1 hover:border-sky/40 hover:shadow-glow"
            >
              <span
                className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${
                  choice.accent === "dentista"
                    ? "bg-dentista/15 text-dentista"
                    : choice.accent === "violet"
                      ? "bg-violet/15 text-violet"
                      : "bg-sky/15 text-sky"
                }`}
              >
                <Icon name={choice.icon} className="h-5 w-5" />
              </span>
              <h2 className="font-display text-lg font-bold">{choice.title}</h2>
              <p className="text-[13.5px] leading-relaxed text-muted">
                {choice.text}
              </p>
              <span className="mt-auto inline-flex items-center gap-2 pt-2 text-[13px] font-semibold text-sky">
                {content.t("ui.view_details")}
                <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-10 flex flex-col items-start gap-4 rounded-3xl border border-line/15 bg-surface/50 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-lg font-bold">
              {content.t("request.unsure.title")}
            </h2>
            <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-muted">
              {content.t("request.unsure.text")}
            </p>
          </div>
          <WhatsAppOrderButton
            payload={{ kind: "general" }}
            phone={settings.whatsapp_number}
            label={content.t("ui.chat_whatsapp")}
          />
        </div>
      </Reveal>
    </section>
  );
}
