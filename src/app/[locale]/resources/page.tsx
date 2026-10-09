import type { Metadata } from "next";
import { Calculator, CalendarDays, Clock, Download, FileText, PlayCircle, Receipt } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { QuarterlyTaxCalculator } from "@/components/resources/quarterly-tax-calculator";
import { SalesTaxCalculator } from "@/components/resources/sales-tax-calculator";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { images } from "@/data/images";
import { guides, webinars } from "@/data/resources";
import { Link } from "@/i18n/navigation";
import { formatDate, pick, resolveLocale } from "@/lib/i18n";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/resources">): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "resources" });
  return buildMetadata({ locale, path: "/resources", title: t("heading"), description: t("intro") });
}

export default async function ResourcesPage({ params }: PageProps<"/[locale]/resources">) {
  const locale = resolveLocale((await params).locale);
  const [t, c, home] = await Promise.all([
    getTranslations({ locale, namespace: "resources" }),
    getTranslations({ locale, namespace: "common" }),
    getTranslations({ locale, namespace: "home" }),
  ]);
  const crumbs = [
    { name: c("home"), path: "/" },
    { name: t("title"), path: "/resources" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, crumbs)} />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("heading")}
        intro={t("intro")}
        breadcrumbs={crumbs}
        breadcrumbLabel={c("breadcrumb")}
        image={images.calculator}
      />

      <Section id="calculators" labelledBy="calculators-title">
        <SectionHeading id="calculators-title" title={t("calculatorsTitle")} text={t("calculatorsText")} />
        <div className="mt-12 space-y-8">
          <article
            aria-labelledby="sales-tax-title"
            className="rounded-3xl border border-border bg-white p-6 shadow-[0_1px_2px_rgba(11,31,58,0.04)] sm:p-10"
          >
            <div className="mb-8 flex items-start gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-700">
                <Receipt className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 id="sales-tax-title" className="text-xl font-semibold text-navy-950">
                  {t("salesTax.title")}
                </h3>
                <p className="mt-1 text-muted-foreground">{t("salesTax.description")}</p>
              </div>
            </div>
            <SalesTaxCalculator />
          </article>
          <article
            aria-labelledby="quarterly-title"
            className="rounded-3xl border border-border bg-white p-6 shadow-[0_1px_2px_rgba(11,31,58,0.04)] sm:p-10"
          >
            <div className="mb-8 flex items-start gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-700">
                <Calculator className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 id="quarterly-title" className="text-xl font-semibold text-navy-950">
                  {t("quarterly.title")}
                </h3>
                <p className="mt-1 text-muted-foreground">{t("quarterly.description")}</p>
              </div>
            </div>
            <QuarterlyTaxCalculator />
          </article>
        </div>
      </Section>

      <Section id="guides" tone="muted" labelledBy="guides-title">
        <SectionHeading id="guides-title" title={t("guidesTitle")} text={t("guidesText")} />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-navy-50 text-navy-800">
                    <FileText className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-semibold tracking-[0.14em] text-gold-700 uppercase">
                    {pick(guide.category, locale)}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-navy-950">{pick(guide.title, locale)}</h3>
                <p className="mt-2 flex-1 leading-7 text-muted-foreground">{pick(guide.description, locale)}</p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="text-sm text-muted-foreground">
                    PDF · {t("pages", { count: guide.pages })}
                  </span>
                  <Button asChild variant="outline">
                    <a href={guide.file} download>
                      <Download aria-hidden="true" />
                      {c("download")}
                      <span className="sr-only">: {pick(guide.title, locale)}</span>
                    </a>
                  </Button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="webinars" labelledBy="webinars-title">
        <SectionHeading id="webinars-title" title={t("webinarsTitle")} text={t("webinarsText")} />
        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {webinars.map((webinar) => (
            <li key={webinar.slug}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-white p-6">
                <span
                  className={
                    webinar.upcoming
                      ? "w-fit rounded-full bg-gold-50 px-3 py-1 text-xs font-semibold text-gold-800"
                      : "w-fit rounded-full bg-navy-50 px-3 py-1 text-xs font-semibold text-navy-800"
                  }
                >
                  {webinar.upcoming ? t("upcoming") : t("onDemand")}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-navy-950">{pick(webinar.title, locale)}</h3>
                <p className="mt-2 flex-1 leading-7 text-muted-foreground">{pick(webinar.description, locale)}</p>
                <ul className="mt-5 space-y-1.5 text-sm text-navy-800">
                  <li className="flex items-center gap-2">
                    <CalendarDays className="size-4 text-gold-600" aria-hidden="true" />
                    <time dateTime={webinar.date}>{formatDate(webinar.date, locale, { dateStyle: "long" })}</time>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="size-4 text-gold-600" aria-hidden="true" />
                    {webinar.duration} min · {webinar.presenter}
                  </li>
                </ul>
                <Button asChild variant={webinar.upcoming ? "default" : "outline"} className="mt-6 w-full">
                  <Link href={webinar.upcoming ? "/contact" : "/insights"}>
                    {webinar.upcoming ? <CalendarDays aria-hidden="true" /> : <PlayCircle aria-hidden="true" />}
                    {webinar.upcoming ? c("register") : c("watch")}
                    <span className="sr-only">: {pick(webinar.title, locale)}</span>
                  </Link>
                </Button>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title={home("ctaTitle")}
        text={home("ctaText")}
        primary={{ label: home("ctaPrimary"), href: "/contact" }}
      />
    </>
  );
}
