/**
 * Shared domain types for the FLUXMEDIA × DENTISTA site, CMS and orders sheet.
 */

export const LOCALES = ["en", "fr", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

/** Multilingual string. Every editable text in the project uses this shape. */
export type ML = {
  en: string;
  fr: string;
  ar: string;
};

/** Shorthand used by the content registry and the seed data. */
export function ml(en: string, fr: string, ar: string): ML {
  return { en, fr, ar };
}

/* -------------------------------------------------------------------------- */
/* Content registry                                                           */
/* -------------------------------------------------------------------------- */

export type ContentKind =
  | "text"
  | "textarea"
  | "richtext"
  | "image"
  | "link"
  | "bool"
  | "number"
  | "list";

export type ContentImage = {
  url: string;
  alt: ML;
  /** 0 - 100: strength of the dark gradient overlay drawn above the image. */
  overlay: number;
};

export type ContentLink = {
  href: string;
  label: ML;
};

/** Generic list row. Fields are reused with different meanings per key. */
export type ContentListItem = {
  id: string;
  title: ML;
  text: ML;
  extra: ML;
};

export type ContentValue =
  | ML
  | ContentImage
  | ContentLink
  | ContentListItem[]
  | boolean
  | number;

/** Admin editor page a content key belongs to. */
export type ContentPage =
  | "home"
  | "about"
  | "cards"
  | "automations"
  | "social"
  | "request-contact"
  | "footer"
  | "navigation"
  | "privacy"
  | "terms"
  | "seo"
  | "ui";

export type ContentEntry = {
  key: string;
  page: ContentPage;
  section: string;
  label: string;
  kind: ContentKind;
  help?: string;
  default: ContentValue;
};

export type ContentDictionary = Record<string, ContentValue>;

/** Flattened, single-locale dictionary handed to client components. */
export type ClientDictionary = Record<string, string>;

/* -------------------------------------------------------------------------- */
/* Database rows                                                              */
/* -------------------------------------------------------------------------- */

export type SiteSettings = {
  id: string;
  site_name: string;
  tagline: ML;
  contact_email: string;
  whatsapp_number: string;
  address: ML;
  footer_note: ML;
  default_locale: Locale;
};

export type HomeSection = {
  key: string;
  label: string;
  sort_order: number;
  visible: boolean;
};

export type NavigationItem = {
  id: string;
  label: ML;
  href: string;
  sort_order: number;
  active: boolean;
  placement: "header" | "footer";
};

export type FooterLink = {
  id: string;
  group_key: "navigation" | "services" | "bottom";
  label: ML;
  href: string;
  sort_order: number;
  active: boolean;
};

export type Category = {
  id: string;
  slug: string;
  name: ML;
  sort_order: number;
  active: boolean;
};

export type WorkflowStep = {
  title: ML;
  detail: ML;
};

export type Automation = {
  id: string;
  slug: string;
  title: ML;
  title_en: string;
  short: ML;
  description: ML;
  category_slug: string;
  icon: string;
  thumbnail_url: string | null;
  benefits: ML[];
  workflow: WorkflowStep[];
  integrations: string[];
  sort_order: number;
  active: boolean;
};

export type PackageFeature = {
  id: string;
  package_id: string;
  text: ML;
  sort_order: number;
};

export type SocialPackage = {
  id: string;
  slug: string;
  name: ML;
  title_en: string;
  description: ML;
  price_mad: number | null;
  billing_period: ML;
  badge: ML;
  popular: boolean;
  visible: boolean;
  sort_order: number;
  posts_per_month: number;
  reels_per_month: number;
  stories_per_month: number;
  platforms: string[];
  features: PackageFeature[];
};

export type SocialPageService = {
  id: string;
  icon: string;
  title: ML;
  text: ML;
  sort_order: number;
  active: boolean;
};

export type SocialPageStep = {
  id: string;
  step_no: number;
  title: ML;
  text: ML;
  sort_order: number;
  active: boolean;
};

export type FaqScope = "social" | "cards" | "home";

export type Faq = {
  id: string;
  scope: FaqScope;
  question: ML;
  answer: ML;
  sort_order: number;
  visible: boolean;
};

export type CardType = "regular" | "nfc";

export type CardPriceTier = {
  id: string;
  card_id: string;
  quantity: number;
  price_mad: number | null;
  enabled: boolean;
  sort_order: number;
};

export type CardProduct = {
  id: string;
  slug: string;
  type: CardType;
  title: ML;
  title_en: string;
  description: ML;
  specs: ML[];
  finish: "matte" | "glossy" | "soft-touch" | "metal" | "wood" | "pvc";
  popular: boolean;
  visible: boolean;
  sort_order: number;
  image_url: string | null;
  tiers: CardPriceTier[];
};

export type SocialLink = {
  id: string;
  platform: string;
  name: string;
  username: string;
  description: ML;
  url: string;
  active: boolean;
  sort_order: number;
};

export type Client = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  business_name: string | null;
  city: string | null;
  notes: string | null;
  package_slug: string | null;
  platforms: string[];
  handles: string | null;
  monthly_price_mad: number | null;
  start_date: string | null;
  status: "active" | "paused" | "ended";
  created_at: string;
  updated_at: string;
};

export type ServiceType = "automation" | "social_media" | "card" | "general";

export type OrderStatus =
  | "click"
  | "in_conversation"
  | "confirmed"
  | "in_progress"
  | "delivered"
  | "completed"
  | "no_response"
  | "cancelled";

export type PaymentStatus = "unpaid" | "deposit_paid" | "paid";

export type Order = {
  id: string;
  order_no: string;
  service_type: ServiceType;
  card_type: CardType | null;
  item_ref: string | null;
  item_title: string | null;
  quantity: number | null;
  unit_price_mad: number | null;
  total_price_mad: number | null;
  locale: Locale;
  status: OrderStatus;
  payment_status: PaymentStatus;
  client_id: string | null;
  client_name: string | null;
  client_phone: string | null;
  client_email: string | null;
  business_name: string | null;
  city: string | null;
  notes: string | null;
  source: "whatsapp_click" | "manual";
  click_count: number;
  first_click_at: string | null;
  last_click_at: string | null;
  delivery_date: string | null;
  assigned_to: string | null;
  session_id: string | null;
  created_at: string;
  updated_at: string;
};

export type OrderEvent = {
  id: string;
  order_id: string;
  kind: "status" | "note" | "payment" | "system";
  text: string;
  actor: string | null;
  created_at: string;
};

export type ReplyTemplate = {
  id: string;
  key: string;
  service_type: ServiceType;
  name: string;
  body: ML;
  sort_order: number;
  active: boolean;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  whatsapp: string | null;
  company: string | null;
  message: string;
  status: "new" | "read" | "archived";
  created_at: string;
};

export type AdminRole = "owner" | "editor";

export type AdminUser = {
  id: string;
  user_id: string;
  email: string;
  role: AdminRole;
  active: boolean;
  created_at: string;
};

export type MediaAsset = {
  id: string;
  url: string;
  path: string;
  alt: string | null;
  kind: string;
  size: number;
  created_at: string;
};
