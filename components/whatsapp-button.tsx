"use client";

import type { ReactNode } from "react";

import { useI18n } from "@/components/providers";
import { ArrowIcon, PlatformGlyph } from "@/components/ui";
import { intentFromPayload, waLink, type OrderPayload } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Every order button on the site.
 *
 * It is a plain anchor so it works on mobile and desktop. Before the browser
 * follows the link we fire a non-blocking beacon to /api/orders/intent, which
 * records the click in the orders sheet. The redirect is never delayed.
 */
export function WhatsAppOrderButton({
  payload,
  label,
  phone,
  variant = "brand",
  className,
  icon = true,
  children,
}: {
  payload: OrderPayload;
  label?: string;
  phone?: string;
  variant?: "brand" | "ghost" | "dentista";
  className?: string;
  icon?: boolean;
  children?: ReactNode;
}) {
  const { locale, t } = useI18n();
  const href = waLink(payload, locale, phone);

  const recordIntent = () => {
    try {
      const body = JSON.stringify(intentFromPayload(payload, locale));
      const url = "/api/orders/intent";
      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        navigator.sendBeacon(
          url,
          new Blob([body], { type: "application/json" }),
        );
        return;
      }
      void fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      });
    } catch {
      // Recording an order must never block the WhatsApp redirect.
    }
  };

  const variantClass =
    variant === "ghost"
      ? "btn-ghost"
      : variant === "dentista"
        ? "btn-dentista"
        : "btn-brand";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={recordIntent}
      className={cn(variantClass, className)}
    >
      {icon ? <PlatformGlyph id="whatsapp" className="h-4 w-4" /> : null}
      {children ?? label ?? t("ui.order_whatsapp", "Order on WhatsApp")}
      {icon ? null : <ArrowIcon />}
    </a>
  );
}
