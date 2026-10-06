import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

import {
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
  isSupabaseConfigured,
} from "@/lib/supabase/env";

/**
 * Request-scoped Supabase client using the public anon key.
 * Row Level Security decides what is readable - public pages only ever see
 * active/visible content rows.
 */
export function createServerSupabase() {
  if (!isSupabaseConfigured()) return null;

  const cookieStore = cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          // Called from a Server Component: the middleware refreshes cookies.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options, maxAge: 0 });
        } catch {
          // Called from a Server Component: ignore.
        }
      },
    },
  });
}
