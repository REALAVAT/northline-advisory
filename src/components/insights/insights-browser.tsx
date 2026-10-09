"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { InsightCard, type InsightCardData } from "./insight-card";

export interface BrowserPost extends InsightCardData {
  category: string;
}

export function InsightsBrowser({
  posts,
  categories,
}: {
  posts: BrowserPost[];
  categories: { key: string; label: string }[];
}) {
  const t = useTranslations("insights");
  const [active, setActive] = useState<string>("all");
  const visible = active === "all" ? posts : posts.filter((post) => post.category === active);
  const options = [{ key: "all", label: t("all") }, ...categories];

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div role="group" aria-label={t("filterLabel")} className="flex flex-wrap gap-2">
          {options.map((option) => (
            <button
              key={option.key}
              type="button"
              aria-pressed={active === option.key}
              onClick={() => setActive(option.key)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                active === option.key
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-border bg-white text-navy-700 hover:border-navy-300 hover:text-navy-950",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {t("count", { count: visible.length })}
        </p>
      </div>
      {visible.length > 0 ? (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <li key={post.slug}>
              <InsightCard post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-muted-foreground">{t("noResults")}</p>
      )}
    </div>
  );
}
