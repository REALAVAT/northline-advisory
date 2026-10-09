import { Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/site/logo";
import { companyNav, resourcesNav } from "@/data/navigation";
import { officeAddressLine } from "@/data/office";
import { services } from "@/data/services";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
    </svg>
  );
}

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const nav = await getTranslations({ locale, namespace: "nav" });

  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Link href="/" className="inline-block rounded-md" aria-label="Northline Advisory">
            <Logo inverted />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-6 text-navy-200">{t("tagline")}</p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold-300" aria-hidden="true" />
              <span>{officeAddressLine}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-4 shrink-0 text-gold-300" aria-hidden="true" />
              <a href={`tel:${siteConfig.phoneHref}`} className="hover:text-white">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-4 shrink-0 text-gold-300" aria-hidden="true" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label={t("services")} className="lg:col-span-3">
          <h2 className="text-sm font-semibold text-white">{t("services")}</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="text-navy-200 hover:text-white">
                  {pick(service.title, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("company")} className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-white">{t("company")}</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {companyNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-navy-200 hover:text-white">
                  {nav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("resources")} className="lg:col-span-3">
          <h2 className="text-sm font-semibold text-white">{t("resources")}</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {resourcesNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-navy-200 hover:text-white">
                  {nav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold text-white">{t("newsletterTitle")}</p>
            <p className="mt-1.5 text-sm leading-6 text-navy-200">{t("newsletterText")}</p>
          </div>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-6 py-8 text-sm md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-navy-200">
              © {siteConfig.copyrightYear} {siteConfig.legalName}. {t("rights")}
            </p>
            <p className="text-navy-200">
              {t("demo")}{" "}
              <a
                href={siteConfig.author.url}
                className="font-medium text-gold-300 underline-offset-4 hover:underline"
              >
                Ahmad Khajeh — ahmadkhajeh.com
              </a>
            </p>
          </div>
          <ul aria-label={t("social")} className="flex items-center gap-2">
            <li>
              <a
                href={siteConfig.social.linkedin}
                aria-label="LinkedIn"
                rel="noopener noreferrer"
                target="_blank"
                className="flex size-10 items-center justify-center rounded-full border border-white/15 text-navy-100 hover:border-white/40 hover:text-white"
              >
                <LinkedInIcon />
              </a>
            </li>
            <li>
              <a
                href={siteConfig.social.x}
                aria-label="X"
                rel="noopener noreferrer"
                target="_blank"
                className="flex size-10 items-center justify-center rounded-full border border-white/15 text-navy-100 hover:border-white/40 hover:text-white"
              >
                <XIcon />
              </a>
            </li>
          </ul>
        </div>
        <p className="container-page pb-8 text-xs leading-5 text-navy-300">{t("disclaimer")}</p>
      </div>
    </footer>
  );
}
