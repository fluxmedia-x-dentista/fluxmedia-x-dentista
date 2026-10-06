# FLUXMEDIA × DENTISTA

Production website, content management system and WhatsApp orders manager for
**FLUXMEDIA** — an AI automation and social media agency in Beni Mellal,
Morocco — and its printed / NFC business card brand **DENTISTA**.

- Next.js 14 (App Router) · React 18 · TypeScript 5.6 · Tailwind 3.4
- Supabase (Postgres + Auth + Storage + Realtime) as the only data store
- Three languages: English, French and Arabic (full RTL)
- No order forms anywhere: every order button opens WhatsApp with a
  pre-filled message, and the click is recorded in the orders sheet

---

## 1. Quick start

```bash
npm install
cp .env.example .env.local      # fill in the Supabase keys (section 2)
npm run dev                     # http://localhost:3000
```

The site runs **before** Supabase exists: without keys it renders the bundled
starter content, shows a small setup banner, and `/admin` explains what to do.

| Script                   | What it does                                         |
| ------------------------ | ---------------------------------------------------- |
| `npm run dev`            | Dev server on `0.0.0.0:3000`                         |
| `npm run build`          | Production build                                     |
| `npm start`              | Serve the production build                           |
| `npm run typecheck`      | `tsc --noEmit`                                       |
| `npm run lint`           | `next lint`                                          |
| `npm run format`         | Prettier over the whole repository                   |
| `npm run db:seed`        | Fill a fresh Supabase project with all content       |
| `npm run assets:prepare` | Rebuild favicon / apple icon / trimmed DENTISTA logo |

---

## 2. Supabase setup

### 2.1 Create the project

1. Create a project on [supabase.com](https://supabase.com) (region `eu-west`
   is the closest to Morocco).
2. Open **SQL Editor** and run, in this order:
   - `supabase/schema.sql` — tables, indexes, triggers, the `site-media`
     storage bucket and the realtime publication for `orders`.
   - `supabase/policies.sql` — row level security for every table.

Both files are idempotent: running them again is safe.

### 2.2 Environment variables

Copy `.env.example` to `.env.local` and fill it in from
**Project settings → API**:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...      # server only, never exposed
NEXT_PUBLIC_SITE_URL=https://fluxmedia.ma
NEXT_PUBLIC_WHATSAPP_NUMBER=212639803872
ADMIN_EMAIL=owner@fluxmedia.ma
MAKE_WEBHOOK_URL=                            # optional
```

The service-role key is read only in `lib/supabase/admin.ts`, which starts with
`import "server-only"`. It is never referenced from a client component and
never ends up in a browser bundle.

### 2.3 Create the first admin

1. **Authentication → Users → Add user**: create the account with the email you
   put in `ADMIN_EMAIL` and a password.
2. Run the seed (next step). It finds that auth user and inserts it into
   `admin_users` with the `owner` role.
3. Sign in at `/admin/login`.

Extra admins are added from **Admin → Users & roles** (owner only): create the
person in Supabase Authentication first, then paste their user UID.

| Role     | Can do                                                                       |
| -------- | ---------------------------------------------------------------------------- |
| `owner`  | Everything: users, site settings, deleting orders                            |
| `editor` | All content, catalog and the orders sheet — no user management, no deletions |

### 2.4 Seed the content

```bash
npm run db:seed
```

Inserts the full content registry (every text on the site, in 3 languages),
navigation, footer links, 7 categories, 11 automations, 3 packages, 6 cards
with their price tiers, 10 FAQs, 6 social links and the WhatsApp reply
templates.

The script is safe to re-run: `site_content` keys that already exist are left
untouched, so editors never lose their work, and catalog rows are upserted on
their slug.

---

## 3. Routes

### Public

| Route                         | Content                                                                |
| ----------------------------- | ---------------------------------------------------------------------- |
| `/`                           | Home: hero, specialties, automation, social, cards, process, final CTA |
| `/automations`                | Searchable, filterable grid of automations                             |
| `/automations/[slug]`         | Detail page: benefits, workflow, integrations, order button            |
| `/social-media`               | Services, packages, process, FAQ                                       |
| `/cards`                      | DENTISTA regular + NFC cards, quantity tiers, comparison, FAQ          |
| `/request`                    | “What do you need?” — three paths plus a WhatsApp escape hatch         |
| `/about`                      | Who FLUXMEDIA is, services, principles, the two brands                 |
| `/social`                     | All official social accounts                                           |
| `/contact`                    | Contact details, WhatsApp button and a contact form                    |
| `/privacy`, `/terms`          | Legal pages (Markdown, editable in the admin)                          |
| `/sitemap.xml`, `/robots.txt` | Generated from the live catalog                                        |

### Admin (`/admin`, never indexed)

`Dashboard` · `Orders (Sheet)` · `Automations` · `Categories` ·
`Social Media` (Overview, Page Content, Packages, Clients, Content, Calendar,
Inbox, Analytics, Reports, Accounts) · `Cards` · `Pages` (Home, About, Cards,
Automations, Social, Request & Contact, Footer, Navbar labels, Privacy, Terms,
SEO, Buttons & labels) · `Social Links` · `Messages` · `Reply templates` ·
`Media` · `Navigation` · `Users & roles` · `Settings`.

The screens under Social Media → Calendar / Inbox / Analytics / Reports /
Accounts / Content are a **demo workspace**, clearly labelled “Demo data”.
Nothing from them is ever shown on the public site.

### API

| Endpoint                       | Purpose                                                       |
| ------------------------------ | ------------------------------------------------------------- |
| `POST /api/orders/intent`      | Records a WhatsApp order click (deduplicated), sets `fm_sid`  |
| `POST /api/contact`            | Contact form, honeypot + rate limited                         |
| `/api/admin/[resource]`        | Generic CRUD for every admin resource (session + role checks) |
| `POST /api/admin/media/upload` | Uploads an image to the `site-media` bucket                   |
| `GET /api/admin/orders/export` | CSV export of the filtered orders (UTF-8 BOM)                 |

---

## 4. Changing the WhatsApp number

The number lives in **one** place at runtime: `site_settings.whatsapp_number`.

1. Open **Admin → Settings**.
2. Edit **WhatsApp number** — digits only, with the country code, e.g.
   `212639803872`.
3. Save. Every order button, the floating button, the contact page and the
   footer pick it up immediately (the settings cache is revalidated on save).

Two more places use a number, both only as a fallback before the database is
reachable:

- `.env.local` → `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `lib/seed/site.ts` → `seedSettings.whatsapp_number` (used by
  `npm run db:seed` and by the offline preview)

