import type { ReactNode } from "react";

import type { ContentImage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { L } from "@/lib/utils";
import type { Locale } from "@/lib/types";

/**
 * Hero band with an editable background image, a readability overlay and a
 * soft fade toward the page. The overlay strength is editable per image.
 */
export function PageHero({
  image,
  locale,
  badge,
  title,
  sub,
  accent = "brand",
  children,
  className,
}: {
  image?: ContentImage;
  locale: Locale;
  badge?: string;
  title: ReactNode;
  sub?: string;
  accent?: "brand" | "dentista";
  children?: ReactNode;
  className?: string;
}) {
  const overlay = Math.min(Math.max(image?.overlay ?? 60, 0), 100) / 100;

  return (
    <section
      className={cn("relative overflow-hidden pb-14 pt-28 sm:pt-32", className)}
    >
      {image?.url ? (
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 mask-fade-b">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.url}
              alt={L(image.alt, locale)}
              className="h-full w-full object-cover opacity-80"
            />
          </div>
          <div
            className="absolute inset-0 bg-bg"
            style={{ opacity: overlay }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-bg"
            aria-hidden="true"
          />
        </div>
      ) : (
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-70" />
      )}

      <div className="container-x">
        <div className="flex max-w-3xl flex-col items-start gap-5">
          {badge ? (
            <span
              className={cn(
                "tag",
                accent === "dentista"
                  ? "border-dentista/40 text-dentista"
                  : "border-sky/30 text-sky",
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  accent === "dentista" ? "bg-dentista" : "bg-sky",
                )}
              />
              {badge}
            </span>
          ) : null}

          <h1 className="font-display text-4xl font-extrabold leading-[1.05] text-balance sm:text-5xl lg:text-[56px]">
            {title}
          </h1>

          {sub ? (
            <p className="max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
              {sub}
            </p>
          ) : null}

          {children}
        </div>
      </div>
    </section>
  );
}
