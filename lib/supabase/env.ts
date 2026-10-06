/**
 * Central place for Supabase environment configuration.
 *
 * When the keys are missing the app must not crash: public pages fall back to
 * the bundled seed content and the admin renders the "Connect Supabase"
 * setup screen (see components/setup-notice.tsx and app/admin).
 */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const MEDIA_BUCKET = "site-media";

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}