---

## 5. WhatsApp messages → order fields

Every order button does two things, in this order:

1. `navigator.sendBeacon("/api/orders/intent", …)` with the order payload.
2. Opens `https://wa.me/<number>?text=<message>`.

The visitor is never asked for a name or an email first.

### 5.1 Message format

The message has two parts: a human part in the visitor's language, then a
separator and an English machine block that is always identical.

Card order, English:

```
Hello DENTISTA 👋
I'd like to order this card:

💳 DENTISTA Classic Matte
Type: Regular
Quantity: 200
Price: 890 DH

Please send me the details and the next steps.

—
ORDER_TYPE: CARD
CARD_TYPE: REGULAR
ITEM_TITLE: DENTISTA Classic Matte
ITEM_REF: dentista-classic-matte
QUANTITY: 200
PRICE_MAD: 890
CURRENCY: MAD
LANG: en
SOURCE: website
```

The same card in Arabic — only the human part changes:

```
مرحباً DENTISTA 👋
أريد طلب هذه البطاقة:

💳 DENTISTA Classic Matte
النوع: عادية
الكمية: 200
السعر: 890 درهم

من فضلكم أرسلوا لي التفاصيل والخطوات التالية.

—
ORDER_TYPE: CARD
...
LANG: ar
SOURCE: website
```

Automation (no price ever), French:

```
Bonjour FLUXMEDIA 👋
Je souhaite commander ce système d'automatisation :

📌 Automatisation des DM Instagram

Merci de m'envoyer les détails et les prochaines étapes.

—
ORDER_TYPE: AUTOMATION
ITEM_TITLE: Instagram DM Automation
ITEM_REF: instagram-dm-automation
LANG: fr
SOURCE: website
```

Social media package, English:

```
Hello FLUXMEDIA 👋
I'd like to subscribe to this social media management package:

📦 Growth — 890 DH / month

Please send me the details and the next steps.

—
ORDER_TYPE: SOCIAL_PACKAGE
ITEM_TITLE: Growth
ITEM_REF: growth
PRICE_MAD: 890
CURRENCY: MAD
LANG: en
SOURCE: website
```

General enquiry (floating button, contact and About pages):

```
Hello FLUXMEDIA 👋
I'd like to talk about a project.

Please send me the details and the next steps.

—
ORDER_TYPE: GENERAL
LANG: en
SOURCE: website
```

Greetings per brand: `Hello DENTISTA 👋` for cards, `Hello FLUXMEDIA 👋`
everywhere else (`Bonjour …` in French, `مرحباً …` in Arabic).

### 5.2 Field mapping

| Machine line | Orders sheet column | Notes                                                                                                  |
| ------------ | ------------------- | ------------------------------------------------------------------------------------------------------ |
| `ORDER_TYPE` | `service_type`      | `CARD` → `card`, `AUTOMATION` → `automation`, `SOCIAL_PACKAGE` → `social_media`, `GENERAL` → `general` |
| `ITEM_TITLE` | `item_title`        | English reference title of the product                                                                 |
| `ITEM_REF`   | `item_ref`          | Slug — also the de-duplication key                                                                     |
| `CARD_TYPE`  | `card_type`         | `REGULAR` / `NFC`, cards only                                                                          |
| `QUANTITY`   | `quantity`          | 100 / 200 / 500 for regular cards, 1 for NFC                                                           |
| `PRICE_MAD`  | `total_price_mad`   | Plain number, omitted when the price is “Price on WhatsApp”; `unit_price_mad` is derived from it       |
| `CURRENCY`   | —                   | Always `MAD`, never a `$` amount                                                                       |
| `LANG`       | `locale`            | `en` / `fr` / `ar`                                                                                     |
| `SOURCE`     | `source`            | `whatsapp_click`, or `manual` for rows added by hand                                                   |

