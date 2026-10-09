import { Info, LogOut } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { PortalNav } from "@/components/portal/portal-nav";
import { demoClient } from "@/data/portal";
import { resolveLocale } from "@/lib/i18n";
import { signOut } from "../actions";

export default async function PortalAppLayout({ children, params }: LayoutProps<"/[locale]/portal">) {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "portal" });
  const initials = demoClient.contactName
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <div className="bg-navy-50/60">
      <div className="border-b border-gold-200 bg-gold-50">
        <p className="container-page flex items-center gap-2 py-2.5 text-sm text-gold-800">
          <Info className="size-4 shrink-0" aria-hidden="true" />
          {t("demoBanner")}
        </p>
      </div>
      <div className="container-page grid grid-cols-1 gap-6 py-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10 lg:py-12">
        <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-border bg-white p-4">
            <div className="flex min-w-0 items-center gap-3">
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy-900 text-sm font-semibold text-white"
              >
                {initials}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-navy-950">{demoClient.contactName}</span>
                <span className="block truncate text-xs text-muted-foreground">{demoClient.company}</span>
              </span>
            </div>
            <form action={signOut} className="lg:hidden">
              <input type="hidden" name="locale" value={locale} />
              <button
                type="submit"
                className="flex size-10 items-center justify-center rounded-lg text-navy-700 hover:bg-navy-50"
                aria-label={t("nav.logout")}
                title={t("nav.logout")}
              >
                <LogOut className="size-4" aria-hidden="true" />
              </button>
            </form>
          </div>
          <PortalNav signOut={signOut} />
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
