"use client";

import { Moon, Sun } from "lucide-react";

import { useI18n, useTheme } from "@/components/providers";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t("ui.theme", "Switch theme")}
      title={t("ui.theme", "Switch theme")}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-line/20 bg-surface/60 text-muted transition-colors hover:text-ink",
        className,
      )}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
