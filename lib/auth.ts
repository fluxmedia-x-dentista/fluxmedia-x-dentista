import "server-only";

import { createAdminSupabase } from "@/lib/supabase/admin";
import { createServerSupabase } from "@/lib/supabase/server";
import type { AdminRole } from "@/lib/types";

export type AdminSession = {
  userId: string;
  email: string;
  role: AdminRole;
};

/**
 * Resolves the signed-in admin for the current request.
 * Returns null when there is no session, or when the authenticated user has
 * no active row in `admin_users`.
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const supabase = createServerSupabase();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const service = createAdminSupabase();
  const client = service ?? supabase;

  const { data, error } = await client
    .from("admin_users")
    .select("role, active, email")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !data || data.active === false) return null;

  return {
    userId: user.id,
    email: data.email ?? user.email ?? "",
    role: (data.role as AdminRole) ?? "editor",
  };
}

/** True when the role may manage admins and global settings. */
export function isOwner(role: AdminRole | undefined | null): boolean {
  return role === "owner";
}

/** Resources only the owner can touch. */
export const OWNER_ONLY_RESOURCES = ["admin_users", "site_settings"] as const;

export type Permission =
  | "content.write"
  | "orders.write"
  | "orders.delete"
  | "users.manage"
  | "settings.write";

export function can(role: AdminRole, permission: Permission): boolean {
  if (role === "owner") return true;
  switch (permission) {
    case "content.write":
    case "orders.write":
      return true;
    case "orders.delete":
    case "users.manage":
    case "settings.write":
      return false;
    default:
      return false;
  }
}
