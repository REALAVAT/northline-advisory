import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { InvoicesView } from "@/components/portal/invoices-view";
import { resolveLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/portal/invoices">): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "portal" });
  return buildMetadata({
    locale,
    path: "/portal/invoices",
    title: t("invoicesTitle"),
    description: t("invoicesText"),
    noindex: true,
  });
}

export default function PortalInvoicesPage() {
  return <InvoicesView />;
}
