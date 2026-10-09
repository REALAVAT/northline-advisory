import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { PriceTag, ServiceCard } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { FaqList } from "@/components/site/faq-list";
import { Icon } from "@/components/site/icon";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { getService, getServices, services } from "@/data/services";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { formatCurrency, pick, resolveLocale } from "@/lib/i18n";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { getPriceLabels } from "@/lib/labels";
import { buildMetadata } from "@/lib/seo";

export const instant = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    services.map((service) => ({ locale, slug: service.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/services/[slug]">): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = resolveLocale(raw);
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    locale,
    path: `/services/${service.slug}`,
    title: pick(service.title, locale),
    description: pick(service.summary, locale),
  });
}

export default async function ServicePage({ params }: PageProps<"/[locale]/services/[slug]">) {
  const { locale: raw, slug } = await params;
  const locale = resolveLocale(raw);
  const service = getService(slug);
  if (!service) notFound();

  const [t, c, priceLabels] = await Promise.all([
    getTranslations({ locale, namespace: "services" }),
    getTranslations({ locale, namespace: "common" }),
    getPriceLabels(locale),
  ]);
  const title = pick(service.title, locale);
  const path = `/services/${service.slug}`;
  const crumbs = [
    { name: c("home"), path: "/" },
    { name: t("title"), path: "/services" },
    { name: title, path },
  ];
  const related = getServices(service.related);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, crumbs)} />
      <JsonLd data={faqJsonLd(locale, service.faqs)} />
      <JsonLd
        data={serviceJsonLd({
          locale,
          path,
          name: title,
          description: pick(service.summary, locale),
          price: service.priceFrom,
        })}
      />

      <PageHero
        eyebrow={t("eyebrow")}
        title={title}
        intro={pick(service.summary, locale)}
        breadcrumbs={crumbs}
        breadcrumbLabel={c("breadcrumb")}
        image={service.image}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button asChild variant="gold" size="xl">
            <Link href={`/contact?service=${service.slug}`}>
              {c("bookConsultation")}
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <p className="text-navy-100">
            {t("startingAt")}{" "}
            <span className="text-xl font-semibold text-white">
              {formatCurrency(service.priceFrom, locale)}
            </span>
            <span className="text-sm">
              {service.priceUnit === "project" ? ` ${priceLabels.units.project}` : priceLabels.units[service.priceUnit]}
            </span>
          </p>
        </div>
      </PageHero>

      <Section labelledBy="overview-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="overview-title" className="text-2xl font-semibold text-navy-950 sm:text-3xl">
              {t("overview")}
            </h2>
            <div className="mt-5 space-y-5 text-lg leading-8 text-navy-800">
              {pick(service.overview, locale).map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <h2 className="mt-12 text-2xl font-semibold text-navy-950 sm:text-3xl">{t("included")}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {pick(service.included, locale).map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-border bg-white p-4">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-navy-900 text-gold-300">
                    <Check className="size-3" aria-hidden="true" />
                  </span>
                  <span className="text-[0.95rem] leading-6 text-navy-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <aside className="lg:col-span-5">
            <div className="sticky top-24 space-y-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy-100">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="rounded-2xl border border-border bg-white p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-navy-900 text-gold-300">
                    <Icon name={service.icon} className="size-5" />
                  </span>
                  <h2 className="text-lg font-semibold text-navy-950">{t("pricing")}</h2>
                </div>
                <PriceTag
                  amount={service.priceFrom}
                  unit={service.priceUnit}
                  locale={locale}
                  labels={priceLabels}
                  className="mt-4 text-2xl"
                />
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{t("pricingNote")}</p>
                <h3 className="mt-6 text-sm font-semibold text-navy-950">{t("idealFor")}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {pick(service.idealFor, locale).map((item) => (
                    <li key={item} className="rounded-full bg-navy-50 px-3 py-1 text-sm text-navy-800">
                      {item}
                    </li>
                  ))}
                </ul>
                <Button asChild size="xl" className="mt-6 w-full">
                  <Link href={`/contact?service=${service.slug}`}>{c("bookConsultation")}</Link>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="muted" labelledBy="process-title">
        <h2 id="process-title" className="text-2xl font-semibold text-navy-950 sm:text-3xl">
          {t("process")}
        </h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {service.process.map((step, index) => (
            <li key={index} className="relative rounded-2xl border border-border bg-white p-6">
              <span className="text-sm font-semibold text-gold-700">{t("step", { number: index + 1 })}</span>
              <h3 className="mt-2 text-lg font-semibold text-navy-950">{pick(step.title, locale)}</h3>
              <p className="mt-2 leading-7 text-muted-foreground">{pick(step.text, locale)}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="service-faq">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="service-faq" className="text-2xl font-semibold text-navy-950 sm:text-3xl">
              {c("faq")}
            </h2>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={service.faqs} locale={locale} />
          </div>
        </div>
      </Section>

      <Section tone="muted" labelledBy="related-title">
        <h2 id="related-title" className="text-2xl font-semibold text-navy-950 sm:text-3xl">
          {t("related")}
        </h2>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <li key={item.slug}>
              <ServiceCard service={item} locale={locale} labels={priceLabels} learnMore={c("learnMore")} />
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title={t("ctaTitle")}
        text={t("ctaText")}
        primary={{ label: c("bookConsultation"), href: `/contact?service=${service.slug}` }}
      />
    </>
  );
}
