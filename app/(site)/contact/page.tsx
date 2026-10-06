import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { Reveal, SectionHead } from "@/components/ui";
import { WhatsAppOrderButton } from "@/components/whatsapp-button";
import { getContent } from "@/lib/content/get-content";
import { getSiteSettings } from "@/lib/data/site";
import { getRequestLocale } from "@/lib/locale";
import { L } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent(getRequestLocale());
  return {
    title: content.t("contact.title"),
    description: content.t("contact.sub"),
  };
}

export default async function ContactPage() {
  const locale = getRequestLocale();
  const [content, settings] = await Promise.all([
    getContent(locale),
    getSiteSettings(),
  ]);

  const prettyPhone = settings.whatsapp_number.replace(
    /^(\d{3})(\d{3})(\d{3})(\d{3})$/,
    "+$1 $2 $3 $4",
  );

  return (
    <section className="container-x pb-24 pt-28 sm:pt-32">
      <Reveal>
        <SectionHead
          align="start"
          title={content.t("contact.title")}
          sub={content.t("contact.sub")}
        />
      </Reveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <div className="card h-full p-7">
            <h2 className="font-display text-lg font-bold">
              {content.t("contact.info_title")}
            </h2>
            <dl className="mt-6 space-y-5 text-[13.5px]">
              <div>
                <dt className="text-muted">WhatsApp</dt>
                <dd className="font-semibold">{prettyPhone}</dd>
              </div>
              <div>
                <dt className="text-muted">Email</dt>
                <dd className="font-semibold">
                  <a
                    href={`mailto:${settings.contact_email}`}
                    className="hover:text-sky"
                  >
                    {settings.contact_email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-muted">Address</dt>
                <dd className="font-semibold">{L(settings.address, locale)}</dd>
              </div>
            </dl>
            <WhatsAppOrderButton
              className="mt-7 w-full"
              payload={{ kind: "general" }}
              phone={settings.whatsapp_number}
              label={content.t("ui.chat_whatsapp")}
            />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="card p-7">
            <h2 className="mb-6 font-display text-lg font-bold">
              {content.t("contact.form_title")}
            </h2>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
