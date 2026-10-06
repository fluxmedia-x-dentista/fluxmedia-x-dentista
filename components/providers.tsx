"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import type { ClientDictionary, Locale } from "@/lib/types";
import { dirFor } from "@/lib/utils";

type Theme = "dark" | "light";

type I18nValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: (key: string, fallback?: string) => string;
  setLocale: (locale: Locale) => void;
};

type ThemeValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const I18nContext = createContext<I18nValue | null>(null);
const ThemeContext = createContext<ThemeValue | null>(null);

const ONE_YEAR = 60 * 60 * 24 * 365;

function writeCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=${ONE_YEAR}; SameSite=Lax`;
}

export function Providers({
  children,
  locale: initialLocale,
  theme: initialTheme,
  dictionary,
}: {
  children: ReactNode;
  locale: Locale;
  theme: Theme;
  dictionary: ClientDictionary;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      writeCookie("locale", next);
      setLocaleState(next);
      document.documentElement.lang = next;
      document.documentElement.dir = dirFor(next);
      router.refresh();
    },
    [locale, router],
  );

  const setTheme = useCallback((next: Theme) => {
    writeCookie("theme", next);
    setThemeState(next);
    document.documentElement.dataset.theme = next;
  }, []);

  const i18nValue = useMemo<I18nValue>(
    () => ({
      locale,
      dir: dirFor(locale),
      t: (key, fallback) => dictionary[key] ?? fallback ?? "",
      setLocale,
    }),
    [locale, dictionary, setLocale],
  );

  const themeValue = useMemo<ThemeValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
    }),
    [theme, setTheme],
  );

  return (
    <I18nContext.Provider value={i18nValue}>
      <ThemeContext.Provider value={themeValue}>
        {children}
      </ThemeContext.Provider>
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used inside <Providers>");
  }
  return context;
}

export function useTheme(): ThemeValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside <Providers>");
  }
  return context;
}
