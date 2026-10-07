import { DentistaLogo } from "@/components/dentista-logo";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

/**
 * FLUXMEDIA × DENTISTA lockup.
 *
 * Deliberately has NO caption: the relationship between the two brands is
 * shown by the two logos standing side by side, never by a text line.
 * Always one row. `compact` drops the dividers and tightens spacing for
 * narrow spots like the footer.
 */
export function BrandLockup({
  size = 30,
  className,
  boxed = false,
  compact = false,
}: {
  size?: number;
  className?: string;
  boxed?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "inline-flex max-w-full flex-nowrap items-center whitespace-nowrap",
        compact ? "gap-2" : "gap-3 sm:gap-4",
        boxed &&
          "rounded-2xl border border-line/15 bg-surface/50 backdrop-blur-xl",
        boxed && (compact ? "px-3 py-2" : "px-4 py-2.5"),
        className,
      )}
    >
      <Logo size={size} href={null} />
      {compact ? null : <span className="h-6 w-px bg-line/20" />}
      <span className="text-xs font-semibold text-muted/70">×</span>
      {compact ? null : <span className="h-6 w-px bg-line/20" />}
      <DentistaLogo size={size} />
    </div>
  );
}
