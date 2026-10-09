import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ServiceCard } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { FaqList } from "@/components/site/faq-list";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Section, SectionHeading } from "@/components/site/section";
import { generalFaqs } from "@/data/faqs";
import { images } from "@/data/images";
import { services } from "@/data/services";
import { resolveLocale } from "@/lib/i18n";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { getPriceLabels } from "@/lib/labels";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/services">): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "services" });
  return buildMetadata({ locale, path: "/services", title: t("title"), description: t("intro") });
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const locale = resolveLocale((await params).locale);
  const [t, c, home, priceLabels] = await Promise.all([
    getTranslations({ locale, namespace: "services" }),
    getTranslations({ locale, namespace: "common" }),
    getTranslations({ locale, namespace: "home" }),
    getPriceLabels(locale),
  ]);
  const crumbs = [
    { name: c("home"), path: "/" },
    { name: t("title"), path: "/services" },
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
        image={images.towers}
      />
      <Section>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal as="li" key={service.slug} delay={(index % 3) * 0.06}>
              <ServiceCard service={service} locale={locale} labels={priceLabels} learnMore={c("learnMore")} />
            </Reveal>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-sm text-muted-foreground">{t("pricingNote")}</p>
      </Section>
      <Section tone="muted" labelledBy="services-faq">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="services-faq" eyebrow={home("faqEyebrow")} title={c("faq")} />
          </div>
          <div className="lg:col-span-8">
            <FaqList items={generalFaqs} locale={locale} />
          </div>
        </div>
      </Section>
      <CtaBand
        title={t("ctaTitle")}
        text={t("ctaText")}
        primary={{ label: c("bookConsultation"), href: "/contact" }}
      />
    </>
  );
}
