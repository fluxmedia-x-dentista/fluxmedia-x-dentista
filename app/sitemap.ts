import type { MetadataRoute } from "next";

import { getAutomations } from "@/lib/data/catalog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ).replace(/\/$/, "");
  const now = new Date();

  const staticRoutes = [
    "",
    "/automations",
    "/social-media",
    "/cards",
    "/request",
    "/about",
    "/social",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const automations = await getAutomations();
  const automationRoutes = automations.map((automation) => ({
    url: `${base}/automations/${automation.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...automationRoutes];
}
