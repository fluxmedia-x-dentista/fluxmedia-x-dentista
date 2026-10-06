import { priceForMessage } from "@/lib/format";
import type { CardType, Locale, ServiceType } from "@/lib/types";

/** Default WhatsApp number. The live value comes from `site_settings`. */
export const WA_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "212639803872";

export type OrderPayload =
  | { kind: "automation"; title: string; titleEn: string; slug: string }
  | {
      kind: "social_media";
      title: string;
      titleEn: string;
      slug: string;
      priceMad?: number | null;
    }
  | {
      kind: "card";
      title: string;
      titleEn: string;
      slug: string;
      cardType: CardType;
      quantity: number;
      priceMad?: number | null;
    }
  | { kind: "general" };

/* -------------------------------------------------------------------------- */
/* Localised copy                                                             */
/* -------------------------------------------------------------------------- */

const GREETING: Record<Locale, { flux: string; dentista: string }> = {
  en: { flux: "Hello FLUXMEDIA 👋", dentista: "Hello DENTISTA 👋" },
  fr: { flux: "Bonjour FLUXMEDIA 👋", dentista: "Bonjour DENTISTA 👋" },
  ar: { flux: "مرحباً FLUXMEDIA 👋", dentista: "مرحباً DENTISTA 👋" },
};

const INTRO: Record<Locale, Record<ServiceType, string>> = {
  en: {
    automation: "I'd like to order this automation system:",
    social_media:
      "I'd like to subscribe to this social media management package:",
    card: "I'd like to order this card:",
    general: "I'd like to talk about a project.",
  },
  fr: {
    automation: "Je souhaite commander ce système d'automatisation :",
    social_media:
      "Je souhaite souscrire à cette formule de gestion des réseaux sociaux :",
    card: "Je souhaite commander cette carte :",
    general: "Je souhaite discuter d'un projet.",
  },
  ar: {
    automation: "أريد طلب نظام الأتمتة هذا:",
    social_media: "أريد الاشتراك في باقة إدارة مواقع التواصل الاجتماعي هذه:",
    card: "أريد طلب هذه البطاقة:",
    general: "أريد التحدث معكم بخصوص مشروع.",
  },
};

const CLOSING: Record<Locale, string> = {
  en: "Please send me the details and the next steps.",
  fr: "Merci de m'envoyer les détails et les prochaines étapes.",
  ar: "من فضلكم أرسلوا لي التفاصيل والخطوات التالية.",
};

const PER_MONTH: Record<Locale, string> = {
  en: "/ month",
  fr: "/ mois",
  ar: "/ شهرياً",
};

const CARD_LABELS: Record<
  Locale,
  {
    type: string;
    quantity: string;
    price: string;
    regular: string;
    nfc: string;
  }
> = {
  en: {
    type: "Type",
    quantity: "Quantity",
    price: "Price",
    regular: "Regular",
    nfc: "NFC",
  },
  fr: {
    type: "Type",
    quantity: "Quantité",
    price: "Prix",
    regular: "Classique",
    nfc: "NFC",
  },
  ar: {
    type: "النوع",
    quantity: "الكمية",
    price: "السعر",
    regular: "عادية",
    nfc: "NFC",
  },
};

/* -------------------------------------------------------------------------- */
/* Message building                                                           */
/* -------------------------------------------------------------------------- */

