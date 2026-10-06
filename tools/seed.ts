/**
 * Seeds a fresh Supabase project with every piece of content the website
 * needs: page texts from the content registry, navigation, automations,
 * packages, cards, FAQs, social links and WhatsApp reply templates.
 *
 *   npm run db:seed
 *
 * The script is idempotent:
 *   * `site_content` rows are inserted only when the key does not exist yet,
 *     so editors never lose their work when the script is run again.
 *   * every catalog table is upserted on its natural key (slug / key).
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.
 */

import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

import { CONTENT_REGISTRY } from "@/lib/content/registry";
import {
  seedAutomations,
  seedCards,
  seedCategories,
  seedFaqs,
  seedFooterLinks,
  seedHomeSections,
  seedNavigation,
  seedPackages,
  seedReplyTemplates,
  seedSettings,
  seedSocialLinks,
  seedSocialServices,
  seedSocialSteps,
} from "@/lib/seed";

config({ path: ".env.local" });
config({ path: ".env" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "\nMissing Supabase credentials.\n" +
      "Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local,\n" +
      "then run npm run db:seed again.\n",
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

function step(message: string) {
  process.stdout.write(`  ${message}\n`);
}

function fail(label: string, error: { message: string } | null): void {
  if (!error) return;
  console.error(`\n✖ ${label}: ${error.message}\n`);
  process.exit(1);
}

/* -------------------------------------------------------------------------- */
/* Content registry                                                           */
/* -------------------------------------------------------------------------- */

async function seedContent() {
  const { data: existing, error } = await supabase
    .from("site_content")
    .select("key");
  fail("reading site_content", error);

  const known = new Set((existing ?? []).map((row) => row.key as string));
  const missing = CONTENT_REGISTRY.filter((entry) => !known.has(entry.key)).map(
    (entry) => ({
      key: entry.key,
      kind: entry.kind,
      value: entry.default,
      updated_by: "seed",
    }),
  );

  if (missing.length > 0) {
    const { error: insertError } = await supabase
      .from("site_content")
      .insert(missing);
    fail("inserting site_content", insertError);
  }

  step(
    `site_content: ${missing.length} new key${missing.length === 1 ? "" : "s"}, ` +
      `${known.size} kept (${CONTENT_REGISTRY.length} total)`,
  );
}

/* -------------------------------------------------------------------------- */
/* Settings, sections, navigation                                             */
/* -------------------------------------------------------------------------- */

async function seedSite() {
  const { data: settingsRow } = await supabase
    .from("site_settings")
    .select("id")
    .limit(1)
    .maybeSingle();

  if (settingsRow?.id) {
    step("site_settings: already present, left untouched");
  } else {
    const { error } = await supabase.from("site_settings").insert(seedSettings);
    fail("inserting site_settings", error);
    step("site_settings: created");
  }

  const { error: sectionsError } = await supabase
    .from("home_sections")
    .upsert(seedHomeSections, { onConflict: "key" });
  fail("upserting home_sections", sectionsError);
  step(`home_sections: ${seedHomeSections.length} rows`);

  const { count: navCount } = await supabase
    .from("navigation_items")
    .select("id", { count: "exact", head: true });

  if (!navCount) {
    const { error } = await supabase
      .from("navigation_items")
      .insert(seedNavigation);
    fail("inserting navigation_items", error);
    step(`navigation_items: ${seedNavigation.length} rows`);
  } else {
    step("navigation_items: already present, left untouched");
  }

  const { count: footerCount } = await supabase
    .from("footer_links")
    .select("id", { count: "exact", head: true });

  if (!footerCount) {
    const { error } = await supabase
      .from("footer_links")
      .insert(seedFooterLinks);
    fail("inserting footer_links", error);
    step(`footer_links: ${seedFooterLinks.length} rows`);
  } else {
    step("footer_links: already present, left untouched");
  }
}

/* -------------------------------------------------------------------------- */
/* Automations                                                                */
/* -------------------------------------------------------------------------- */

async function seedAutomationCatalog() {
  const { error: categoriesError } = await supabase
    .from("categories")
    .upsert(seedCategories, { onConflict: "slug" });
  fail("upserting categories", categoriesError);
  step(`categories: ${seedCategories.length} rows`);

  const { error: automationsError } = await supabase
    .from("automations")
    .upsert(seedAutomations, { onConflict: "slug" });
  fail("upserting automations", automationsError);
  step(`automations: ${seedAutomations.length} rows`);
}

/* -------------------------------------------------------------------------- */
/* Social media                                                               */
/* -------------------------------------------------------------------------- */

async function seedSocial() {
  for (const pkg of seedPackages) {
    const { features, ...row } = pkg;

    const { data, error } = await supabase
      .from("social_packages")
      .upsert(row, { onConflict: "slug" })
      .select("id")
      .single();
    fail(`upserting package ${row.slug}`, error);

    const packageId = data?.id as string;

    const { error: deleteError } = await supabase
      .from("package_features")
      .delete()
      .eq("package_id", packageId);
    fail("clearing package_features", deleteError);

    const { error: featuresError } = await supabase
      .from("package_features")
      .insert(
        features.map((feature) => ({
          package_id: packageId,
          text: feature.text,
          sort_order: feature.sort_order,
        })),
      );
    fail("inserting package_features", featuresError);
  }
  step(`social_packages: ${seedPackages.length} rows with features`);

  const { count: servicesCount } = await supabase
    .from("social_page_services")
    .select("id", { count: "exact", head: true });

  if (!servicesCount) {
    const { error } = await supabase
      .from("social_page_services")
      .insert(seedSocialServices);
    fail("inserting social_page_services", error);
    step(`social_page_services: ${seedSocialServices.length} rows`);
  } else {
    step("social_page_services: already present, left untouched");
  }

  const { count: stepsCount } = await supabase
    .from("social_page_steps")
    .select("id", { count: "exact", head: true });

  if (!stepsCount) {
    const { error } = await supabase
      .from("social_page_steps")
      .insert(seedSocialSteps);
    fail("inserting social_page_steps", error);
    step(`social_page_steps: ${seedSocialSteps.length} rows`);
  } else {
    step("social_page_steps: already present, left untouched");
  }
}

/* -------------------------------------------------------------------------- */
/* Cards                                                                      */
/* -------------------------------------------------------------------------- */

async function seedCardCatalog() {
  for (const card of seedCards) {
    const { tiers, ...row } = card;

    const { data, error } = await supabase
      .from("card_products")
      .upsert(row, { onConflict: "slug" })
      .select("id")
      .single();
    fail(`upserting card ${row.slug}`, error);

    const cardId = data?.id as string;

    const { error: deleteError } = await supabase
      .from("card_price_tiers")
      .delete()
      .eq("card_id", cardId);
    fail("clearing card_price_tiers", deleteError);

    const { error: tiersError } = await supabase
      .from("card_price_tiers")
      .insert(
        tiers.map((tier) => ({
          card_id: cardId,
          quantity: tier.quantity,
          price_mad: tier.price_mad,
          enabled: true,
          sort_order: tier.sort_order,
        })),
      );
    fail("inserting card_price_tiers", tiersError);
  }
  step(`card_products: ${seedCards.length} rows with price tiers`);
}

/* -------------------------------------------------------------------------- */
/* FAQs, social links, reply templates                                        */
/* -------------------------------------------------------------------------- */

async function seedExtras() {
  const { count: faqCount } = await supabase
    .from("faqs")
    .select("id", { count: "exact", head: true });

  if (!faqCount) {
    const { error } = await supabase.from("faqs").insert(seedFaqs);
    fail("inserting faqs", error);
    step(`faqs: ${seedFaqs.length} rows`);
  } else {
    step("faqs: already present, left untouched");
  }

  const { count: linksCount } = await supabase
    .from("social_links")
    .select("id", { count: "exact", head: true });

  if (!linksCount) {
    const { error } = await supabase
      .from("social_links")
      .insert(seedSocialLinks);
    fail("inserting social_links", error);
    step(`social_links: ${seedSocialLinks.length} rows`);
  } else {
    step("social_links: already present, left untouched");
  }

  const { error: templatesError } = await supabase
    .from("reply_templates")
    .upsert(seedReplyTemplates, { onConflict: "key" });
  fail("upserting reply_templates", templatesError);
  step(`reply_templates: ${seedReplyTemplates.length} rows`);
}

/* -------------------------------------------------------------------------- */
/* First admin                                                                */
/* -------------------------------------------------------------------------- */

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim();
  if (!email) {
    step("admin_users: ADMIN_EMAIL not set, skipped");
    return;
  }

  const { data: list, error } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 200,
  });

  if (error) {
    step(`admin_users: could not read auth users (${error.message})`);
    return;
  }

  const user = list.users.find(
    (candidate) => candidate.email?.toLowerCase() === email.toLowerCase(),
  );

  if (!user) {
    step(
      `admin_users: no auth user for ${email}. ` +
        "Create it in Supabase → Authentication → Users, then run the seed again.",
    );
    return;
  }

  const { error: upsertError } = await supabase
    .from("admin_users")
    .upsert(
      { user_id: user.id, email, role: "owner", active: true },
      { onConflict: "user_id" },
    );
  fail("upserting admin_users", upsertError);
  step(`admin_users: ${email} is an owner`);
}

/* -------------------------------------------------------------------------- */

async function main() {
  console.log("\nSeeding FLUXMEDIA content…\n");

  await seedContent();
  await seedSite();
  await seedAutomationCatalog();
  await seedSocial();
  await seedCardCatalog();
  await seedExtras();
  await seedAdmin();

  console.log("\n✔ Done. Open /admin to edit everything.\n");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
