import Link from "next/link";

import { BrandLockup } from "@/components/brand-lockup";
import { DentistaLogo } from "@/components/dentista-logo";
import { ArrowIcon } from "@/components/ui";
import type { ContentReader } from "@/lib/content/get-content";
import { L } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Floating composition — laid out on a strict grid so cards never overlap     */
/* -------------------------------------------------------------------------- */

function FloatCard({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`card animate-float p-4 ${className}`}
      style={{ animationDelay: `${delay}ms`, animationDuration: "7s" }}
    >
      {children}
    </div>
  );
}

function WorkflowCard({ title }: { title: string }) {
  const steps = ["DM received", "AI replies", "Lead saved"];
  return (
    <FloatCard delay={0}>
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
        {title}
      </p>
      <ul className="space-y-2">
        {steps.map((step, index) => (
          <li key={step} className="flex items-center gap-2.5">
            <span
              className={`h-2 w-2 rounded-full ${
                index === 2 ? "bg-violet" : "bg-sky"
              } animate-pulseDot`}
              style={{ animationDelay: `${index * 400}ms` }}
            />
            <span className="text-[12.5px] text-ink/90">{step}</span>
          </li>
        ))}
      </ul>
    </FloatCard>
  );
}

function PostCard({ title }: { title: string }) {
  return (
    <FloatCard delay={900}>
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
        {title}
      </p>
      <div className="mb-3 h-16 rounded-xl bg-brand-soft ring-1 ring-line/15" />
      <div className="space-y-1.5">
        <span className="block h-1.5 w-3/4 rounded-full bg-line/25" />
        <span className="block h-1.5 w-1/2 rounded-full bg-line/15" />
      </div>
      <div className="mt-3 flex gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-sky/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-violet/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-line/30" />
      </div>
    </FloatCard>
  );
}

function ReachCard({ title }: { title: string }) {
  const bars = [38, 56, 44, 72, 60, 86];
  return (
    <FloatCard delay={1600}>
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
        {title}
      </p>
      <div className="flex h-20 items-end gap-1.5">
        {bars.map((height, index) => (
          <span
            key={index}
            className="flex-1 rounded-t-md bg-brand"
            style={{ height: `${height}%`, opacity: 0.45 + index * 0.09 }}
          />
        ))}
      </div>
    </FloatCard>
  );
}

function LeadBubble({ text }: { text: string }) {
  return (
    <FloatCard delay={2300} className="!py-3">
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky/15 text-[11px] font-bold text-sky">
          ✓
        </span>
        <span className="text-[12.5px] font-medium text-ink/90">{text}</span>
      </div>
    </FloatCard>
  );
}

function DentistaMiniCard() {
  return (
    <div
      className="animate-float"
      style={{ animationDelay: "3000ms", animationDuration: "8s" }}
    >
      <div className="relative -rotate-6 rounded-2xl border border-dentista/30 bg-surface2/80 p-4 shadow-glow-dentista backdrop-blur-xl">
        <DentistaLogo size={26} />
        <div className="mt-3 space-y-1.5">
          <span className="block h-1.5 w-20 rounded-full bg-dentista/40" />
          <span className="block h-1.5 w-12 rounded-full bg-line/20" />
        </div>
        <svg
          viewBox="0 0 40 40"
          className="absolute end-3 top-1/2 h-9 w-9 -translate-y-1/2 text-dentista"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path d="M14 10a14 14 0 0 1 0 20" strokeWidth="2" opacity="0.9" />
          <path d="M20 6a20 20 0 0 1 0 28" strokeWidth="1.6" opacity="0.55" />
          <path d="M26 2a26 26 0 0 1 0 36" strokeWidth="1.3" opacity="0.3" />
        </svg>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

export function HeroSection({ content }: { content: ContentReader }) {
  const background = content.img("home.bg");
  const locale = content.locale;

  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-80" />
        {background.url ? (
          <div className="absolute inset-0 mask-fade-b opacity-40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={background.url}
              alt={L(background.alt, locale)}
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}
        <span className="glow-orb -start-24 top-0 h-80 w-80 bg-blue/25" />
        <span className="glow-orb end-0 top-24 h-96 w-96 bg-violet/25" />
      </div>

      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col items-start gap-6">
          <span className="tag border-sky/30 text-sky">
            <span className="h-1.5 w-1.5 rounded-full bg-sky animate-pulseDot" />
            {content.t("home.hero.badge")}
          </span>

          <h1 className="font-display text-4xl font-extrabold leading-[1.04] text-balance sm:text-5xl lg:text-[58px]">
            {content.t("home.hero.title1")}
            <br />
            <span className="grad-text">{content.t("home.hero.title2")}</span>
          </h1>

          <p className="max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
            {content.t("home.hero.sub")}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/request" className="btn-brand">
              {content.t("home.hero.cta1")}
              <ArrowIcon />
            </Link>
            <Link href="/automations" className="btn-ghost">
              {content.t("home.hero.cta2")}
            </Link>
          </div>

          <BrandLockup size={28} boxed className="mt-2" />
        </div>

        {/* Floating composition: one card per grid cell -> no overlap ever */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:gap-5">
          <WorkflowCard title={content.t("home.hero.card_workflow")} />
          <PostCard title={content.t("home.hero.card_post")} />
          <ReachCard title={content.t("home.hero.card_reach")} />
          <div className="flex flex-col gap-5">
            <LeadBubble text={content.t("home.hero.card_bubble")} />
            <DentistaMiniCard />
          </div>
        </div>
      </div>
    </section>
  );
}
