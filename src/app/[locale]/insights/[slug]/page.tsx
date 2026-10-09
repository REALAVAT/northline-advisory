import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getTranslations } from "next-intl/server";
import remarkGfm from "remark-gfm";
import { InsightCard } from "@/components/insights/insight-card";
import { mdxComponents } from "@/components/insights/mdx-components";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { insightCategories } from "@/data/insights";
import { getTeamMember } from "@/data/team";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { formatDate, pick, resolveLocale } from "@/lib/i18n";
import { toCardData } from "@/lib/insight-cards";
import { getInsight, getInsightSlugs, getRelatedInsights } from "@/lib/insights";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export const instant = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getInsightSlugs(locale).map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: PageProps<"/[locale]/insights/[slug]">): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = resolveLocale(raw);
  const post = getInsight(locale, slug);
  if (!post) return {};
  const author = getTeamMember(post.author);
  return buildMetadata({
    locale,
    path: `/insights/${post.slug}`,
    title: post.title,
    description: post.description,
    type: "article",
    publishedTime: post.date,
    authors: author ? [author.name] : undefined,
  });
}

export default async function InsightPage({ params }: PageProps<"/[locale]/insights/[slug]">) {
  const { locale: raw, slug } = await params;
  const locale = resolveLocale(raw);
  const post = getInsight(locale, slug);
  if (!post) notFound();

  const [t, c, home] = await Promise.all([
    getTranslations({ locale, namespace: "insights" }),
    getTranslations({ locale, namespace: "common" }),
    getTranslations({ locale, namespace: "home" }),
  ]);
  const author = getTeamMember(post.author);
  const path = `/insights/${post.slug}`;
  const crumbs = [
    { name: c("home"), path: "/" },
    { name: t("title"), path: "/insights" },
    { name: post.title, path },
  ];
  const related = await toCardData(getRelatedInsights(post), locale);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, crumbs)} />
      <JsonLd
        data={articleJsonLd({
          locale,
          path,
          title: post.title,
          description: post.description,
          image: post.image,
          datePublished: post.date,
          dateModified: post.updated,
          authorName: author?.name ?? "Northline Advisory",
          authorPath: author ? `/team/${author.slug}` : "/team",
          keywords: post.tags,
        })}
      />

      <article>
        <header className="border-b border-border bg-navy-50/60">
          <div className="container-page py-12 lg:py-16">
            <div className="mx-auto max-w-3xl">
              <Breadcrumbs items={crumbs} label={c("breadcrumb")} />
              <p className="mt-10 text-xs font-semibold tracking-[0.14em] text-gold-700 uppercase">
                {pick(insightCategories[post.category], locale)}
              </p>
              <h1 className="mt-3 text-4xl leading-tight font-semibold text-navy-950 sm:text-5xl">{post.title}</h1>
              <p className="mt-5 text-xl leading-8 text-navy-700">{post.description}</p>
              <div className="mt-8 flex items-center gap-4">
                {author ? (
                  <Image
                    src={author.image}
                    alt=""
                    width={48}
                    height={48}
                    className="size-12 rounded-full object-cover"
                  />
                ) : null}
                <div className="text-sm">
                  {author ? (
                    <Link href={`/team/${author.slug}`} className="font-semibold text-navy-950 hover:underline">
                      {author.name}
                    </Link>
                  ) : null}
                  <p className="text-muted-foreground">
                    <span className="sr-only">{t("published")}: </span>
                    <time dateTime={post.date}>{formatDate(post.date, locale, { dateStyle: "long" })}</time>
                    <span aria-hidden="true"> · </span>
                    {c("minRead", { minutes: post.readingMinutes })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container-page py-12 lg:py-16">
          <div className="relative mx-auto aspect-[2/1] max-w-4xl overflow-hidden rounded-3xl bg-navy-100">
            <Image src={post.image} alt="" fill preload sizes="(min-width: 1024px) 56rem, 100vw" className="object-cover" />
          </div>
          <div className="prose-northline mx-auto mt-12 max-w-3xl">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>

          <footer className="mx-auto mt-12 max-w-3xl space-y-8">
            <div>
              <h2 className="text-sm font-semibold text-navy-950">{t("tags")}</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li key={tag} className="rounded-full bg-navy-50 px-3 py-1 text-sm text-navy-800">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
            {author ? (
              <section aria-labelledby="author-title" className="flex flex-col gap-5 rounded-2xl border border-border bg-white p-6 sm:flex-row">
                <Image src={author.image} alt="" width={80} height={80} className="size-20 rounded-2xl object-cover" />
                <div>
                  <h2 id="author-title" className="text-xs font-semibold tracking-[0.14em] text-gold-700 uppercase">
                    {t("aboutAuthor")}
                  </h2>
                  <p className="mt-2 text-lg font-semibold text-navy-950">
                    <Link href={`/team/${author.slug}`} className="hover:underline">
                      {author.name}
                    </Link>
                  </p>
                  <p className="text-sm text-muted-foreground">{pick(author.role, locale)}</p>
                  <p className="mt-3 leading-7 text-navy-800">{pick(author.shortBio, locale)}</p>
                </div>
              </section>
            ) : null}
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-sm font-medium text-navy-700 hover:text-navy-950"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {t("backToInsights")}
            </Link>
          </footer>
        </div>
      </article>

      {related.length > 0 ? (
        <section aria-labelledby="related-title" className="bg-navy-50/60 py-16 sm:py-20">
          <div className="container-page">
            <h2 id="related-title" className="text-2xl font-semibold text-navy-950 sm:text-3xl">
              {t("related")}
            </h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <InsightCard post={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand
        title={home("ctaTitle")}
        text={home("ctaText")}
        primary={{ label: home("ctaPrimary"), href: "/contact" }}
      />
    </>
  );
}
