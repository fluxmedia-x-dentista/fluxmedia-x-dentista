import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { SUPABASE_URL } from "@/lib/supabase/env";

/**
 * Read here rather than in lib/supabase/env.ts: that module is also imported
 * by the browser client, and the service-role key must never appear anywhere
 * in a client bundle - not even as a `process.env` lookup.
 */
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

function hasServiceRole(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}

let cached: SupabaseClient | null = null;

/**
 * Service-role client. Bypasses RLS, so it must only ever be used inside
 * route handlers / server actions that have already verified the admin
 * session and role. Never import this file from a client component.
 */
export function createAdminSupabase(): SupabaseClient | null {
  if (!hasServiceRole()) return null;
  if (cached) return cached;

  cached = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
