"use client";

import { useI18n } from "@/components/providers";
import { PlatformGlyph } from "@/components/ui";
import { intentFromPayload, waLink } from "@/lib/whatsapp";

/** Floating WhatsApp button pinned to the bottom corner of every page. */
export function WhatsAppFloat({ phone }: { phone: string }) {
  const { locale, t } = useI18n();
  const href = waLink({ kind: "general" }, locale, phone);

  const recordIntent = () => {
    try {
      const body = JSON.stringify(
        intentFromPayload({ kind: "general" }, locale),
      );
      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        navigator.sendBeacon(
          "/api/orders/intent",
          new Blob([body], { type: "application/json" }),
        );
      }
    } catch {
      // ignore
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={recordIntent}
      aria-label={t("ui.chat_whatsapp", "Chat on WhatsApp")}
      className="group fixed bottom-5 end-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-glow transition-transform hover:scale-105"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-sky/30" />
      <PlatformGlyph id="whatsapp" className="relative h-6 w-6" />
    </a>
  );
}
