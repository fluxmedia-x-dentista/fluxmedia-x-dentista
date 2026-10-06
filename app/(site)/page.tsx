import { Fragment, type ReactNode } from "react";

import { HeroSection } from "@/components/home/hero";
import {
  AutomationVisualSection,
  CardsSection,
  CombinedSection,
  FinalCtaSection,
  HelpSection,
  ProcessSection,
  SocialVisualSection,
  SpecialtiesSection,
  TrustSection,
} from "@/components/home/sections";
import { getContent } from "@/lib/content/get-content";
import { getHomeSections, getSiteSettings } from "@/lib/data/site";
import { getRequestLocale } from "@/lib/locale";

export default async function HomePage() {
  const locale = getRequestLocale();
  const [content, sections, settings] = await Promise.all([
    getContent(locale),
    getHomeSections(),
    getSiteSettings(),
  ]);

  /** Section order and visibility are controlled from the admin. */
  const registry: Record<string, ReactNode> = {
    hero: <HeroSection content={content} />,
    specialties: <SpecialtiesSection content={content} />,
    help: <HelpSection content={content} />,
    automation: <AutomationVisualSection content={content} />,
    social: <SocialVisualSection content={content} />,
    cards: <CardsSection content={content} />,
    combined: <CombinedSection content={content} />,
    process: <ProcessSection content={content} />,
    trust: <TrustSection content={content} />,
    final: (
      <FinalCtaSection content={content} phone={settings.whatsapp_number} />
    ),
  };

  const ordered = [...sections]
    .filter((section) => section.visible && registry[section.key])
    .sort((a, b) => a.sort_order - b.sort_order);

  return (
    <>
      {ordered.map((section) => (
        <Fragment key={section.key}>{registry[section.key]}</Fragment>
      ))}
    </>
  );
}
