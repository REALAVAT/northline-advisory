import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { TeamCard } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Section } from "@/components/site/section";
import { team } from "@/data/team";
import { resolveLocale } from "@/lib/i18n";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/team">): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "team" });
  return buildMetadata({ locale, path: "/team", title: t("title"), description: t("intro") });
}

export default async function TeamPage({ params }: PageProps<"/[locale]/team">) {
  const locale = resolveLocale((await params).locale);
  const [t, c, home] = await Promise.all([
    getTranslations({ locale, namespace: "team" }),
    getTranslations({ locale, namespace: "common" }),
    getTranslations({ locale, namespace: "home" }),
  ]);
  const crumbs = [
    { name: c("home"), path: "/" },
    { name: t("title"), path: "/team" },
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
      />
      <Section>
        <ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">
          {team.map((member, index) => (
            <Reveal as="li" key={member.slug} delay={(index % 3) * 0.05}>
              <TeamCard member={member} locale={locale} priority={index < 3} />
            </Reveal>
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
