import Link from "next/link";

import { DentistaLogo } from "@/components/dentista-logo";
import { Flow, Pulse } from "@/components/flow";
import {
  ArrowIcon,
  CheckIcon,
  Icon,
  Reveal,
  SectionHead,
} from "@/components/ui";
import { WhatsAppOrderButton } from "@/components/whatsapp-button";
import type { ContentReader } from "@/lib/content/get-content";
import { L } from "@/lib/utils";

type Props = { content: ContentReader };

/* -------------------------------------------------------------------------- */
/* 2. Specialties                                                             */
/* -------------------------------------------------------------------------- */

function SpecialtyCard({
  icon,
  title,
  text,
  items,
  cta,
  href,
  accent,
}: {
  icon: string;
  title: string;
  text: string;
  items: string[];
  cta: string;
  href: string;
  accent: "blue" | "violet" | "dentista";
}) {
  const ring =
    accent === "dentista"
      ? "hover:border-dentista/40"
      : accent === "violet"
        ? "hover:border-violet/40"
        : "hover:border-sky/40";

  const tile =
    accent === "dentista"
      ? "bg-dentista/15 text-dentista"
      : accent === "violet"
        ? "bg-violet/15 text-violet"
        : "bg-sky/15 text-sky";

  return (
    <div className={`card flex flex-col gap-5 p-6 transition-colors ${ring}`}>
      <span
        className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${tile}`}
      >
        <Icon name={icon} />
      </span>

      <div>
        <h3 className="font-display text-lg font-bold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
      </div>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[13.5px]">
            <CheckIcon
              className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                accent === "dentista" ? "text-dentista" : "text-sky"
              }`}
            />
            <span className="text-muted">{item}</span>
          </li>
        ))}
      </ul>

      <Link
        href={href}
        className={`mt-auto inline-flex items-center gap-2 text-sm font-semibold ${
          accent === "dentista" ? "text-dentista" : "text-sky"
        }`}
      >
        {cta}
        <ArrowIcon />
      </Link>
    </div>
  );
}

