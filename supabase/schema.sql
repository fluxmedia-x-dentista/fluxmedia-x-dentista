-- =============================================================================
-- FLUXMEDIA x DENTISTA - database schema
-- Run this file first in the Supabase SQL editor, then supabase/policies.sql.
-- Safe to re-run: every statement is idempotent.
-- =============================================================================

create extension if not exists "pgcrypto";

-- -----------------------------------------------------------------------------
-- Helpers
-- -----------------------------------------------------------------------------

-- Keeps updated_at fresh on every UPDATE.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- -----------------------------------------------------------------------------
-- Admin accounts
-- -----------------------------------------------------------------------------

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  email text not null,
  role text not null default 'editor' check (role in ('owner', 'editor')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- True when the caller is an active admin. SECURITY DEFINER so the policies on
-- admin_users itself cannot cause infinite recursion.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
      and active = true
  );
$$;

create or replace function public.is_owner()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
      and active = true
      and role = 'owner'
  );
$$;

-- -----------------------------------------------------------------------------
-- Content registry + global settings
-- -----------------------------------------------------------------------------

create table if not exists public.site_content (
  key text primary key,
  kind text not null default 'text',
  value jsonb not null,
  updated_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  site_name text not null default 'FLUXMEDIA',
  tagline jsonb not null default '{"en":"","fr":"","ar":""}'::jsonb,
  contact_email text not null default 'contact@fluxmedia.ma',
  whatsapp_number text not null default '212639803872',
  address jsonb not null default '{"en":"","fr":"","ar":""}'::jsonb,
  footer_note jsonb not null default '{"en":"","fr":"","ar":""}'::jsonb,
  default_locale text not null default 'en' check (default_locale in ('en', 'fr', 'ar')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.home_sections (
  key text primary key,
  label text not null,
  sort_order integer not null default 0,
  visible boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.navigation_items (
  id uuid primary key default gen_random_uuid(),
  label jsonb not null,
  href text not null,
  sort_order integer not null default 0,
  active boolean not null default true,
  placement text not null default 'header' check (placement in ('header', 'footer')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.footer_links (
  id uuid primary key default gen_random_uuid(),
  group_key text not null check (group_key in ('navigation', 'services', 'bottom')),
  label jsonb not null,
  href text not null,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- Automations
-- -----------------------------------------------------------------------------

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name jsonb not null,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.automations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title jsonb not null,
  title_en text not null default '',
  short jsonb not null default '{"en":"","fr":"","ar":""}'::jsonb,
  description jsonb not null default '{"en":"","fr":"","ar":""}'::jsonb,
  category_slug text not null default 'messaging',
  icon text not null default 'bot',
  thumbnail_url text,
  benefits jsonb not null default '[]'::jsonb,
  workflow jsonb not null default '[]'::jsonb,
  integrations jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists automations_category_idx on public.automations (category_slug);
create index if not exists automations_active_idx on public.automations (active, sort_order);

-- -----------------------------------------------------------------------------
-- Social media service
-- -----------------------------------------------------------------------------

create table if not exists public.social_packages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name jsonb not null,
  title_en text not null default '',
  description jsonb not null default '{"en":"","fr":"","ar":""}'::jsonb,
  price_mad numeric,
  billing_period jsonb not null default '{"en":"","fr":"","ar":""}'::jsonb,
  badge jsonb not null default '{"en":"","fr":"","ar":""}'::jsonb,
  popular boolean not null default false,
  visible boolean not null default true,
  sort_order integer not null default 0,
  posts_per_month integer not null default 0,
  reels_per_month integer not null default 0,
  stories_per_month integer not null default 0,
  platforms jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.package_features (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references public.social_packages (id) on delete cascade,
  text jsonb not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists package_features_package_idx on public.package_features (package_id, sort_order);

create table if not exists public.social_page_services (
  id uuid primary key default gen_random_uuid(),
  icon text not null default 'sparkles',
  title jsonb not null,
  text jsonb not null default '{"en":"","fr":"","ar":""}'::jsonb,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.social_page_steps (
  id uuid primary key default gen_random_uuid(),
  step_no integer not null default 1,
  title jsonb not null,
  text jsonb not null default '{"en":"","fr":"","ar":""}'::jsonb,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  scope text not null default 'social' check (scope in ('social', 'cards', 'home')),
  question jsonb not null,
  answer jsonb not null,
  sort_order integer not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists faqs_scope_idx on public.faqs (scope, sort_order);

-- -----------------------------------------------------------------------------
-- DENTISTA cards
-- -----------------------------------------------------------------------------

create table if not exists public.card_products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  type text not null default 'regular' check (type in ('regular', 'nfc')),
  title jsonb not null,
  title_en text not null default '',
  description jsonb not null default '{"en":"","fr":"","ar":""}'::jsonb,
  specs jsonb not null default '[]'::jsonb,
  finish text not null default 'matte',
  popular boolean not null default false,
  visible boolean not null default true,
  sort_order integer not null default 0,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.card_price_tiers (
  id uuid primary key default gen_random_uuid(),
  card_id uuid not null references public.card_products (id) on delete cascade,
  quantity integer not null default 100,
  price_mad numeric,
  enabled boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists card_price_tiers_card_idx on public.card_price_tiers (card_id, sort_order);

-- -----------------------------------------------------------------------------
-- Social links
-- -----------------------------------------------------------------------------

create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  name text not null,
  username text not null default '',
  description jsonb not null default '{"en":"","fr":"","ar":""}'::jsonb,
  url text not null,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- Clients, orders and the orders sheet
-- -----------------------------------------------------------------------------

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null default '',
  email text,
  business_name text,
  city text,
  notes text,
  package_slug text,
  platforms jsonb not null default '[]'::jsonb,
  handles text,
  monthly_price_mad numeric,
  start_date date,
  status text not null default 'active' check (status in ('active', 'paused', 'ended')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create sequence if not exists public.order_no_seq start 1;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_seq bigint not null default nextval('public.order_no_seq'),
  order_no text generated always as ('FM-' || lpad(order_seq::text, 4, '0')) stored,
  service_type text not null check (service_type in ('automation', 'social_media', 'card', 'general')),
  card_type text check (card_type in ('regular', 'nfc')),
  item_ref text default '',
  item_title text,
  quantity integer,
  unit_price_mad numeric,
  total_price_mad numeric,
  locale text not null default 'en' check (locale in ('en', 'fr', 'ar')),
  status text not null default 'click' check (
    status in (
      'click', 'in_conversation', 'confirmed', 'in_progress',
      'delivered', 'completed', 'no_response', 'cancelled'
    )
  ),
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid', 'deposit_paid', 'paid')),
  client_id uuid references public.clients (id) on delete set null,
  client_name text,
  client_phone text,
  client_email text,
  business_name text,
  city text,
  notes text,
  source text not null default 'whatsapp_click' check (source in ('whatsapp_click', 'manual')),
  click_count integer not null default 1,
  first_click_at timestamptz,
  last_click_at timestamptz,
  delivery_date date,
  assigned_to text,
  session_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_created_idx on public.orders (created_at desc);
create index if not exists orders_service_idx on public.orders (service_type, status);
-- Supports the 10 minute de-duplication lookup in /api/orders/intent.
create index if not exists orders_dedupe_idx on public.orders (session_id, service_type, item_ref, last_click_at desc);

create table if not exists public.order_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  kind text not null default 'note' check (kind in ('status', 'note', 'payment', 'system')),
  text text not null,
  actor text,
  created_at timestamptz not null default now()
);

create index if not exists order_events_order_idx on public.order_events (order_id, created_at desc);

-- Writes a timeline entry whenever the status or the payment status changes.
create or replace function public.log_order_change()
returns trigger
language plpgsql
as $$
begin
  if new.status is distinct from old.status then
    insert into public.order_events (order_id, kind, text, actor)
    values (new.id, 'status', 'Status changed from ' || old.status || ' to ' || new.status, 'admin');
  end if;

  if new.payment_status is distinct from old.payment_status then
    insert into public.order_events (order_id, kind, text, actor)
    values (new.id, 'payment', 'Payment changed from ' || old.payment_status || ' to ' || new.payment_status, 'admin');
  end if;

  return new;
end;
$$;

drop trigger if exists orders_log_change on public.orders;
create trigger orders_log_change
after update on public.orders
for each row
execute function public.log_order_change();

create table if not exists public.reply_templates (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  service_type text not null default 'general' check (service_type in ('automation', 'social_media', 'card', 'general')),
  name text not null,
  body jsonb not null,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  whatsapp text,
  company text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  path text not null,
  alt text,
  kind text not null default 'image/png',
  size integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- updated_at triggers
-- -----------------------------------------------------------------------------

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'admin_users', 'site_content', 'site_settings', 'home_sections',
    'navigation_items', 'footer_links', 'categories', 'automations',
    'social_packages', 'package_features', 'social_page_services',
    'social_page_steps', 'faqs', 'card_products', 'card_price_tiers',
    'social_links', 'clients', 'orders', 'reply_templates',
    'contact_messages', 'media_assets'
  ]
  loop
    execute format('drop trigger if exists touch_%1$s on public.%1$s', table_name);
    execute format(
      'create trigger touch_%1$s before update on public.%1$s
       for each row execute function public.touch_updated_at()',
      table_name
    );
  end loop;
end;
$$;

-- -----------------------------------------------------------------------------
-- Storage bucket for admin uploads
-- -----------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do nothing;

-- -----------------------------------------------------------------------------
-- Realtime: the orders sheet subscribes to this table
-- -----------------------------------------------------------------------------

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'orders'
  ) then
    alter publication supabase_realtime add table public.orders;
  end if;
end;
$$;
