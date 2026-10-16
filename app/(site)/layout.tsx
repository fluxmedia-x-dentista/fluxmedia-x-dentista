import { Footer } from "@/components/footer";
import { Navbar, type NavItem } from "@/components/navbar";
import { SetupNotice } from "@/components/setup-notice";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { getContent } from "@/lib/content/get-content";
import {
  getFooterLinks,
  getNavigation,
  getSiteSettings,
  getSocialLinks,
} from "@/lib/data/site";
import { getRequestLocale } from "@/lib/locale";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { L } from "@/lib/utils";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = getRequestLocale();
  const [content, navigation, footerLinks, socials, settings] =
    await Promise.all([
      getContent(locale),
      getNavigation("header"),
      getFooterLinks(),
      getSocialLinks(),
      getSiteSettings(),
    ]);

  // Keep old database navigation entries working while presenting the new brand names.
  const items: NavItem[] = navigation.map((item) => {
    if (item.href === "/cards" || item.href === "/dentista") {
      return { label: "DENTISTA", href: "/dentista" };
    }
    if (item.href === "/nfc-cards") {
      return { label: "NFC Cards", href: "/nfc-cards" };
    }
    return { label: L(item.label, locale), href: item.href };
  });

  if (!items.some((item) => item.href === "/dentista")) {
    items.push({ label: "DENTISTA", href: "/dentista" });
  }
  if (!items.some((item) => item.href === "/nfc-cards")) {
    items.push({ label: "NFC Cards", href: "/nfc-cards" });
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {content.t("ui.skip")}
      </a>

      <Navbar
        items={items}
        ctaLabel={content.t("nav.cta")}
        ctaHref={content.link("nav.cta_href").href || "/request"}
      />

      <main id="main">{children}</main>

      <Footer
        content={content}
        links={footerLinks}
        socials={socials}
        settings={settings}
      />

      <WhatsAppFloat phone={settings.whatsapp_number} />

      {isSupabaseConfigured() ? null : <SetupNotice />}
    </>
  );
}