export function SpecialtiesSection({ content }: Props) {
  const locale = content.locale;
  const rows = (key: string) =>
    content.list(key).map((item) => L(item.title, locale));

  return (
    <section className="container-x py-20">
      <Reveal>
        <SectionHead
          badge={content.t("home.specialties.badge")}
          title={content.t("home.specialties.title")}
          sub={content.t("home.specialties.sub")}
        />
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <Reveal delay={0}>
          <SpecialtyCard
            icon="bot"
            accent="blue"
            title={content.t("home.specialties.automation.title")}
            text={content.t("home.specialties.automation.text")}
            items={rows("home.specialties.automation.items")}
            cta={content.t("home.specialties.automation.cta")}
            href="/automations"
          />
        </Reveal>
        <Reveal delay={90}>
          <SpecialtyCard
            icon="users"
            accent="violet"
            title={content.t("home.specialties.social.title")}
            text={content.t("home.specialties.social.text")}
            items={rows("home.specialties.social.items")}
            cta={content.t("home.specialties.social.cta")}
            href="/social-media#packages"
          />
        </Reveal>
        <Reveal delay={180}>
          <SpecialtyCard
            icon="card"
            accent="dentista"
            title={content.t("home.specialties.cards.title")}
            text={content.t("home.specialties.cards.text")}
            items={rows("home.specialties.cards.items")}
            cta={content.t("home.specialties.cards.cta")}
            href="/cards"
          />
        </Reveal>
      </div>

      <Reveal>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {rows("home.specialties.flow").map((label, index, all) => (
            <span key={label} className="flex items-center gap-3">
              <span className="tag border-line/20 bg-surface/60 text-ink">
                {label}
              </span>
              {index < all.length - 1 ? (
                <Pulse vertical={false} className="w-10" />
              ) : null}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. How we help                                                             */
/* -------------------------------------------------------------------------- */

export function HelpSection({ content }: Props) {
  const locale = content.locale;
  const items = content.list("home.help.items");

  return (
    <section className="relative py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-50" />
      <div className="container-x">
        <Reveal>
          <SectionHead
            badge={content.t("home.help.badge")}
            title={content.t("home.help.title")}
            sub={content.t("home.help.sub")}
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={index * 70}>
              <div className="card h-full p-5">
                <span className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-[12px] font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="font-display text-[15px] font-bold">
                  {L(item.title, locale)}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  {L(item.text, locale)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Automation visual                                                       */
/* -------------------------------------------------------------------------- */

export function AutomationVisualSection({ content }: Props) {
  const locale = content.locale;
  const flow1 = content.list("home.auto.flow1").map((i) => L(i.title, locale));
  const flow2 = content.list("home.auto.flow2").map((i) => L(i.title, locale));

  return (
    <section className="container-x py-20">
      <Reveal>
        <SectionHead
          badge={content.t("home.auto.badge")}
          title={content.t("home.auto.title")}
          sub={content.t("home.auto.sub")}
        />
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="card p-6">
            <Flow nodes={flow1} />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="card p-6">
            <Flow nodes={flow2} />
          </div>
        </Reveal>
      </div>

      <div className="mt-10 flex justify-center">
        <Link href="/automations" className="btn-ghost">
          {content.t("home.auto.cta")}
          <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. Social visual                                                           */
/* -------------------------------------------------------------------------- */

export function SocialVisualSection({ content }: Props) {
  const locale = content.locale;
  const chips = content
    .list("home.social.chips")
    .map((i) => L(i.title, locale));
  const days = Array.from({ length: 21 }, (_, index) => index);

  return (
    <section className="relative py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <span className="glow-orb end-10 top-10 h-72 w-72 bg-violet/20" />
      </div>

      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="flex flex-col items-start gap-5">
            <SectionHead
              align="start"
              badge={content.t("home.social.badge")}
              title={content.t("home.social.title")}
              sub={content.t("home.social.sub")}
            />
            <div className="flex flex-wrap gap-2">
              {chips.map((chip) => (
                <span key={chip} className="tag">
                  {chip}
                </span>
              ))}
            </div>
            <Link href="/social-media#packages" className="btn-ghost">
              {content.t("home.social.cta")}
              <ArrowIcon />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card p-5">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                Calendar
              </p>
              <div className="grid grid-cols-7 gap-1.5">
                {days.map((day) => (
                  <span
                    key={day}
                    className={`aspect-square rounded-md ${
                      day % 5 === 0
                        ? "bg-brand"
                        : "bg-surface2 ring-1 ring-line/10"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="card p-5">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                Analytics
              </p>
              <div className="flex h-24 items-end gap-2">
                {[40, 65, 52, 78, 90].map((height, index) => (
                  <span
                    key={index}
                    className="flex-1 rounded-t-md bg-brand"
                    style={{
                      height: `${height}%`,
                      opacity: 0.4 + index * 0.12,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="card p-5 sm:col-span-2">
              <div className="space-y-2.5">
                <div className="flex justify-start">
                  <span className="max-w-[70%] rounded-2xl rounded-es-sm bg-surface2 px-3.5 py-2 text-[12.5px] text-ink/90">
                    Salam, chhal taman?
                  </span>
                </div>
                <div className="flex justify-end">
                  <span className="max-w-[70%] rounded-2xl rounded-ee-sm bg-brand px-3.5 py-2 text-[12.5px] text-white">
                    Marhba! Here are our packages 👇
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. DENTISTA cards                                                          */
/* -------------------------------------------------------------------------- */

export function CardsSection({ content }: Props) {
  return (
    <section className="relative py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <span className="glow-orb -start-10 top-16 h-80 w-80 bg-dentista/20" />
      </div>

      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="flex flex-col items-start gap-5">
            <DentistaLogo size={40} />
            <span className="tag border-dentista/40 text-dentista">
              <span className="h-1.5 w-1.5 rounded-full bg-dentista" />
              {content.t("home.cards.badge")}
            </span>
            <h2 className="section-title text-balance">
              {content.t("home.cards.title1")}
              <br />
              <span className="text-dentista">
                {content.t("home.cards.title2")}
              </span>
            </h2>
            <p className="max-w-xl text-[15px] leading-relaxed text-muted">
              {content.t("home.cards.sub")}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="tag border-dentista/30 text-dentista">
                {content.t("home.cards.chip_regular")}
              </span>
              <span className="tag border-dentista/30 text-dentista">
                {content.t("home.cards.chip_nfc")}
              </span>
            </div>
            <Link href="/cards" className="btn-dentista">
              {content.t("home.cards.cta")}
              <ArrowIcon />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative mx-auto h-[300px] w-full max-w-md">
            {/* Regular card */}
            <div className="absolute start-0 top-6 w-64 -rotate-6 rounded-2xl border border-line/20 bg-surface2/90 p-5 shadow-card backdrop-blur-xl">
              <DentistaLogo size={24} withWordmark={false} />
              <div className="mt-4 space-y-2">
                <span className="block h-2 w-28 rounded-full bg-line/30" />
                <span className="block h-2 w-20 rounded-full bg-line/20" />
              </div>
              <span className="mt-5 block h-1.5 w-16 rounded-full bg-dentista/60" />
            </div>

            {/* NFC card with tap waves */}
            <div className="absolute end-0 bottom-4 w-64 rotate-3 rounded-2xl border border-dentista/40 bg-surface/90 p-5 shadow-glow-dentista backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <DentistaLogo size={24} withWordmark={false} />
                <svg
                  viewBox="0 0 40 40"
                  className="h-8 w-8 text-dentista"
                  fill="none"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M14 10a14 14 0 0 1 0 20"
                    strokeWidth="2"
                    className="animate-pulseDot"
                  />
                  <path
                    d="M20 6a20 20 0 0 1 0 28"
                    strokeWidth="1.6"
                    opacity="0.6"
                    className="animate-pulseDot"
                    style={{ animationDelay: "300ms" }}
                  />
                  <path
                    d="M26 2a26 26 0 0 1 0 36"
                    strokeWidth="1.3"
                    opacity="0.35"
                    className="animate-pulseDot"
                    style={{ animationDelay: "600ms" }}
                  />
                </svg>
              </div>
              <div className="mt-4 space-y-2">
                <span className="block h-2 w-32 rounded-full bg-dentista/50" />
                <span className="block h-2 w-24 rounded-full bg-line/20" />
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-dentista/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-dentista">
                <Icon name="nfc" className="h-3 w-3" />
                NFC
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. Combined value                                                          */
/* -------------------------------------------------------------------------- */

export function CombinedSection({ content }: Props) {
  const locale = content.locale;
  const chain = content.list("home.combined.chain");

  return (
    <section className="container-x py-20">
      <Reveal>
        <SectionHead
          badge={content.t("home.combined.badge")}
          title={
            <>
              {content.t("home.combined.title1")}
              <br />
              <span className="grad-text">
                {content.t("home.combined.title2")}
              </span>
            </>
          }
          sub={content.t("home.combined.sub")}
        />
      </Reveal>

      <Reveal>
        <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {chain.map((item, index) => (
            <li
              key={item.id}
              className={`card flex items-center gap-3 p-4 ${
                index >= chain.length - 2 ? "border-violet/30" : ""
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold ${
                  index >= chain.length - 2
                    ? "bg-violet/20 text-violet"
                    : "bg-sky/15 text-sky"
                }`}
              >
                {index + 1}
              </span>
              <span className="text-[13.5px] font-medium">
                {L(item.title, locale)}
              </span>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. Process                                                                 */
/* -------------------------------------------------------------------------- */

export function ProcessSection({ content }: Props) {
  const locale = content.locale;
  const steps = content.list("home.process.steps");

  return (
    <section className="relative py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-50" />
      <div className="container-x">
        <Reveal>
          <SectionHead
            badge={content.t("home.process.badge")}
            title={content.t("home.process.title")}
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-5">
          {steps.map((step, index) => (
            <Reveal key={step.id} delay={index * 80}>
              <div className="card relative h-full p-5">
                <span className="font-display text-3xl font-extrabold text-line/20">
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
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 9. Trust                                                                   */
/* -------------------------------------------------------------------------- */

export function TrustSection({ content }: Props) {
  const locale = content.locale;
  const items = content.list("home.trust.items");

  return (
    <section className="container-x py-20">
      <Reveal>
        <SectionHead
          badge={content.t("home.trust.badge")}
          title={content.t("home.trust.title")}
        />
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((item, index) => (
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
  );
}

/* -------------------------------------------------------------------------- */
/* 10. Final CTA                                                              */
/* -------------------------------------------------------------------------- */

export function FinalCtaSection({ content, phone }: Props & { phone: string }) {
  return (
    <section className="container-x pb-24 pt-10">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line/15 bg-surface/60 p-10 text-center backdrop-blur-xl sm:p-14">
          <span className="glow-orb -start-10 -top-10 h-64 w-64 bg-blue/25" />
          <span className="glow-orb -end-10 -bottom-10 h-64 w-64 bg-violet/25" />

          <h2 className="section-title mx-auto max-w-2xl text-balance">
            {content.t("home.final.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
            {content.t("home.final.sub")}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/request" className="btn-brand">
              {content.t("home.final.cta1")}
              <ArrowIcon />
            </Link>
            <WhatsAppOrderButton
              payload={{ kind: "general" }}
              label={content.t("home.final.cta2")}
              phone={phone}
              variant="ghost"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
