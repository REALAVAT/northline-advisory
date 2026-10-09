import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { InsightCard } from "@/components/insights/insight-card";
import { InsightsBrowser } from "@/components/insights/insights-browser";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { insightCategories, insightCategoryKeys } from "@/data/insights";
import { pick, resolveLocale } from "@/lib/i18n";
import { toCardData } from "@/lib/insight-cards";
import { getInsights } from "@/lib/insights";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/insights">): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "insights" });
  return buildMetadata({ locale, path: "/insights", title: t("title"), description: t("intro") });
}

export default async function InsightsPage({ params }: PageProps<"/[locale]/insights">) {
  const locale = resolveLocale((await params).locale);
  const [t, c, home] = await Promise.all([
    getTranslations({ locale, namespace: "insights" }),
    getTranslations({ locale, namespace: "common" }),
    getTranslations({ locale, namespace: "home" }),
  ]);
  const crumbs = [
    { name: c("home"), path: "/" },
    { name: t("title"), path: "/insights" },
  ];
  const posts = await toCardData(getInsights(locale), locale);
  const featured = posts[0];
  const rest = posts.slice(1);
  const categories = insightCategoryKeys
    .filter((key) => rest.some((post) => post.category === key))
    .map((key) => ({ key, label: pick(insightCategories[key], locale) }));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, crumbs)} />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("heading")}
        intro={t("intro")}
        breadcrumbs={crumbs}
        breadcrumbLabel={c("breadcrumb")}
      />
      <Section>
        {featured ? (
          <div className="mb-14">
            <h2 className="eyebrow mb-4">{t("featured")}</h2>
            <InsightCard post={featured} featured priority />
          </div>
        ) : null}
        <h2 className="sr-only">{t("title")}</h2>
        <InsightsBrowser posts={rest} categories={categories} />
      </Section>
      <CtaBand
        title={home("ctaTitle")}
        text={home("ctaText")}
        primary={{ label: home("ctaPrimary"), href: "/contact" }}
      />
    </>
  );
}
