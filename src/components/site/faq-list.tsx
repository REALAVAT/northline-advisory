import { Plus } from "lucide-react";
import type { FaqItem } from "@/data/types";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/i18n";

export function FaqList({ items, locale }: { items: FaqItem[]; locale: Locale }) {
  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-white">
      {items.map((item, index) => (
        <details key={index} className="group px-5 sm:px-6" open={index === 0}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-base font-semibold text-navy-900 marker:hidden [&::-webkit-details-marker]:hidden">
            <span>{pick(item.question, locale)}</span>
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-border text-navy-600 transition-transform group-open:rotate-45">
              <Plus className="size-3.5" aria-hidden="true" />
            </span>
          </summary>
          <p className="-mt-1 pr-10 pb-5 leading-7 text-muted-foreground">
            {pick(item.answer, locale)}
          </p>
        </details>
      ))}
    </div>
  );
}
