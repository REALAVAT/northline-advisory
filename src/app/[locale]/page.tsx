import Image from "next/image";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { IndustryCard, ServiceCard, TeamCard, TestimonialCard } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { FaqList } from "@/components/site/faq-list";
import { Icon } from "@/components/site/icon";
import { JsonLd } from "@/components/site/json-ld";
import { Reveal } from "@/components/site/reveal";
import { Section, SectionHeading } from "@/components/site/section";
import { stats, trustBadges, whyItems } from "@/data/company";
import { generalFaqs } from "@/data/faqs";
import { images } from "@/data/images";
import { industries } from "@/data/industries";
import { services } from "@/data/services";
import { team } from "@/data/team";
import { testimonials } from "@/data/testimonials";
import { Link } from "@/i18n/navigation";
import { pick, resolveLocale } from "@/lib/i18n";
import { faqJsonLd } from "@/lib/jsonld";
import { getPriceLabels } from "@/lib/labels";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = resolveLocale((await params).locale);
  const [t, c, priceLabels] = await Promise.all([
    getTranslations({ locale, namespace: "home" }),
    getTranslations({ locale, namespace: "common" }),
    getPriceLabels(locale),
  ]);

  return (
    <>
      <JsonLd data={faqJsonLd(locale, generalFaqs)} />

      <section className="relative isolate overflow-hidden bg-gradient-to-b from-navy-50/80 to-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(11,31,58,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,31,58,0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_75%)]"
        />
        <div className="container-page grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
          <div className="lg:col-span-6 xl:col-span-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-gold-200 bg-white px-3 py-1 text-xs font-semibold text-gold-800 shadow-sm">
              <span className="size-1.5 rounded-full bg-gold-500" aria-hidden="true" />
              {t("heroEyebrow")}
            </p>
            <h1 className="mt-6 text-[2.6rem] leading-[1.05] font-semibold text-navy-950 sm:text-6xl lg:text-[4rem]">
              {t("heroTitle")}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">{t("heroSubtitle")}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="xl">
                <Link href="/contact">
                  {t("heroPrimary")}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href="/services">{t("heroSecondary")}</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex -space-x-2" aria-hidden="true">
                {team.slice(0, 4).map((member) => (
                  <Image
                    key={member.slug}
                    src={member.image}
                    alt=""
                    width={36}
                    height={36}
                    className="size-9 rounded-full object-cover ring-2 ring-white"
                  />
                ))}
              </div>
              <span className="flex items-center gap-1.5">
                <Star className="size-4 fill-gold-500 text-gold-500" aria-hidden="true" />
                {t("heroRating")}
              </span>
            </div>
          </div>

          <div className="relative lg:col-span-6">
            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl bg-navy-100 shadow-[0_30px_60px_-30px_rgba(11,31,58,0.45)] sm:aspect-[4/3]">
              <Image
                src={images.heroOffice}
                alt={locale === "es" ? "Oficina moderna de Northline Advisory en Midtown Manhattan" : "Modern Northline Advisory office in Midtown Manhattan"}
                fill
                preload
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-4 w-[min(20rem,85%)] rounded-2xl border border-border bg-white p-4 shadow-xl sm:left-8">
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-success">
                  <CheckCircle2 className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-sm font-semibold text-navy-950">
                    {t("heroCardTitle")}
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[0.7rem] font-semibold text-success">
                      {t("heroCardBadge")}
                    </span>
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{t("heroCardText")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-page pb-16 sm:pb-20">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.key} className="bg-white px-6 py-6">
                <dt className="text-sm text-muted-foreground">{t(`stats.${stat.key}`)}</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-navy-950">
                  {stat.prefix}
                  {stat.value}
                  {stat.suffix}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="trust-title" className="border-y border-border bg-white py-10">
        <div className="container-page">
          <h2 id="trust-title" className="text-center text-sm font-medium text-muted-foreground">
            {t("trustTitle")}
          </h2>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {trustBadges.map((badge) => (
              <li
                key={badge.label}
                className="flex items-center gap-3 rounded-xl border border-border px-4 py-3"
              >
                <Icon name={badge.icon} className="size-5 shrink-0 text-gold-600" />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-navy-900">{badge.label}</span>
                  <span className="block truncate text-xs text-muted-foreground">{pick(badge.detail, locale)}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Section labelledBy="services-title">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="services-title"
            eyebrow={t("servicesEyebrow")}
            title={t("servicesTitle")}
            text={t("servicesText")}
          />
          <Button asChild variant="outline" size="xl" className="self-start lg:self-auto">
            <Link href="/services">
              {c("viewAll")}
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal as="li" key={service.slug} delay={(index % 3) * 0.06}>
              <ServiceCard service={service} locale={locale} labels={priceLabels} learnMore={c("learnMore")} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="muted" labelledBy="why-title">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-last lg:order-first">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-navy-100 sm:aspect-[4/3] lg:aspect-[4/5]">
              <Image
                src={images.teamMeeting}
                alt={locale === "es" ? "Asesores de Northline revisando cifras con un cliente" : "Northline advisors reviewing numbers with a client"}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -right-2 bottom-8 hidden rounded-2xl bg-navy-900 p-5 text-white shadow-xl sm:block lg:-right-6">
              <p className="text-3xl font-semibold">24h</p>
              <p className="mt-1 max-w-[10rem] text-sm text-navy-100">{t("why.speed.title")}</p>
            </div>
          </div>
          <div>
            <SectionHeading id="why-title" eyebrow={t("whyEyebrow")} title={t("whyTitle")} text={t("whyText")} />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {whyItems.map((item) => (
                <li key={item.key} className="rounded-2xl border border-border bg-white p-5">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-gold-50 text-gold-700">
                    <Icon name={item.icon} className="size-5" />
                  </span>
                  <h3 className="mt-4 font-semibold text-navy-950">{t(`why.${item.key}.title`)}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{t(`why.${item.key}.text`)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section labelledBy="team-title">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading id="team-title" eyebrow={t("teamEyebrow")} title={t("teamTitle")} text={t("teamText")} />
          <Button asChild variant="outline" size="xl" className="self-start lg:self-auto">
            <Link href="/team">
              {t("teamCta")}
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">
          {team.slice(0, 4).map((member, index) => (
            <Reveal as="li" key={member.slug} delay={index * 0.05}>
              <TeamCard member={member} locale={locale} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="muted" labelledBy="testimonials-title">
        <SectionHeading
          id="testimonials-title"
          eyebrow={t("testimonialsEyebrow")}
          title={t("testimonialsTitle")}
          align="center"
        />
        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Reveal as="li" key={testimonial.name} delay={(index % 2) * 0.06}>
              <TestimonialCard testimonial={testimonial} locale={locale} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section labelledBy="industries-title">
        <SectionHeading
          id="industries-title"
          eyebrow={t("industriesEyebrow")}
          title={t("industriesTitle")}
          text={t("industriesText")}
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <Reveal as="li" key={industry.slug} delay={(index % 3) * 0.06}>
              <IndustryCard industry={industry} locale={locale} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="muted" labelledBy="faq-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="faq-title" eyebrow={t("faqEyebrow")} title={t("faqTitle")} />
            <Button asChild variant="link" className="mt-4 h-auto px-0 text-base">
              <Link href="/contact">
                {c("talkToUs")}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={generalFaqs} locale={locale} />
          </div>
        </div>
      </Section>

      <CtaBand
        title={t("ctaTitle")}
        text={t("ctaText")}
        primary={{ label: t("ctaPrimary"), href: "/contact" }}
        secondary={{ label: t("ctaSecondary"), href: "/portal" }}
      />
    </>
  );
}
