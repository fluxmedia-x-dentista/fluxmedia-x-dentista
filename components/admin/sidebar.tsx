"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Calendar,
  ChevronDown,
  CircleUser,
  ClipboardList,
  CreditCard,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Inbox,
  Layers,
  LayoutDashboard,
  Link2,
  ListTree,
  MessageSquare,
  PanelsTopLeft,
  Settings,
  Shapes,
  TrendingUp,
  Users,
  Users2,
  Wand2,
  type LucideIcon,
} from "lucide-react";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

export type NavLeaf = {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
};

export type NavGroup = {
  key: string;
  label: string;
  icon: LucideIcon;
  children: NavLeaf[];
};

export const SOCIAL_CHILDREN: NavLeaf[] = [
  { href: "/admin/social", label: "Overview", icon: BarChart3 },
  { href: "/admin/social/page-content", label: "Page Content", icon: FileText },
  { href: "/admin/social/packages", label: "Packages", icon: Layers },
  { href: "/admin/social/clients", label: "Clients", icon: Users2 },
  { href: "/admin/social/content", label: "Content", icon: ImageIcon },
  { href: "/admin/social/calendar", label: "Calendar", icon: Calendar },
  { href: "/admin/social/inbox", label: "Inbox", icon: Inbox },
  { href: "/admin/social/analytics", label: "Analytics", icon: TrendingUp },
  { href: "/admin/social/reports", label: "Reports", icon: FileText },
  {
    href: "/admin/social/accounts",
    label: "Social Accounts",
    icon: CircleUser,
  },
];

export const PAGES_CHILDREN: NavLeaf[] = [
  { href: "/admin/pages/home", label: "Home", icon: PanelsTopLeft },
  { href: "/admin/pages/about", label: "About", icon: FileText },
  { href: "/admin/pages/cards", label: "Cards page", icon: CreditCard },
  { href: "/admin/pages/automations", label: "Automations page", icon: Wand2 },
  { href: "/admin/pages/social", label: "Social page", icon: Users },
  {
    href: "/admin/pages/request-contact",
    label: "Request & Contact",
    icon: MessageSquare,
  },
  { href: "/admin/pages/footer", label: "Footer", icon: ListTree },
  { href: "/admin/pages/navigation", label: "Navbar labels", icon: ListTree },
  { href: "/admin/pages/privacy", label: "Privacy", icon: FileText },
  { href: "/admin/pages/terms", label: "Terms", icon: FileText },
  { href: "/admin/pages/seo", label: "SEO", icon: TrendingUp },
  { href: "/admin/pages/ui", label: "Buttons & labels", icon: Shapes },
];

export function AdminSidebar({
  newOrders = 0,
  unreadMessages = 0,
  onNavigate,
}: {
  newOrders?: number;
  unreadMessages?: number;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const [socialOpen, setSocialOpen] = useState(
    pathname.startsWith("/admin/social"),
  );
  const [pagesOpen, setPagesOpen] = useState(
    pathname.startsWith("/admin/pages"),
  );

  const top: NavLeaf[] = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    {
      href: "/admin/orders",
      label: "Orders (Sheet)",
      icon: ClipboardList,
      badge: newOrders,
    },
    { href: "/admin/automations", label: "Automations", icon: Wand2 },
    { href: "/admin/categories", label: "Categories", icon: Shapes },
  ];

  const bottom: NavLeaf[] = [
    { href: "/admin/cards", label: "Cards", icon: CreditCard },
    { href: "/admin/social-links", label: "Social Links", icon: Link2 },
    {
      href: "/admin/messages",
      label: "Messages",
      icon: MessageSquare,
      badge: unreadMessages,
    },
    {
      href: "/admin/reply-templates",
      label: "Reply templates",
      icon: FileText,
    },
    { href: "/admin/media", label: "Media", icon: ImageIcon },
    { href: "/admin/navigation", label: "Navigation", icon: ListTree },
    { href: "/admin/users", label: "Users & roles", icon: Users2 },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname === href;

  const renderLeaf = (item: NavLeaf) => {
    const Icon = item.icon;
    return (
      <li key={item.href}>
        <Link
          href={item.href}
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
            isActive(item.href)
              ? "bg-surface2 text-ink"
              : "text-muted hover:bg-surface2/60 hover:text-ink",
          )}
        >
          <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge ? (
            <span className="rounded-full bg-brand px-1.5 py-0.5 text-[10px] font-bold text-white">
              {item.badge}
            </span>
          ) : null}
        </Link>
      </li>
    );
  };

  const renderGroup = (
    label: string,
    Icon: LucideIcon,
    open: boolean,
    setOpen: (open: boolean) => void,
    children: NavLeaf[],
    prefix: string,
  ) => (
    <li>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className={cn(
          "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
          pathname.startsWith(prefix)
            ? "text-ink"
            : "text-muted hover:bg-surface2/60 hover:text-ink",
        )}
      >
        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="flex-1 text-start">{label}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open ? (
        <ul className="ms-4 mt-1 space-y-0.5 border-s border-line/15 ps-3">
          {children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                onClick={onNavigate}
                className={cn(
                  "block rounded-lg px-2.5 py-2 text-[13px] transition-colors",
                  pathname === child.href
                    ? "bg-brand/15 text-sky"
                    : "text-muted hover:bg-surface2/60 hover:text-ink",
                )}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center border-b border-line/10 px-4">
        <Logo size={30} href="/admin" />
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-0.5">
          {top.map(renderLeaf)}
          {renderGroup(
            "Social Media",
            Users,
            socialOpen,
            setSocialOpen,
            SOCIAL_CHILDREN,
            "/admin/social",
          )}
          {renderLeaf(bottom[0])}
          {renderGroup(
            "Pages",
            PanelsTopLeft,
            pagesOpen,
            setPagesOpen,
            PAGES_CHILDREN,
            "/admin/pages",
          )}
          {bottom.slice(1).map(renderLeaf)}
        </ul>
      </nav>

      <div className="shrink-0 border-t border-line/10 p-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface2/60 hover:text-ink"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          View website
        </a>
      </div>
    </div>
  );
}
