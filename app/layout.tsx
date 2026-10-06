import type { Metadata } from "next";
import { cookies } from "next/headers";
import localFont from "next/font/local";

import "./globals.css";

import { Providers } from "@/components/providers";
import {
  getContentDictionary,
  toClientDictionary,
} from "@/lib/content/get-content";
import { createContentReader } from "@/lib/content/get-content";
import type { Locale } from "@/lib/types";
import { dirFor, isLocale } from "@/lib/utils";

/**
 * Fonts are self-hosted (app/fonts) instead of fetched from Google at build
 * time: the build never depends on the network, nothing is requested from a
 * third party at runtime, and the exact same typefaces are used.
 * Each file is the variable version of the font, so one file covers every
 * weight we need.
 */
const inter = localFont({
  src: [
    { path: "./fonts/inter-latin.woff2", weight: "100 900", style: "normal" },
    {
      path: "./fonts/inter-latin-ext.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
});

const spaceGrotesk = localFont({
  src: [
    {
      path: "./fonts/space-grotesk-latin.woff2",
      weight: "300 700",
      style: "normal",
    },
    {
      path: "./fonts/space-grotesk-latin-ext.woff2",
      weight: "300 700",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Inter", "system-ui", "Segoe UI", "Arial", "sans-serif"],
});

const notoKufi = localFont({
  src: [
    {
      path: "./fonts/noto-kufi-arabic.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-arabic",
  display: "swap",
  fallback: ["Segoe UI", "Tahoma", "Arial", "sans-serif"],
});

function readLocale(): Locale {
  const value = cookies().get("locale")?.value;
  return isLocale(value) ? value : "en";
}

function readTheme(): "dark" | "light" {
  return cookies().get("theme")?.value === "light" ? "light" : "dark";
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = readLocale();
  const dictionary = await getContentDictionary();
  const content = createContentReader(dictionary, locale);
  const title = content.t("seo.title");
  const description = content.t("seo.description");
  const ogImage = content.img("seo.og_image").url;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: "%s | FLUXMEDIA",
    },
    description,
    icons: {
      icon: "/favicon.png",
      apple: "/apple-icon.png",
    },
    openGraph: {
      type: "website",
      title,
      description,
      siteName: "FLUXMEDIA",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = readLocale();
  const theme = readTheme();
  const dictionary = await getContentDictionary();
  const clientDictionary = toClientDictionary(dictionary, locale);

  return (
    <html
      lang={locale}
      dir={dirFor(locale)}
      data-theme={theme}
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${notoKufi.variable}`}
    >
      <body className="min-h-screen bg-bg text-ink">
        <Providers locale={locale} theme={theme} dictionary={clientDictionary}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
