import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MessagesView } from "@/components/portal/messages-view";
import { resolveLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/portal/messages">): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "portal" });
  return buildMetadata({
    locale,
    path: "/portal/messages",
    title: t("messagesTitle"),
    description: t("messagesText"),
    noindex: true,
  });
}

export default function PortalMessagesPage() {
  return <MessagesView />;
}