Fields that cannot come from the website are filled in by the team inside the
sheet: `client_name`, `client_phone`, `business_name`, `city`, `status`,
`payment_status`, `delivery_date`, `assigned_to`, `notes`.

### 5.3 Deduplication

A first-party cookie `fm_sid` identifies the browser (no personal data). If the
same visitor clicks the same item again within **10 minutes**, the existing row
is reused: `click_count` is incremented and `last_click_at` is updated instead
of creating a duplicate order.

---

## 6. The orders sheet

`/admin/orders` is a spreadsheet-style view with:

- filter tabs **All / Cards / Automation / Social / General**, plus status,
  payment, date range and free-text search;
- inline editing of client name, phone, status and payment;
- a row drawer with the full order, an event timeline, internal notes and
  WhatsApp reply templates (`{client_name} {item} {qty} {price} {order_no}`);
- **Add order** for phone or walk-in orders (`source = manual`);
- **Export CSV** (UTF-8 BOM, opens correctly in Excel with Arabic text) and
  **Copy TSV** for pasting into Google Sheets;
- realtime: new clicks appear without reloading.

Status values: `click → in_conversation → confirmed → in_progress → delivered →
completed`, plus `no_response` and `cancelled`. Status and payment changes are
written to `order_events` automatically by a database trigger.

---

## 7. Editing the website

Everything the visitor reads is editable in **Admin → Pages**. The source of
truth is the content registry in `lib/content/registry/`: each entry declares a
key, the admin page and section it belongs to, its type (`text`, `textarea`,
`richtext`, `image`, `link`, `bool`, `number`, `list`) and its default value in
the three languages.

- Adding an entry to the registry automatically makes it editable in the admin
  and seedable — no migration needed, values live in `site_content.value`
  (JSONB).
- Each text field has **EN / FR / AR** tabs; a dot marks a language that is
  still empty.
- The home page sections can be reordered and hidden from
  **Pages → Home → Sections & order**.
- Images (the 11 automation thumbnails and the 3 page backgrounds) are
  replaceable from the admin; uploads go to the `site-media` bucket and are
  listed in **Media**.
- Saving revalidates the matching cache tags, so the public site updates
  immediately.

### Prices

Prices are **MAD only**, formatted by the single helper
`formatPriceMAD(amount, locale)` → `890 DH` (EN/FR) or `890 درهم` (AR). A `null`
price renders “Price on WhatsApp”, which is how the seed data ships: set the
real amounts in the admin when you are ready.

Automations deliberately have **no price**.

---

## 8. Project structure

```
app/
  (site)/            public pages, each one a server component
  admin/             login + (panel) with the full CMS
  api/               orders intent, contact, admin CRUD, upload, CSV export
  fonts/             self-hosted Inter / Space Grotesk / Noto Kufi Arabic
components/
  admin/             the admin kit: inputs, collection editor, orders sheet…
  home/              home page sections
  …                  navbar, footer, cards browser, WhatsApp buttons…
lib/
  content/registry/  every editable string on the site
  data/              cached Supabase readers (unstable_cache + tags)
  seed/              seed data, also used as offline fallback
  supabase/          env, public, server, browser and service-role clients
  whatsapp.ts        message builder (human part + machine block)
supabase/
  schema.sql         tables, triggers, bucket, realtime
  policies.sql       row level security
tools/
  seed.ts            npm run db:seed
  generate-art.mjs   regenerates the 15 SVG artworks
  prepare-assets.mjs npm run assets:prepare
```

### Naming note

The spec calls the ordering column `order`; in Postgres that is a reserved
word, so every table uses **`sort_order`** instead. The admin UI still says
“Order”.

---

## 9. Security

- Row level security is enabled on **every** table.
- `orders`, `order_events`, `clients`, `contact_messages` and `reply_templates`
  are unreadable by anonymous visitors; they are written through API routes
  that use the service role after checking the session.
- Public catalog tables are world-readable, admin-writable.
- `site_settings` and `admin_users` are owner-only; deleting an order is
  owner-only, enforced both in the API route and in the policy.
- The contact form and the order-intent endpoint are rate limited per IP and
  the contact form has a honeypot field.
- `/admin/**` and `/api/admin/**` are protected by `middleware.ts`, and every
  page and handler verifies the role again on the server.

## 10. Accessibility and languages

- Full RTL for Arabic: logical utilities (`ms-/me-/ps-/pe-/start-/end-`),
  mirrored arrows, and a dedicated Arabic typeface.
- The admin is always LTR (`dir="ltr"`), even when the site language is Arabic.
- Skip link, visible focus rings, labelled controls, `aria-live` on the contact
  form, and `prefers-reduced-motion` support.
- No external stock photos: all artwork is original SVG generated by
  `tools/generate-art.mjs`, with no text inside the images.
