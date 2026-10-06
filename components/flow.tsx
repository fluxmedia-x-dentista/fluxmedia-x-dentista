"use client";

import { cn } from "@/lib/utils";

/** Gradient connector with a travelling dot. */
export function Pulse({
  vertical = true,
  className,
}: {
  vertical?: boolean;
  className?: string;
}) {
  if (vertical) {
    return (
      <div className={cn("relative mx-auto h-8 w-px", className)}>
        <div className="absolute inset-0 bg-gradient-to-b from-sky/60 to-violet/60" />
        <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-sky shadow-glow-sm animate-pulseDot" />
      </div>
    );
  }
  return (
    <div className={cn("relative h-px w-full", className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-sky/60 to-violet/60" />
      <span className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-sky shadow-glow-sm animate-pulseDot" />
    </div>
  );
}

export function Node({
  index,
  label,
  tone = "blue",
}: {
  index: number;
  label: string;
  tone?: "blue" | "violet";
}) {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-sm",
        tone === "violet"
          ? "border-violet/30 bg-violet/10 text-ink"
          : "border-sky/25 bg-sky/5 text-ink",
      )}
    >
      <span
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold",
          tone === "violet" ? "bg-violet/25 text-ink" : "bg-sky/20 text-sky",
        )}
      >
        {index}
      </span>
      <span className="font-medium leading-snug">{label}</span>
    </div>
  );
}

/** Vertical chain of nodes; the last two are violet. */
export function Flow({ nodes }: { nodes: string[] }) {
  return (
    <div className="flex flex-col items-stretch">
      {nodes.map((label, index) => {
        const tone = index >= nodes.length - 2 ? "violet" : "blue";
        return (
          <div key={`${label}-${index}`}>
            <Node index={index + 1} label={label} tone={tone} />
            {index < nodes.length - 1 ? <Pulse /> : null}
          </div>
        );
      })}
    </div>
  );
}
