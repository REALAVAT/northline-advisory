import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ContactWizard } from "@/components/contact/contact-wizard";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { industries } from "@/data/industries";
import { office, officeAddressLine } from "@/data/office";
import { services } from "@/data/services";
import { Link } from "@/i18n/navigation";
import { pick, resolveLocale } from "@/lib/i18n";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  return buildMetadata({ locale, path: "/contact", title: t("title"), description: t("intro") });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const locale = resolveLocale((await params).locale);
  const [t, c, loc] = await Promise.all([
    getTranslations({ locale, namespace: "contact" }),
    getTranslations({ locale, namespace: "common" }),
    getTranslations({ locale, namespace: "locations" }),
  ]);
  const crumbs = [
    { name: c("home"), path: "/" },
    { name: t("title"), path: "/contact" },
  ];
  const serviceOptions = services.map((service) => ({
    slug: service.slug,
    label: pick(service.title, locale),
    description: pick(service.summary, locale),
  }));
  const industryOptions = industries.map((industry) => ({
    slug: industry.slug,
    label: pick(industry.title, locale),
  }));
  const whatsapp = `https://wa.me/${siteConfig.whatsapp}`;

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
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ContactWizard services={serviceOptions} industries={industryOptions} />
          </div>
          <aside aria-labelledby="other-ways" className="space-y-5 lg:col-span-4">
            <div className="rounded-3xl bg-navy-900 p-6 text-white sm:p-8">
              <h2 id="other-ways" className="text-lg font-semibold">
                {t("otherWays")}
              </h2>
              <ul className="mt-6 space-y-5">
                <li>
                  <a href={`tel:${siteConfig.phoneHref}`} className="group flex gap-3">
                    <Phone className="mt-0.5 size-5 shrink-0 text-gold-300" aria-hidden="true" />
                    <span>
                      <span className="block text-sm text-navy-100">{c("phone")}</span>
                      <span className="font-medium group-hover:underline">{siteConfig.phone}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="group flex gap-3">
                    <Mail className="mt-0.5 size-5 shrink-0 text-gold-300" aria-hidden="true" />
                    <span>
                      <span className="block text-sm text-navy-100">{c("email")}</span>
                      <span className="font-medium break-all group-hover:underline">{siteConfig.email}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="group flex gap-3">
                    <MessageCircle className="mt-0.5 size-5 shrink-0 text-gold-300" aria-hidden="true" />
                    <span>
                      <span className="block text-sm text-navy-100">WhatsApp</span>
                      <span className="font-medium group-hover:underline">{c("whatsapp")}</span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-border bg-white p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-navy-950">{t("visit")}</h2>
              <p className="mt-4 flex gap-3 text-navy-800">
                <MapPin className="mt-0.5 size-5 shrink-0 text-gold-600" aria-hidden="true" />
                {officeAddressLine}
              </p>
              <p className="mt-3 flex gap-3 text-navy-800">
                <Clock className="mt-0.5 size-5 shrink-0 text-gold-600" aria-hidden="true" />
                {loc("days.mon")}–{loc("days.thu")} {office.hours[0].opens}–{office.hours[0].closes}
              </p>
              <Link
                href="/locations"
                className="mt-6 inline-flex text-sm font-semibold text-navy-800 underline-offset-4 hover:underline"
              >
                {loc("directions")}
              </Link>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
