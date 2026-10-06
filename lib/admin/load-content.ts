import "server-only";

import { REGISTRY_DEFAULTS } from "@/lib/content/registry";
import { createAdminSupabase } from "@/lib/supabase/admin";
import type { ContentDictionary, ContentValue } from "@/lib/types";

/**
 * Uncached read of `site_content` for the admin editors: the panel must always
 * show the latest saved values, never a cached public snapshot.
 */
export async function loadAdminContent(): Promise<ContentDictionary> {
  const merged: ContentDictionary = { ...REGISTRY_DEFAULTS };

  const supabase = createAdminSupabase();
  if (!supabase) return merged;

  const { data, error } = await supabase
    .from("site_content")
    .select("key, value");
  if (error || !data) return merged;

  for (const row of data as { key: string; value: ContentValue }[]) {
    if (row.value !== null && row.value !== undefined)
      merged[row.key] = row.value;
  }
  return merged;
}
