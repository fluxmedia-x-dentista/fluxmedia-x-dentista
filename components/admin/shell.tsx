"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight, LogOut, Menu, X } from "lucide-react";

import { AdminSidebar } from "@/components/admin/sidebar";
import { useToast } from "@/components/admin/toast";
import { ThemeToggle } from "@/components/theme-toggle";
import { createBrowserSupabase } from "@/lib/supabase/browser";
import type { AdminRole } from "@/lib/types";
import { cn } from "@/lib/utils";

const CRUMB_LABELS: Record<string, string> = {
  admin: "Dashboard",
  orders: "Orders",
  automations: "Automations",
  categories: "Categories",
  social: "Social Media",
  "page-content": "Page Content",
  packages: "Packages",
  clients: "Clients",
  content: "Content",
  calendar: "Calendar",
  inbox: "Inbox",
  analytics: "Analytics",
  reports: "Reports",
  accounts: "Social Accounts",
  cards: "Cards",
  pages: "Pages",
  home: "Home",
  about: "About",
  "request-contact": "Request & Contact",
  footer: "Footer",
  navigation: "Navigation",
  privacy: "Privacy",
  terms: "Terms",
  seo: "SEO",
  ui: "Buttons & labels",
  "social-links": "Social Links",
  messages: "Messages",
  "reply-templates": "Reply templates",
  media: "Media",
  users: "Users & roles",
  settings: "Settings",
  new: "New",
};

function crumbLabel(segment: string): string {
  return (
    CRUMB_LABELS[segment] ??
    segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase())
  );
}

export function AdminShell({
  children,
  email,
  role,
  newOrders,
  unreadMessages,
}: {
  children: ReactNode;
  email: string;
  role: AdminRole;
  newOrders: number;
  unreadMessages: number;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const toast = useToast();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((segment, index) => ({
    label: crumbLabel(segment),
    href: `/${segments.slice(0, index + 1).join("/")}`,
  }));

  async function signOut() {
    setSigningOut(true);
    try {
      const supabase = createBrowserSupabase();
      await supabase?.auth.signOut();
      router.replace("/admin/login");
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
      setSigningOut(false);
    }
  }

  return (
    <div dir="ltr" className="min-h-screen bg-bg text-ink">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-line/10 bg-surface/50 backdrop-blur-xl lg:block">
        <AdminSidebar newOrders={newOrders} unreadMessages={unreadMessages} />
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/60"
          />
          <aside className="absolute inset-y-0 left-0 w-64 border-r border-line/10 bg-surface">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-4 rounded-lg p-1.5 text-muted hover:text-ink"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
            <AdminSidebar
              newOrders={newOrders}
              unreadMessages={unreadMessages}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      ) : null}

      <div className="lg:ps-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line/10 bg-bg/80 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-muted hover:bg-surface2 hover:text-ink lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4.5 w-4.5" />
          </button>

          <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
            <ol className="flex items-center gap-1 text-[13px] text-muted">
              {crumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-1">
                  {index > 0 ? (
                    <ChevronRight className="h-3.5 w-3.5 opacity-50" />
                  ) : null}
                  {index === crumbs.length - 1 ? (
                    <span className="truncate font-semibold text-ink">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link href={crumb.href} className="truncate hover:text-ink">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-2 rounded-full border border-line/20 bg-surface/60 px-3 py-1.5 text-[12px] sm:inline-flex">
              <span className="max-w-[160px] truncate text-muted">{email}</span>
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase",
                  role === "owner"
                    ? "bg-violet/20 text-violet"
                    : "bg-surface2 text-muted",
                )}
              >
                {role}
              </span>
            </span>
            <ThemeToggle />
            <button
              type="button"
              onClick={signOut}
              disabled={signingOut}
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line/20 bg-surface/60 px-3 text-[12.5px] font-semibold text-muted transition-colors hover:text-ink"
            >
              <LogOut className="h-3.5 w-3.5" />
              Log out
            </button>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
