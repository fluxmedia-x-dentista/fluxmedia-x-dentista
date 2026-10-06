"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";
import { useI18n } from "@/components/providers";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export type NavItem = {
  label: string;
  href: string;
};

export function Navbar({
  items,
  ctaLabel,
  ctaHref,
}: {
  items: NavItem[];
  ctaLabel: string;
  ctaHref: string;
}) {
  const pathname = usePathname();
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line/10 bg-bg/80 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <nav className="container-x flex h-16 items-center justify-between gap-4">
        <Logo size={32} />

        <ul className="hidden items-center gap-1 lg:flex">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors",
                  isActive(item.href)
                    ? "text-ink"
                    : "text-muted hover:text-ink",
                )}
              >
                {item.href === "/cards" ? (
                  <span className="h-1.5 w-1.5 rounded-full bg-dentista shadow-glow-dentista" />
                ) : null}
                {item.label}
                {isActive(item.href) ? (
                  <span className="absolute inset-x-3 -bottom-0.5 h-px bg-brand" />
                ) : null}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <Link
            href={ctaHref}
            className="btn-brand btn-sm hidden md:inline-flex"
          >
            {ctaLabel}
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t("ui.menu", "Menu")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line/20 bg-surface/60 text-ink lg:hidden"
          >
            <Menu className="h-4.5 w-4.5" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {open ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-bg/95 backdrop-blur-xl lg:hidden">
          <div className="container-x flex h-16 items-center justify-between">
            <Logo size={32} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("ui.close", "Close")}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line/20 bg-surface/60 text-ink"
            >
              <X className="h-4.5 w-4.5" aria-hidden="true" />
            </button>
          </div>

          <div className="container-x flex flex-1 flex-col gap-2 overflow-y-auto pb-10 pt-6">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-2xl border border-line/10 bg-surface/50 px-4 py-3.5 text-base font-semibold",
                  isActive(item.href) ? "text-ink" : "text-muted",
                )}
              >
                {item.href === "/cards" ? (
                  <span className="h-2 w-2 rounded-full bg-dentista shadow-glow-dentista" />
                ) : null}
                {item.label}
              </Link>
            ))}

            <Link href={ctaHref} className="btn-brand mt-4 w-full">
              {ctaLabel}
            </Link>

            <div className="mt-6 flex items-center justify-between">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
