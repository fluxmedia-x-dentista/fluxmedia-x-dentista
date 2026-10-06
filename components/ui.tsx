"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  BarChart3,
  Bot,
  Calendar,
  ClipboardList,
  Compass,
  Cpu,
  CreditCard,
  Database,
  Globe,
  LayoutDashboard,
  Mail,
  MessageCircle,
  Nfc,
  PenLine,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */

export const ICONS: Record<string, LucideIcon> = {
  message: MessageCircle,
  clipboard: ClipboardList,
  whatsapp: MessageCircle,
  database: Database,
  mail: Mail,
  bot: Bot,
  calendar: Calendar,
  cart: ShoppingCart,
  sparkles: Sparkles,
  cpu: Cpu,
  chart: BarChart3,
  compass: Compass,
  pen: PenLine,
  dashboard: LayoutDashboard,
  video: Video,
  users: Users,
  trend: TrendingUp,
  globe: Globe,
  card: CreditCard,
  nfc: Nfc,
};

export function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: string;
  className?: string;
}) {
  const Component = ICONS[name] ?? Sparkles;
  return <Component className={className} aria-hidden="true" />;
}

/* -------------------------------------------------------------------------- */
/* Platform glyphs (inline SVG, no external brand assets)                      */
/* -------------------------------------------------------------------------- */

export function PlatformGlyph({
  id,
  className = "h-5 w-5",
}: {
  id: string;
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (id) {
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common}>
          <path d="M14.5 8.5h2.5V5.2h-2.6C12 5.2 10.8 6.8 10.8 9v1.8H8.5v3.3h2.3V21h3.4v-6.9h2.5l.4-3.3h-2.9V9.3c0-.5.2-.8.8-.8Z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common}>
          <path d="M3.5 20.5l1.3-4.2A8.2 8.2 0 1 1 8 19.3l-4.5 1.2Z" />
          <path d="M9 9.3c.3 2.3 2.4 4.4 4.7 4.7.6.1 1.3-.4 1.3-1v-.6l-1.8-.7-.8.8a5.6 5.6 0 0 1-2-2l.8-.8-.7-1.8h-.6c-.6 0-1.1.7-.9 1.4Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M7.5 10.5V17M7.5 7.6v.1M11.5 17v-3.6c0-1.3.9-2.2 2.1-2.2s2.1.9 2.1 2.2V17" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...common}>
          <path d="M14.5 3.5c.4 2.1 1.8 3.5 4 3.8v3c-1.5 0-2.9-.4-4-1.2v5.6a5.4 5.4 0 1 1-5.4-5.4c.3 0 .6 0 .9.1v3.1a2.4 2.4 0 1 0 1.7 2.3V3.5h2.8Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common}>
          <rect x="2.6" y="5.5" width="18.8" height="13" rx="4" />
          <path d="M10.5 9.8l4.4 2.7-4.4 2.7V9.8Z" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="M4 4l16 16M20 4L4 20" />
        </svg>
      );
    case "website":
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18-2.5-2.6-2.5-15.4 0-18Z" />
        </svg>
      );
  }
}

/* -------------------------------------------------------------------------- */
/* Motion & layout helpers                                                     */
/* -------------------------------------------------------------------------- */

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function SectionHead({
  badge,
  title,
  sub,
  align = "center",
  accent = "brand",
}: {
  badge?: string;
  title: ReactNode;
  sub?: string;
  align?: "center" | "start";
  accent?: "brand" | "dentista";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center"
          ? "items-center text-center"
          : "items-start text-start",
      )}
    >
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
      <h2 className="section-title text-balance max-w-3xl">{title}</h2>
      {sub ? (
        <p
          className={cn(
            "max-w-2xl text-[15px] leading-relaxed text-muted",
            align === "center" && "mx-auto",
          )}
        >
          {sub}
        </p>
      ) : null}
    </div>
  );
}

export function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={cn("rtl-flip", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/** Plain <img> wrapper: remote Supabase URLs need no domain allow-list. */
export function SmartImage({
  src,
  alt,
  className,
  fallback,
}: {
  src: string | null | undefined;
  alt: string;
  className?: string;
  fallback?: ReactNode;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <>
        {fallback ?? (
          <div className="flex h-full w-full items-center justify-center bg-brand-soft">
            <Sparkles className="h-8 w-8 text-sky/60" aria-hidden="true" />
          </div>
        )}
      </>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
