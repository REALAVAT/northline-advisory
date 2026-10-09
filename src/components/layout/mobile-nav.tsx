"use client";

import { useState } from "react";
import { ArrowRight, Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/site/logo";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";

export function MobileNav({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-lg" className="lg:hidden" aria-label={t("openMenu")}>
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[88%] max-w-sm gap-0" closeLabel={t("closeMenu")}>
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle>
            <Logo />
          </SheetTitle>
          <SheetDescription className="sr-only">{t("menu")}</SheetDescription>
        </SheetHeader>
        <nav aria-label={t("primary")} className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="flex flex-col">
            {items.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-navy-800 hover:bg-navy-50",
                      active && "bg-navy-50 text-navy-950",
                    )}
                  >
                    {item.label}
                    <ArrowRight className="size-4 text-navy-400" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex flex-col gap-3 border-t border-border p-5">
          <LanguageSwitcher />
          <Button asChild variant="outline" size="xl">
            <Link href="/portal" onClick={() => setOpen(false)}>
              {t("portal")}
            </Link>
          </Button>
          <Button asChild size="xl">
            <Link href="/contact" onClick={() => setOpen(false)}>
              {t("bookCall")}
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
