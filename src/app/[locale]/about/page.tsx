import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { TeamCard } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { Icon } from "@/components/site/icon";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Section, SectionHeading } from "@/components/site/section";
import { stats, timeline, values } from "@/data/company";
import { images } from "@/data/images";
import { team } from "@/data/team";
import { pick, resolveLocale } from "@/lib/i18n";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "about" });
  return buildMetadata({ locale, path: "/about", title: t("title"), description: t("intro") });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const locale = resolveLocale((await params).locale);
  const [t, c, home] = await Promise.all([
    getTranslations({ locale, namespace: "about" }),
    getTranslations({ locale, namespace: "common" }),
    getTranslations({ locale, namespace: "home" }),
  ]);
  const crumbs = [
    { name: c("home"), path: "/" },
    { name: t("title"), path: "/about" },
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
        image={images.skyline}
      />

      <Section labelledBy="story-title">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="story-title" eyebrow={t("eyebrow")} title={t("storyTitle")} />
            <div className="mt-6 space-y-5 text-lg leading-8 text-navy-800">
              <p>{t("story1")}</p>
              <p>{t("story2")}</p>
              <p>{t("story3")}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-2xl bg-navy-100">
              <Image src={images.workshop} alt={locale === "es" ? "Equipo de Northline en una sesión de trabajo" : "The Northline team in a working session"} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-navy-100">
              <Image src={images.building} alt={locale === "es" ? "Edificio de oficinas en Midtown Manhattan" : "Office building in Midtown Manhattan"} fill sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-navy-100">
              <Image src={images.planning} alt={locale === "es" ? "Planificación financiera con un cliente" : "Financial planning with a client"} fill sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover" />
            </div>
          </div>
        </div>
      </Section>

      <section aria-labelledby="stats-title" className="bg-navy-900 py-14">
        <div className="container-page">
          <h2 id="stats-title" className="sr-only">{t("statsTitle")}</h2>
          <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.key} className="border-l-2 border-gold-400 pl-5">
                <dt className="text-sm text-navy-200">{home(`stats.${stat.key}`)}</dt>
                <dd className="mt-1 text-4xl font-semibold text-white">
                  {stat.prefix}
                  {stat.value}
                  {stat.suffix}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section labelledBy="values-title">
        <SectionHeading id="values-title" title={t("valuesTitle")} align="center" />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <Reveal as="li" key={value.key} delay={index * 0.05} className="rounded-2xl border border-border bg-white p-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-gold-50 text-gold-700">
                <Icon name={value.icon} className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-navy-950">{t(`values.${value.key}.title`)}</h3>
              <p className="mt-2 leading-7 text-muted-foreground">{t(`values.${value.key}.text`)}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="muted" labelledBy="timeline-title">
        <SectionHeading id="timeline-title" title={t("timelineTitle")} />
        <ol className="relative mt-12 space-y-8 border-l-2 border-navy-200 pl-8 lg:ml-4">
          {timeline.map((entry) => (
            <li key={entry.year} className="relative">
              <span
                aria-hidden="true"
                className="absolute top-1.5 -left-[41px] size-4 rounded-full border-4 border-white bg-gold-500 ring-1 ring-navy-200"
              />
              <p className="text-sm font-semibold text-gold-700">{entry.year}</p>
              <h3 className="mt-1 text-lg font-semibold text-navy-950">{pick(entry.title, locale)}</h3>
              <p className="mt-1 max-w-2xl leading-7 text-muted-foreground">{pick(entry.text, locale)}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="leadership-title">
        <SectionHeading id="leadership-title" title={t("teamTitle")} />
        <ul className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-3">
          {team
            .filter((member) => member.leadership)
            .map((member) => (
              <li key={member.slug}>
                <TeamCard member={member} locale={locale} />
              </li>
            ))}
        </ul>
      </Section>

      <CtaBand
        title={home("ctaTitle")}
        text={home("ctaText")}
        primary={{ label: home("ctaPrimary"), href: "/contact" }}
        secondary={{ label: home("teamCta"), href: "/team" }}
      />
    </>
  );
}
