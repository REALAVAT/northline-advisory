import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { JsonLd } from "@/components/site/json-ld";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
import { resolveLocale } from "@/lib/i18n";
import { organizationGraph } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, siteUrl } from "@/lib/site";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const clientNamespaces = [
  "nav",
  "common",
  "contact",
  "resources",
  "portal",
  "insights",
  "error",
] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0b1f3a",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    ...buildMetadata({
      locale,
      path: "",
      title: t("title"),
      description: t("description"),
    }),
    metadataBase: new URL(siteUrl),
    applicationName: siteConfig.name,
    title: {
      default: t("title"),
      template: `%s | ${siteConfig.name}`,
    },
    keywords: t("keywords"),
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
    creator: siteConfig.author.name,
    formatDetection: { telephone: false },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const locale = resolveLocale((await params).locale);
  const [messages, t, meta, common] = await Promise.all([
    getMessages({ locale }),
    getTranslations({ locale, namespace: "nav" }),
    getTranslations({ locale, namespace: "meta" }),
    getTranslations({ locale, namespace: "common" }),
  ]);

  const clientMessages = Object.fromEntries(
    clientNamespaces.map((key) => [key, messages[key]]),
  );

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          <a
            href="#main"
            className="sr-only z-50 rounded-md bg-navy-900 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            {t("skipToContent")}
          </a>
          <Header locale={locale} />
          <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <Footer locale={locale} />
          <WhatsAppButton
            label={common("whatsapp")}
            message={
              locale === "es"
                ? "Hola Northline, me gustaría hablar con un asesor."
                : "Hi Northline, I'd like to speak with an advisor."
            }
          />
          <Toaster position="top-center" richColors closeButton />
        </NextIntlClientProvider>
        <JsonLd data={organizationGraph(locale, meta("description"))} />
      </body>
    </html>
  );
}
