import { getTranslations } from "next-intl/server";
import type { BrowserPost } from "@/components/insights/insights-browser";
import { insightCategories } from "@/data/insights";
import { getTeamMember } from "@/data/team";
import type { Locale } from "@/i18n/routing";
import { formatDate, pick } from "./i18n";
import type { InsightMeta } from "./insights";

export async function toCardData(posts: InsightMeta[], locale: Locale): Promise<BrowserPost[]> {
  const c = await getTranslations({ locale, namespace: "common" });
  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    image: post.image,
    category: post.category,
    categoryLabel: pick(insightCategories[post.category], locale),
    date: post.date,
    dateLabel: formatDate(post.date, locale),
    readingLabel: c("minRead", { minutes: post.readingMinutes }),
    authorName: getTeamMember(post.author)?.name ?? "Northline Advisory",
  }));
}
