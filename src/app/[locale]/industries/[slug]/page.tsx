import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CircleAlert, CircleCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { IndustryCard, ServiceCard } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { getIndustry, industries } from "@/data/industries";
import { getServices } from "@/data/services";
import { routing } from "@/i18n/routing";
import { pick, resolveLocale } from "@/lib/i18n";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { getPriceLabels } from "@/lib/labels";
import { buildMetadata } from "@/lib/seo";

export const instant = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    industries.map((industry) => ({ locale, slug: industry.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/industries/[slug]">): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = resolveLocale(raw);
  const industry = getIndustry(slug);
  if (!industry) return {};
  const t = await getTranslations({ locale, namespace: "industries" });
  return buildMetadata({
    locale,
    path: `/industries/${industry.slug}`,
    title: `${pick(industry.title, locale)} | ${t("title")}`,
    description: pick(industry.summary, locale),
  });
}

export default async function IndustryPage({ params }: PageProps<"/[locale]/industries/[slug]">) {
  const { locale: raw, slug } = await params;
  const locale = resolveLocale(raw);
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const [t, c, home, priceLabels] = await Promise.all([
    getTranslations({ locale, namespace: "industries" }),
    getTranslations({ locale, namespace: "common" }),
    getTranslations({ locale, namespace: "home" }),
    getPriceLabels(locale),
  ]);
  const title = pick(industry.title, locale);
  const crumbs = [
    { name: c("home"), path: "/" },
    { name: t("title"), path: "/industries" },
    { name: title, path: `/industries/${industry.slug}` },
  ];
  const others = industries.filter((item) => item.slug !== industry.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, crumbs)} />
      <PageHero
        eyebrow={t("eyebrow")}
        title={title}
        intro={pick(industry.summary, locale)}
        breadcrumbs={crumbs}
        breadcrumbLabel={c("breadcrumb")}
        image={industry.image}
      />

      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-xl leading-9 text-navy-800">{pick(industry.intro, locale)}</p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-white p-6">
                <h2 className="text-lg font-semibold text-navy-950">{t("challenges")}</h2>
                <ul className="mt-4 space-y-3">
                  {pick(industry.challenges, locale).map((item) => (
                    <li key={item} className="flex gap-3 leading-6 text-navy-800">
                      <CircleAlert className="mt-0.5 size-5 shrink-0 text-gold-600" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-navy-800 bg-navy-900 p-6 text-white">
                <h2 className="text-lg font-semibold">{t("howWeHelp")}</h2>
                <ul className="mt-4 space-y-3">
                  {pick(industry.solutions, locale).map((item) => (
                    <li key={item} className="flex gap-3 leading-6 text-navy-100">
                      <CircleCheck className="mt-0.5 size-5 shrink-0 text-gold-300" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <aside className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy-100">
              <Image src={industry.image} alt="" fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" />
            </div>
            <div className="mt-5 rounded-2xl border border-border bg-navy-50/60 p-6">
              <h2 className="text-lg font-semibold text-navy-950">{t("keyMetrics")}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {pick(industry.metrics, locale).map((metric) => (
                  <li key={metric} className="rounded-full border border-border bg-white px-3 py-1.5 text-sm font-medium text-navy-800">
                    {metric}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="muted" labelledBy="recommended-title">
        <h2 id="recommended-title" className="text-2xl font-semibold text-navy-950 sm:text-3xl">
          {t("recommended")}
        </h2>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {getServices(industry.services).map((service) => (
            <li key={service.slug}>
              <ServiceCard service={service} locale={locale} labels={priceLabels} learnMore={c("learnMore")} />
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="other-industries">
        <h2 id="other-industries" className="text-2xl font-semibold text-navy-950 sm:text-3xl">
          {home("industriesTitle")}
        </h2>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((item) => (
            <li key={item.slug}>
              <IndustryCard industry={item} locale={locale} />
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title={t("ctaTitle")}
        text={home("ctaText")}
        primary={{ label: c("bookConsultation"), href: "/contact" }}
      />
    </>
  );
}
