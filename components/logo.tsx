import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * FLUXMEDIA logo: the mark in a glowing rounded tile + the wordmark.
 */
export function Logo({
  size = 34,
  withWordmark = true,
  href = "/",
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
        className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-surface2/70 shadow-glow-sm ring-1 ring-line/20"
        style={{ width: size, height: size }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="FLUXMEDIA"
          width={size}
          height={size}
          className="h-full w-full object-contain p-[3px]"
        />
      </span>
      {withWordmark ? (
        <span className="font-display text-[15px] font-extrabold tracking-[0.08em] text-ink">
          FLUX<span className="grad-text">MEDIA</span>
        </span>
      ) : null}
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label="FLUXMEDIA — home" className="inline-flex">
      {content}
    </Link>
  );
}
