import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DocumentsView } from "@/components/portal/documents-view";
import { resolveLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/portal/documents">): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "portal" });
  return buildMetadata({
    locale,
    path: "/portal/documents",
    title: t("documentsTitle"),
    description: t("documentsText"),
    noindex: true,
  });
}

export default function PortalDocumentsPage() {
  return <DocumentsView />;
}
