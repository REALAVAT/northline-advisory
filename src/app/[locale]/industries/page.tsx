import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { IndustryCard } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Section } from "@/components/site/section";
import { images } from "@/data/images";
import { industries } from "@/data/industries";
import { resolveLocale } from "@/lib/i18n";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/industries">): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "industries" });
  return buildMetadata({ locale, path: "/industries", title: t("title"), description: t("intro") });
}

export default async function IndustriesPage({ params }: PageProps<"/[locale]/industries">) {
  const locale = resolveLocale((await params).locale);
  const [t, c, home] = await Promise.all([
    getTranslations({ locale, namespace: "industries" }),
    getTranslations({ locale, namespace: "common" }),
    getTranslations({ locale, namespace: "home" }),
  ]);
  const crumbs = [
    { name: c("home"), path: "/" },
    { name: t("title"), path: "/industries" },
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
        image={images.midtown}
      />
      <Section>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <Reveal as="li" key={industry.slug} delay={(index % 3) * 0.06}>
              <IndustryCard industry={industry} locale={locale} />
            </Reveal>
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
