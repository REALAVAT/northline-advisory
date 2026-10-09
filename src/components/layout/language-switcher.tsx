"use client";

import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const labels = { en: "English", es: "Español" } as const;

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t("language")} className={cn("flex items-center", className)}>
      <Globe className="mr-1.5 size-4 text-navy-500" aria-hidden="true" />
      <ul className="flex items-center rounded-md border border-border p-0.5">
        {routing.locales.map((code) => {
          const active = code === locale;
          return (
            <li key={code}>
              <Link
                href={pathname}
                locale={code}
                hrefLang={code}
                lang={code}
                aria-current={active ? "true" : undefined}
                aria-label={labels[code]}
                className={cn(
                  "block rounded-[5px] px-2.5 py-1 text-xs font-semibold uppercase transition-colors",
                  active
                    ? "bg-navy-900 text-white"
                    : "text-navy-600 hover:bg-navy-50 hover:text-navy-900",
                )}
              >
                {code}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
