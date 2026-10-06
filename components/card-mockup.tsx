import { DentistaLogo } from "@/components/dentista-logo";
import { Icon } from "@/components/ui";
import type { CardProduct } from "@/lib/types";
import { cn } from "@/lib/utils";

const FINISH_STYLE: Record<CardProduct["finish"], string> = {
  matte: "bg-[#13182c] ring-1 ring-line/20",
  glossy:
    "bg-gradient-to-br from-[#161d38] via-[#1d2650] to-[#121734] ring-1 ring-sky/30",
  "soft-touch": "bg-[#1a1430] ring-1 ring-dentista/30",
  metal:
    "bg-gradient-to-br from-[#2a3042] via-[#51596e] to-[#232838] ring-1 ring-white/20",
  wood: "bg-gradient-to-br from-[#4a3526] via-[#6b4a31] to-[#3a291d] ring-1 ring-amber-200/20",
  pvc: "bg-gradient-to-br from-[#15193a] to-[#241a46] ring-1 ring-dentista/30",
};

/** CSS/SVG card mockup — finish-specific, no photography. */
export function CardMockup({
  card,
  className,
}: {
  card: CardProduct;
  className?: string;
}) {
  const isNfc = card.type === "nfc";

  return (
    <div
      className={cn(
        "relative aspect-[1.62/1] w-full overflow-hidden rounded-2xl p-5 shadow-card",
        FINISH_STYLE[card.finish] ?? FINISH_STYLE.matte,
        className,
      )}
    >
      {card.finish === "glossy" ? (
        <span className="pointer-events-none absolute -start-1/3 top-0 h-full w-1/2 rotate-12 bg-white/10 blur-xl" />
      ) : null}
      {card.finish === "wood" ? (
        <span className="pointer-events-none absolute inset-0 opacity-25 [background-image:repeating-linear-gradient(90deg,rgba(0,0,0,.35)_0px,rgba(0,0,0,0)_3px,rgba(0,0,0,.25)_6px)]" />
      ) : null}
      {card.finish === "metal" ? (
        <span className="pointer-events-none absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(115deg,rgba(255,255,255,.35)_0px,rgba(255,255,255,0)_2px,rgba(255,255,255,.2)_5px)]" />
      ) : null}

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <DentistaLogo size={28} withWordmark={false} />
          {isNfc ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-dentista/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-dentista ring-1 ring-dentista/40">
              <Icon name="nfc" className="h-3 w-3" />
              NFC
            </span>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <span className="block h-2 w-24 rounded-full bg-white/35" />
          <span className="block h-1.5 w-16 rounded-full bg-white/20" />
          <span className="mt-2 block h-1 w-20 rounded-full bg-dentista/60" />
        </div>
      </div>

      {isNfc ? (
        <svg
          viewBox="0 0 40 40"
          className="pointer-events-none absolute end-4 bottom-3 h-10 w-10 text-dentista/80"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path d="M14 10a14 14 0 0 1 0 20" strokeWidth="2" />
          <path d="M20 6a20 20 0 0 1 0 28" strokeWidth="1.6" opacity="0.6" />
          <path d="M26 2a26 26 0 0 1 0 36" strokeWidth="1.3" opacity="0.35" />
        </svg>
      ) : null}
    </div>
  );
}
