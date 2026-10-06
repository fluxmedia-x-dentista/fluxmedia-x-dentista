-- =============================================================================
-- FLUXMEDIA x DENTISTA - row level security
-- Run after supabase/schema.sql. Safe to re-run.
--
-- Rules
--   * Public (anon) may READ only what the website renders.
--   * Orders, order events, clients and contact messages are NEVER readable
--     by anon: they are written through API routes that use the service role.
--   * Writing anything requires an active row in admin_users.
--   * Owner-only: admin_users and site_settings writes, order deletes.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Enable RLS everywhere
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
    'social_links', 'clients', 'orders', 'order_events', 'reply_templates',
    'contact_messages', 'media_assets'
  ]
  loop
    execute format('alter table public.%I enable row level security', table_name);
  end loop;
end;
$$;

-- -----------------------------------------------------------------------------
-- Public catalog tables: read for everyone, write for admins
-- -----------------------------------------------------------------------------

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'site_content', 'site_settings', 'home_sections', 'navigation_items',
    'footer_links', 'categories', 'automations', 'social_packages',
    'package_features', 'social_page_services', 'social_page_steps',
    'faqs', 'card_products', 'card_price_tiers', 'social_links', 'media_assets'
  ]
  loop
    execute format('drop policy if exists "%1$s_read" on public.%1$s', table_name);
    execute format(
      'create policy "%1$s_read" on public.%1$s for select using (true)',
      table_name
    );

    execute format('drop policy if exists "%1$s_write" on public.%1$s', table_name);
    execute format(
      'create policy "%1$s_write" on public.%1$s for all to authenticated
       using (public.is_admin()) with check (public.is_admin())',
      table_name
    );
  end loop;
end;
$$;

-- site_settings may only be changed by an owner.
drop policy if exists "site_settings_write" on public.site_settings;
create policy "site_settings_write" on public.site_settings
  for all to authenticated
  using (public.is_owner())
  with check (public.is_owner());

-- -----------------------------------------------------------------------------
-- Private tables: admins only, never anon
-- -----------------------------------------------------------------------------

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'clients', 'orders', 'order_events', 'reply_templates', 'contact_messages'
  ]
  loop
    execute format('drop policy if exists "%1$s_read" on public.%1$s', table_name);
    execute format(
      'create policy "%1$s_read" on public.%1$s for select to authenticated
       using (public.is_admin())',
      table_name
    );

    execute format('drop policy if exists "%1$s_insert" on public.%1$s', table_name);
    execute format(
      'create policy "%1$s_insert" on public.%1$s for insert to authenticated
       with check (public.is_admin())',
      table_name
    );

    execute format('drop policy if exists "%1$s_update" on public.%1$s', table_name);
    execute format(
      'create policy "%1$s_update" on public.%1$s for update to authenticated
       using (public.is_admin()) with check (public.is_admin())',
      table_name
    );
  end loop;
end;
$$;

-- Deleting an order (and its timeline) is reserved for owners.
drop policy if exists "orders_delete" on public.orders;
create policy "orders_delete" on public.orders
  for delete to authenticated
  using (public.is_owner());

drop policy if exists "order_events_delete" on public.order_events;
create policy "order_events_delete" on public.order_events
  for delete to authenticated
  using (public.is_owner());

drop policy if exists "clients_delete" on public.clients;
create policy "clients_delete" on public.clients
  for delete to authenticated
  using (public.is_admin());

drop policy if exists "reply_templates_delete" on public.reply_templates;
create policy "reply_templates_delete" on public.reply_templates
  for delete to authenticated
  using (public.is_admin());

drop policy if exists "contact_messages_delete" on public.contact_messages;
create policy "contact_messages_delete" on public.contact_messages
  for delete to authenticated
  using (public.is_admin());

-- -----------------------------------------------------------------------------
-- admin_users: an admin can read the list, only an owner can change it
-- -----------------------------------------------------------------------------

drop policy if exists "admin_users_read" on public.admin_users;
create policy "admin_users_read" on public.admin_users
  for select to authenticated
  using (public.is_admin());

drop policy if exists "admin_users_write" on public.admin_users;
create policy "admin_users_write" on public.admin_users
  for all to authenticated
  using (public.is_owner())
  with check (public.is_owner());

-- -----------------------------------------------------------------------------
-- Storage: public read, admin write
-- -----------------------------------------------------------------------------

drop policy if exists "site_media_read" on storage.objects;
create policy "site_media_read" on storage.objects
  for select
  using (bucket_id = 'site-media');

drop policy if exists "site_media_write" on storage.objects;
create policy "site_media_write" on storage.objects
  for all to authenticated
  using (bucket_id = 'site-media' and public.is_admin())
  with check (bucket_id = 'site-media' and public.is_admin());
