import Link from "next/link";

import { BrandLockup } from "@/components/brand-lockup";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";
import { PlatformGlyph } from "@/components/ui";
import type { ContentReader } from "@/lib/content/get-content";
import type { FooterLink, SiteSettings, SocialLink } from "@/lib/types";
import { L } from "@/lib/utils";

export function Footer({
  content,
  links,
  socials,
  settings,
}: {
  content: ContentReader;
  links: FooterLink[];
  socials: SocialLink[];
  settings: SiteSettings;
}) {
  const locale = content.locale;
  const group = (key: FooterLink["group_key"]) =>
    links.filter((link) => link.group_key === key);

  return (
    <footer className="relative mt-24 border-t border-line/10 bg-surface/30">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        {/* Column 1 — brand */}
        <div className="flex flex-col gap-5">
          <Logo size={34} />
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            {content.t("footer.description")}
          </p>
          <p className="text-[13px] text-muted/80">
            {content.t("footer.note") || L(settings.footer_note, locale)}
          </p>
          <LanguageSwitcher className="self-start" />
          <BrandLockup size={28} boxed compact className="mt-1" />
        </div>

        {/* Column 2 — navigation */}
        <nav aria-label={content.t("footer.nav_title")}>
          <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-[0.12em] text-ink">
            {content.t("footer.nav_title")}
          </h2>
          <ul className="space-y-2.5 text-sm">
            {group("navigation").map((link) => (
              <li key={link.id}>
                <Link href={link.href} className="link-muted">
                  {L(link.label, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Column 3 — services */}
        <nav aria-label={content.t("footer.services_title")}>
          <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-[0.12em] text-ink">
            {content.t("footer.services_title")}
          </h2>
          <ul className="space-y-2.5 text-sm">
            {group("services").map((link) => (
              <li key={link.id}>
                <Link href={link.href} className="link-muted">
                  {L(link.label, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Column 4 — follow us */}
        <div>
          <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-[0.12em] text-ink">
            {content.t("footer.follow_title")}
          </h2>
          <ul className="space-y-2.5 text-sm">
            {socials.map((social) => (
              <li key={social.id}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 link-muted"
                >
                  <PlatformGlyph id={social.platform} className="h-4 w-4" />
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[13px] text-muted">
            <a href={`mailto:${settings.contact_email}`} className="link-muted">
              {settings.contact_email}
            </a>
          </p>
          <p className="text-[13px] text-muted">
            {L(settings.address, locale)}
          </p>
        </div>
      </div>

      <div className="border-t border-line/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-[13px] text-muted sm:flex-row">
          <p>
            <Link
              href="/admin"
              aria-label="Admin"
              className="transition-colors hover:text-ink"
            >
              ©
            </Link>{" "}
            {new Date().getFullYear()} {settings.site_name}.
          </p>
          <ul className="flex items-center gap-5">
            {group("bottom").map((link) => (
              <li key={link.id}>
                <Link href={link.href} className="link-muted">
                  {L(link.label, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
