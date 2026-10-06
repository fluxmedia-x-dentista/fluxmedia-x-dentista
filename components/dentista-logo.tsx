import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * DENTISTA logo.
 *
 * The source PNG is thin dark-purple line art on transparency, so it is almost
 * invisible on a dark background. It is auto-trimmed at setup
 * (tools/prepare-assets.mjs -> /dentista-logo-trim.png) and always rendered on
 * a light lavender tile with a purple glow, matching the weight and size of
 * the FLUXMEDIA tile.
 */
export function DentistaLogo({
  size = 34,
  withWordmark = true,
  href = null,
  className,
}: {
  size?: number;
  withWordmark?: boolean;
  href?: string | null;
  className?: string;
}) {
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-[#F6F1FF] shadow-glow-dentista ring-1 ring-dentista/40"
        style={{ width: size, height: size }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/dentista-logo-trim.png"
          alt="DENTISTA"
          width={size}
          height={size}
          className="h-full w-full object-contain p-[4px]"
        />
      </span>
      {withWordmark ? (
        <span className="font-display text-[15px] font-extrabold tracking-[0.08em] text-dentista">
          DENTISTA
        </span>
      ) : null}
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label="DENTISTA cards" className="inline-flex">
      {content}
    </Link>
  );
}
