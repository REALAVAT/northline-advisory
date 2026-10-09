import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { images } from "@/data/images";
import { insightCategoryKeys, type InsightCategory } from "@/data/insights";
import type { Locale } from "@/i18n/routing";

const contentRoot = path.join(process.cwd(), "content", "insights");

export interface InsightMeta {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: InsightCategory;
  tags: string[];
  author: string;
  image: string;
  featured: boolean;
  readingMinutes: number;
}

export interface Insight extends InsightMeta {
  content: string;
}

type ImageKey = keyof typeof images;

function isCategory(value: unknown): value is InsightCategory {
  return typeof value === "string" && insightCategoryKeys.includes(value as InsightCategory);
}

function parseFile(locale: Locale, file: string): Insight {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(contentRoot, locale, file), "utf8");
  const { data, content } = matter(raw);

  if (!isCategory(data.category)) {
    throw new Error(`Invalid category in ${locale}/${file}`);
  }

  const imageKey = String(data.image) as ImageKey;

  return {
    slug,
    locale,
    title: String(data.title),
    description: String(data.description),
    date: String(data.date),
    updated: data.updated ? String(data.updated) : undefined,
    category: data.category,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    author: String(data.author),
    image: images[imageKey] ?? images.documents,
    featured: Boolean(data.featured),
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    content,
  };
}

const cache = new Map<Locale, Insight[]>();

function loadAll(locale: Locale): Insight[] {
  const cached = cache.get(locale);
  if (cached) return cached;
  const dir = path.join(contentRoot, locale);
  const posts = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => parseFile(locale, file))
    .sort((a, b) => b.date.localeCompare(a.date));
  cache.set(locale, posts);
  return posts;
}

function toMeta(post: Insight): InsightMeta {
  const { content: _content, ...meta } = post;
  void _content;
  return meta;
}

export function getInsights(locale: Locale): InsightMeta[] {
  return loadAll(locale).map(toMeta);
}

export function getInsight(locale: Locale, slug: string): Insight | undefined {
  return loadAll(locale).find((post) => post.slug === slug);
}

export function getInsightSlugs(locale: Locale) {
  return loadAll(locale).map((post) => post.slug);
}

export function getRelatedInsights(post: InsightMeta, limit = 3): InsightMeta[] {
  return getInsights(post.locale)
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      candidate,
      score:
        (candidate.category === post.category ? 3 : 0) +
        candidate.tags.filter((tag) => post.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score || b.candidate.date.localeCompare(a.candidate.date))
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}
