import { TAGS, type CacheTag } from "@/lib/data/tags";

/**
 * Declarative description of everything the admin can read and write.
 * One generic route handler (`/api/admin/[resource]`) serves them all.
 */
export type ResourceConfig = {
  table: string;
  /** Cache tags revalidated after every successful write. */
  tags: CacheTag[];
  /** Primary key column used by ?id= lookups. */
  primaryKey: string;
  /** Columns the admin is allowed to write. Everything else is stripped. */
  columns: string[];
  /** Default ordering for list requests. */
  orderBy?: { column: string; ascending: boolean };
  /** Optional nested select (Supabase embedded resources). */
  select?: string;
  /** Only the owner role may write to this resource. */
  ownerOnly?: boolean;
  /** Only the owner role may delete rows. */
  ownerOnlyDelete?: boolean;
};

const ML_COLUMNS = ["label", "name", "title", "text", "description"];

export const RESOURCES: Record<string, ResourceConfig> = {
  site_content: {
    table: "site_content",
    tags: [TAGS.content],
    primaryKey: "key",
    columns: ["key", "kind", "value", "updated_by"],
  },
  home_sections: {
    table: "home_sections",
    tags: [TAGS.homeSections],
    primaryKey: "key",
    columns: ["key", "label", "sort_order", "visible"],
    orderBy: { column: "sort_order", ascending: true },
  },
  site_settings: {
    table: "site_settings",
    tags: [TAGS.settings],
    primaryKey: "id",
    columns: [
      "site_name",
      "tagline",
      "contact_email",
      "whatsapp_number",
      "address",
      "footer_note",
      "default_locale",
    ],
    ownerOnly: true,
  },
  navigation_items: {
    table: "navigation_items",
    tags: [TAGS.navigation],
    primaryKey: "id",
    columns: ["label", "href", "sort_order", "active", "placement"],
    orderBy: { column: "sort_order", ascending: true },
  },
  footer_links: {
    table: "footer_links",
    tags: [TAGS.footer],
    primaryKey: "id",
    columns: ["group_key", "label", "href", "sort_order", "active"],
    orderBy: { column: "sort_order", ascending: true },
  },
  categories: {
    table: "categories",
    tags: [TAGS.categories, TAGS.automations],
    primaryKey: "id",
    columns: ["slug", "name", "sort_order", "active"],
    orderBy: { column: "sort_order", ascending: true },
  },
  automations: {
    table: "automations",
    tags: [TAGS.automations],
    primaryKey: "id",
    columns: [
      "slug",
      "title",
      "title_en",
      "short",
      "description",
      "category_slug",
      "icon",
      "thumbnail_url",
      "benefits",
      "workflow",
      "integrations",
      "sort_order",
      "active",
    ],
    orderBy: { column: "sort_order", ascending: true },
  },
  social_packages: {
    table: "social_packages",
    tags: [TAGS.packages],
    primaryKey: "id",
    select: "*, package_features(*)",
    columns: [
      "slug",
      "name",
      "title_en",
      "description",
      "price_mad",
      "billing_period",
      "badge",
      "popular",
      "visible",
      "sort_order",
      "posts_per_month",
      "reels_per_month",
      "stories_per_month",
      "platforms",
    ],
    orderBy: { column: "sort_order", ascending: true },
  },
  package_features: {
    table: "package_features",
    tags: [TAGS.packages],
    primaryKey: "id",
    columns: ["package_id", "text", "sort_order"],
    orderBy: { column: "sort_order", ascending: true },
  },
  social_page_services: {
    table: "social_page_services",
    tags: [TAGS.socialPage],
    primaryKey: "id",
    columns: ["icon", "title", "text", "sort_order", "active"],
    orderBy: { column: "sort_order", ascending: true },
  },
  social_page_steps: {
    table: "social_page_steps",
    tags: [TAGS.socialPage],
    primaryKey: "id",
    columns: ["step_no", "title", "text", "sort_order", "active"],
    orderBy: { column: "sort_order", ascending: true },
  },
  faqs: {
    table: "faqs",
    tags: [TAGS.faqs],
    primaryKey: "id",
    columns: ["scope", "question", "answer", "sort_order", "visible"],
    orderBy: { column: "sort_order", ascending: true },
  },
  card_products: {
    table: "card_products",
    tags: [TAGS.cards],
    primaryKey: "id",
    select: "*, card_price_tiers(*)",
    columns: [
      "slug",
      "type",
      "title",
      "title_en",
      "description",
      "specs",
      "finish",
      "popular",
      "visible",
      "sort_order",
      "image_url",
    ],
    orderBy: { column: "sort_order", ascending: true },
  },
  card_price_tiers: {
    table: "card_price_tiers",
    tags: [TAGS.cards],
    primaryKey: "id",
    columns: ["card_id", "quantity", "price_mad", "enabled", "sort_order"],
    orderBy: { column: "sort_order", ascending: true },
  },
  social_links: {
    table: "social_links",
    tags: [TAGS.socialLinks],
    primaryKey: "id",
    columns: [
      "platform",
      "name",
      "username",
      "description",
      "url",
      "active",
      "sort_order",
    ],
    orderBy: { column: "sort_order", ascending: true },
  },
  clients: {
    table: "clients",
    tags: [],
    primaryKey: "id",
    columns: [
      "name",
      "phone",
      "email",
      "business_name",
      "city",
      "notes",
      "package_slug",
      "platforms",
      "handles",
      "monthly_price_mad",
      "start_date",
      "status",
    ],
    orderBy: { column: "created_at", ascending: false },
  },
  orders: {
    table: "orders",
    tags: [],
    primaryKey: "id",
    columns: [
      "service_type",
      "card_type",
      "item_ref",
      "item_title",
      "quantity",
      "unit_price_mad",
      "total_price_mad",
      "locale",
      "status",
      "payment_status",
      "client_id",
      "client_name",
      "client_phone",
      "client_email",
      "business_name",
      "city",
      "notes",
      "source",
      "delivery_date",
      "assigned_to",
    ],
    orderBy: { column: "created_at", ascending: false },
    ownerOnlyDelete: true,
  },
  order_events: {
    table: "order_events",
    tags: [],
    primaryKey: "id",
    columns: ["order_id", "kind", "text", "actor"],
    orderBy: { column: "created_at", ascending: false },
  },
  reply_templates: {
    table: "reply_templates",
    tags: [],
    primaryKey: "id",
    columns: ["key", "service_type", "name", "body", "sort_order", "active"],
    orderBy: { column: "sort_order", ascending: true },
  },
  contact_messages: {
    table: "contact_messages",
    tags: [],
    primaryKey: "id",
    columns: ["status"],
    orderBy: { column: "created_at", ascending: false },
  },
  admin_users: {
    table: "admin_users",
    tags: [],
    primaryKey: "id",
    columns: ["user_id", "email", "role", "active"],
    orderBy: { column: "created_at", ascending: true },
    ownerOnly: true,
  },
  media_assets: {
    table: "media_assets",
    tags: [],
    primaryKey: "id",
    columns: ["url", "path", "alt", "kind", "size"],
    orderBy: { column: "created_at", ascending: false },
  },
};

export type ResourceName = keyof typeof RESOURCES;

export function isResource(value: string): value is ResourceName {
  return Object.prototype.hasOwnProperty.call(RESOURCES, value);
}

/** Keeps only the columns a resource declares as writable. */
export function pickColumns(
  config: ResourceConfig,
  input: Record<string, unknown>,
): Record<string, unknown> {
  const output: Record<string, unknown> = {};
  for (const column of config.columns) {
    if (column in input) output[column] = input[column];
  }
  return output;
}

export { ML_COLUMNS };
