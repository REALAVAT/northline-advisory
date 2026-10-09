import type { MetadataRoute } from "next";
import { industries } from "@/data/industries";
import { serviceSlugs } from "@/data/services";
import { team } from "@/data/team";
import { routing } from "@/i18n/routing";
import { getInsights } from "@/lib/insights";
import { languageAlternates, localizedPath } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const CONTENT_UPDATED = "2026-10-01";

interface Entry {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastModified?: string;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Entry[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    ...serviceSlugs.map((slug) => ({ path: `/services/${slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
    { path: "/industries", priority: 0.7, changeFrequency: "monthly" },
    ...industries.map((item) => ({ path: `/industries/${item.slug}`, priority: 0.7, changeFrequency: "monthly" as const })),
    { path: "/about", priority: 0.6, changeFrequency: "yearly" },
    { path: "/team", priority: 0.6, changeFrequency: "monthly" },
    ...team.map((member) => ({ path: `/team/${member.slug}`, priority: 0.5, changeFrequency: "yearly" as const })),
    { path: "/insights", priority: 0.8, changeFrequency: "weekly" },
    ...getInsights(routing.defaultLocale).map((post) => ({
      path: `/insights/${post.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
      lastModified: post.updated ?? post.date,
    })),
    { path: "/resources", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
    { path: "/locations", priority: 0.5, changeFrequency: "yearly" },
  ];

  return entries.flatMap((entry) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(localizedPath(locale, entry.path)),
      lastModified: entry.lastModified ?? CONTENT_UPDATED,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: { languages: languageAlternates(entry.path) },
    })),
  );
}
