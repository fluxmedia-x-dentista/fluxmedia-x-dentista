import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import {
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
  isSupabaseConfigured,
} from "@/lib/supabase/env";

let cached: SupabaseClient | null = null;

/**
 * Cookie-less anon client used for cached public reads.
 * (The cookie-aware client in server.ts cannot be used inside
 * `unstable_cache`, which must not touch request-scoped data.)
 */
export function createPublicSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (cached) return cached;
  cached = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
