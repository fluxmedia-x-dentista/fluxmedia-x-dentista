import { DentistaLogo } from "@/components/dentista-logo";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

/**
 * FLUXMEDIA × DENTISTA lockup.
 *
 * Deliberately has NO caption: the relationship between the two brands is
 * shown by the two logos standing side by side, never by a text line.
 */
export function BrandLockup({
  size = 30,
  className,
  boxed = false,
}: {
  size?: number;
  className?: string;
  boxed?: boolean;
}) {
  return (
    <div
      className={cn(
        "inline-flex flex-wrap items-center gap-3 sm:gap-4",
        boxed &&
          "rounded-2xl border border-line/15 bg-surface/50 px-4 py-2.5 backdrop-blur-xl",
        className,
      )}
    >
      <Logo size={size} href={null} />
      <span className="h-6 w-px bg-line/20" />
      <span className="text-xs font-semibold text-muted/70">×</span>
      <span className="h-6 w-px bg-line/20" />
      <DentistaLogo size={size} />
    </div>
  );
}