function machineBlock(lines: Array<[string, string | number | null]>): string {
  const body = lines
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}: ${value === null ? "" : value}`)
    .join("\n");
  return `—\n${body}`;
}

export function serviceTypeOf(payload: OrderPayload): ServiceType {
  switch (payload.kind) {
    case "automation":
      return "automation";
    case "social_media":
      return "social_media";
    case "card":
      return "card";
    default:
      return "general";
  }
}

/**
 * Builds the pre-filled WhatsApp text. The human part follows the visitor's
 * language, the machine block is always English so the owner (or an
 * automation) can parse it into the orders sheet.
 */
export function buildOrderMessage(
  payload: OrderPayload,
  locale: Locale,
): string {
  const greeting = GREETING[locale];
  const closing = CLOSING[locale];

  if (payload.kind === "automation") {
    return [
      greeting.flux,
      INTRO[locale].automation,
      "",
      `📌 ${payload.title}`,
      "",
      closing,
      "",
      machineBlock([
        ["ORDER_TYPE", "AUTOMATION"],
        ["ITEM_TITLE", payload.titleEn],
        ["ITEM_REF", payload.slug],
        ["LANG", locale],
        ["SOURCE", "website"],
      ]),
    ].join("\n");
  }

  if (payload.kind === "social_media") {
    const price = priceForMessage(payload.priceMad ?? null, locale);
    const line = price
      ? `📦 ${payload.title} — ${price} ${PER_MONTH[locale]}`
      : `📦 ${payload.title}`;
    return [
      greeting.flux,
      INTRO[locale].social_media,
      "",
      line,
      "",
      closing,
      "",
      machineBlock([
        ["ORDER_TYPE", "SOCIAL_PACKAGE"],
        ["ITEM_TITLE", payload.titleEn],
        ["ITEM_REF", payload.slug],
        ["PRICE_MAD", payload.priceMad ?? ""],
        ["CURRENCY", "MAD"],
        ["LANG", locale],
        ["SOURCE", "website"],
      ]),
    ].join("\n");
  }

  if (payload.kind === "card") {
    const labels = CARD_LABELS[locale];
    const price = priceForMessage(payload.priceMad ?? null, locale);
    const lines = [
      `💳 ${payload.title}`,
      `${labels.type}: ${
        payload.cardType === "nfc" ? labels.nfc : labels.regular
      }`,
      `${labels.quantity}: ${payload.quantity}`,
    ];
    if (price) lines.push(`${labels.price}: ${price}`);

    return [
      greeting.dentista,
      INTRO[locale].card,
      "",
      ...lines,
      "",
      closing,
      "",
      machineBlock([
        ["ORDER_TYPE", "CARD"],
        ["CARD_TYPE", payload.cardType === "nfc" ? "NFC" : "REGULAR"],
        ["ITEM_TITLE", payload.titleEn],
        ["ITEM_REF", payload.slug],
        ["QUANTITY", payload.quantity],
        ["PRICE_MAD", payload.priceMad ?? ""],
        ["CURRENCY", "MAD"],
        ["LANG", locale],
        ["SOURCE", "website"],
      ]),
    ].join("\n");
  }

  return [
    greeting.flux,
    INTRO[locale].general,
    "",
    closing,
    "",
    machineBlock([
      ["ORDER_TYPE", "GENERAL"],
      ["LANG", locale],
      ["SOURCE", "website"],
    ]),
  ].join("\n");
}

/** Full wa.me link with the pre-filled message. */
export function waLink(
  payload: OrderPayload,
  locale: Locale,
  phone: string = WA_NUMBER,
): string {
  const number = (phone || WA_NUMBER).replace(/\D/g, "");
  const text = encodeURIComponent(buildOrderMessage(payload, locale));
  return `https://wa.me/${number}?text=${text}`;
}

/** Plain chat link (used by the admin to reply to a client). */
export function waChatLink(phone: string, text: string): string {
  const number = phone.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/** Shape posted to `/api/orders/intent` when an order button is clicked. */
export type OrderIntentBody = {
  service_type: ServiceType;
  card_type: CardType | null;
  item_ref: string | null;
  item_title: string | null;
  quantity: number | null;
  unit_price_mad: number | null;
  total_price_mad: number | null;
  locale: Locale;
};

export function intentFromPayload(
  payload: OrderPayload,
  locale: Locale,
): OrderIntentBody {
  const base = {
    locale,
    card_type: null as CardType | null,
    quantity: null as number | null,
    unit_price_mad: null as number | null,
    total_price_mad: null as number | null,
  };

  switch (payload.kind) {
    case "automation":
      return {
        ...base,
        service_type: "automation",
        item_ref: payload.slug,
        item_title: payload.titleEn,
      };
    case "social_media":
      return {
        ...base,
        service_type: "social_media",
        item_ref: payload.slug,
        item_title: payload.titleEn,
        quantity: 1,
        unit_price_mad: payload.priceMad ?? null,
        total_price_mad: payload.priceMad ?? null,
      };
    case "card":
      return {
        ...base,
        service_type: "card",
        card_type: payload.cardType,
        item_ref: payload.slug,
        item_title: payload.titleEn,
        quantity: payload.quantity,
        unit_price_mad:
          payload.priceMad !== null && payload.priceMad !== undefined
            ? Math.round((payload.priceMad / payload.quantity) * 100) / 100
            : null,
        total_price_mad: payload.priceMad ?? null,
      };
    default:
      return {
        ...base,
        service_type: "general",
        item_ref: null,
        item_title: null,
      };
  }
}
