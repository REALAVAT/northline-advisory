"use client";

import { FileText, LayoutDashboard, LogOut, MessagesSquare, Receipt, UserRound } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const items = [
  { href: "/portal", key: "dashboard", icon: LayoutDashboard },
  { href: "/portal/documents", key: "documents", icon: FileText },
  { href: "/portal/invoices", key: "invoices", icon: Receipt },
  { href: "/portal/messages", key: "messages", icon: MessagesSquare },
  { href: "/portal/profile", key: "profile", icon: UserRound },
] as const;

export function PortalNav({ signOut }: { signOut: (formData: FormData) => Promise<void> }) {
  const t = useTranslations("portal.nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t("portalNav")} className="flex flex-col gap-4">
      <ul className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
        {items.map(({ href, key, icon: Icon }) => {
          const active = href === "/portal" ? pathname === href : pathname.startsWith(href);
          return (
            <li key={href} className="shrink-0">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active ? "bg-navy-900 text-white" : "text-navy-700 hover:bg-navy-50 hover:text-navy-950",
                )}
              >
                <Icon className={cn("size-4", active ? "text-gold-300" : "text-navy-500")} aria-hidden="true" />
                {t(key)}
              </Link>
            </li>
          );
        })}
      </ul>
      <form action={signOut} className="hidden border-t border-border pt-4 lg:block">
        <input type="hidden" name="locale" value={locale} />
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-950"
        >
          <LogOut className="size-4 text-navy-500" aria-hidden="true" />
          {t("logout")}
        </button>
      </form>
    </nav>
  );
}
