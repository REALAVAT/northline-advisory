import type { Metadata } from "next";
import { Clock, Globe2, Mail, MapPin, Navigation, Phone, TrainFront } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { images } from "@/data/images";
import { directionsUrl, mapEmbedUrl, office } from "@/data/office";
import { pick, resolveLocale } from "@/lib/i18n";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/locations">): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "locations" });
  return buildMetadata({ locale, path: "/locations", title: t("title"), description: t("intro") });
}

export default async function LocationsPage({ params }: PageProps<"/[locale]/locations">) {
  const locale = resolveLocale((await params).locale);
  const [t, c, home] = await Promise.all([
    getTranslations({ locale, namespace: "locations" }),
    getTranslations({ locale, namespace: "common" }),
    getTranslations({ locale, namespace: "home" }),
  ]);
  const crumbs = [
    { name: c("home"), path: "/" },
    { name: t("title"), path: "/locations" },
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
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-5">
            <article className="rounded-2xl border border-border bg-white p-6 sm:p-8">
              <p className="eyebrow">{office.neighborhood}</p>
              <h2 className="mt-2 text-2xl font-semibold text-navy-950">{pick(office.name, locale)}</h2>
              <address className="mt-6 space-y-4 not-italic">
                <p className="flex gap-3 text-navy-800">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-gold-600" aria-hidden="true" />
                  <span>
                    <span className="sr-only">{c("address")}: </span>
                    {office.street}
                    <br />
                    {office.locality}, {office.region} {office.postalCode}
                  </span>
                </p>
                <p className="flex gap-3 text-navy-800">
                  <Phone className="mt-0.5 size-5 shrink-0 text-gold-600" aria-hidden="true" />
                  <a href={`tel:${siteConfig.phoneHref}`} className="hover:underline">
                    <span className="sr-only">{c("phone")}: </span>
                    {siteConfig.phone}
                  </a>
                </p>
                <p className="flex gap-3 text-navy-800">
                  <Mail className="mt-0.5 size-5 shrink-0 text-gold-600" aria-hidden="true" />
                  <a href={`mailto:${siteConfig.email}`} className="hover:underline">
                    <span className="sr-only">{c("email")}: </span>
                    {siteConfig.email}
                  </a>
                </p>
              </address>
              <Button asChild size="xl" className="mt-8 w-full sm:w-auto">
                <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation aria-hidden="true" />
                  {t("directions")}
                </a>
              </Button>
            </article>

            <article className="rounded-2xl border border-border bg-white p-6 sm:p-8">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-navy-950">
                <Clock className="size-5 text-gold-600" aria-hidden="true" />
                {c("hours")}
              </h2>
              <table className="mt-4 w-full text-sm">
                <caption className="sr-only">{c("hours")}</caption>
                <tbody className="divide-y divide-border">
                  {office.hours.map((entry) => (
                    <tr key={entry.day}>
                      <th scope="row" className="py-2.5 text-left font-medium text-navy-900">
                        {t(`days.${entry.day}`)}
                      </th>
                      <td className="py-2.5 text-right text-navy-700 tabular-nums">
                        {"opens" in entry && entry.opens
                          ? `${entry.opens} – ${entry.closes}`
                          : "appointment" in entry && entry.appointment
                            ? t("byAppointment")
                            : t("closed")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{t("seasonNote")}</p>
            </article>
          </div>

          <div className="space-y-5 lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-border bg-navy-50">
              <iframe
                title={t("mapTitle")}
                src={mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[4/3] h-auto w-full lg:aspect-auto lg:h-[460px]"
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <article className="rounded-2xl border border-border bg-white p-6">
                <h2 className="flex items-center gap-2 font-semibold text-navy-950">
                  <TrainFront className="size-5 text-gold-600" aria-hidden="true" />
                  {t("transit")}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{t("transitText")}</p>
              </article>
              <article className="rounded-2xl border border-border bg-white p-6">
                <h2 className="flex items-center gap-2 font-semibold text-navy-950">
                  <Globe2 className="size-5 text-gold-600" aria-hidden="true" />
                  {t("remote")}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{t("remoteText")}</p>
              </article>
            </div>
          </div>
        </div>
      </Section>

      <CtaBand
        title={home("ctaTitle")}
        text={home("ctaText")}
        primary={{ label: home("ctaPrimary"), href: "/contact" }}
      />
    </>
  );
}
