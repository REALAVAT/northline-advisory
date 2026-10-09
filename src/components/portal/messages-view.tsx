"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import type { Locale } from "@/i18n/routing";
import { conversations, demoClient } from "@/data/portal";
import { shiftMinutes, useToday } from "@/lib/demo-date";
import { intlLocale, pick } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { PortalHeader } from "./portal-header";

interface LocalMessage {
  id: string;
  body: string;
}

export function MessagesView() {
  const t = useTranslations("portal");
  const locale = useLocale() as Locale;
  const today = useToday();
  const [activeId, setActiveId] = useState(conversations[0].id);
  const [drafts, setDrafts] = useState("");
  const [sent, setSent] = useState<Record<string, LocalMessage[]>>({});
  const [read, setRead] = useState<Record<string, boolean>>({});

  const active = conversations.find((conv) => conv.id === activeId) ?? conversations[0];
  const timeFormat = new Intl.DateTimeFormat(intlLocale[locale], {
    timeZone: "America/New_York",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  function select(id: string) {
    setActiveId(id);
    setRead((state) => ({ ...state, [id]: true }));
  }

  function send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = drafts.trim();
    if (!body) return;
    setSent((state) => ({
      ...state,
      [active.id]: [...(state[active.id] ?? []), { id: `${active.id}-${Date.now()}`, body }],
    }));
    setDrafts("");
    toast.success(t("messageSent"));
  }

  return (
    <div>
      <PortalHeader title={t("messagesTitle")} text={t("messagesText")} />
      <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-white lg:grid-cols-[18rem_minmax(0,1fr)]">
        <nav aria-label={t("conversations")} className="min-w-0 border-b border-border lg:border-r lg:border-b-0">
          <h2 className="px-5 pt-5 pb-2 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            {t("conversations")}
          </h2>
          <ul className="pb-2">
            {conversations.map((conv) => {
              const last = conv.messages[conv.messages.length - 1];
              const unread = conv.unread && !read[conv.id] && conv.id !== activeId;
              return (
                <li key={conv.id}>
                  <button
                    type="button"
                    onClick={() => select(conv.id)}
                    aria-current={conv.id === activeId ? "true" : undefined}
                    className={cn(
                      "w-full border-l-2 px-5 py-3 text-left transition-colors",
                      conv.id === activeId ? "border-gold-500 bg-navy-50" : "border-transparent hover:bg-navy-50/60",
                    )}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-semibold text-navy-950">{conv.participants}</span>
                      {unread ? (
                        <span className="flex shrink-0 items-center">
                          <span className="size-2 rounded-full bg-gold-500" aria-hidden="true" />
                          <span className="sr-only">{t("unread")}</span>
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-0.5 block truncate text-sm text-navy-800">{pick(conv.subject, locale)}</span>
                    <span className="mt-0.5 block truncate text-xs text-muted-foreground">{pick(last.body, locale)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <section aria-labelledby="thread-title" className="flex min-h-[28rem] min-w-0 flex-col">
          <header className="border-b border-border px-5 py-4 sm:px-6">
            <h2 id="thread-title" className="font-semibold text-navy-950">
              {pick(active.subject, locale)}
            </h2>
            <p className="text-sm text-muted-foreground">{active.participants}</p>
          </header>
          <ol className="flex-1 space-y-4 px-5 py-6 sm:px-6" aria-live="polite">
            {active.messages.map((message) => {
              const mine = message.author === "client";
              const when = shiftMinutes(today, message.offsetMinutes);
              return (
                <li key={message.id} className={cn("flex", mine ? "justify-end" : "justify-start")}>
                  <div className={cn("max-w-[85%] sm:max-w-[75%]")}>
                    <p className={cn("mb-1 text-xs text-muted-foreground", mine && "text-right")}>
                      {mine ? t("you") : message.authorName} ·{" "}
                      <time dateTime={when.toISOString()}>{timeFormat.format(when)}</time>
                    </p>
                    <p
                      className={cn(
                        "rounded-2xl px-4 py-3 text-sm leading-6",
                        mine ? "rounded-br-sm bg-navy-900 text-white" : "rounded-bl-sm bg-navy-50 text-navy-900",
                      )}
                    >
                      {pick(message.body, locale)}
                    </p>
                  </div>
                </li>
              );
            })}
            {(sent[active.id] ?? []).map((message) => (
              <li key={message.id} className="flex justify-end">
                <div className="max-w-[85%] sm:max-w-[75%]">
                  <p className="mb-1 text-right text-xs text-muted-foreground">
                    {t("you")} · {demoClient.contactName}
                  </p>
                  <p className="rounded-2xl rounded-br-sm bg-navy-900 px-4 py-3 text-sm leading-6 whitespace-pre-line text-white">
                    {message.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <form onSubmit={send} className="flex gap-2 border-t border-border p-4">
            <label htmlFor="composer" className="sr-only">
              {t("typeMessage")}
            </label>
            <textarea
              id="composer"
              rows={1}
              value={drafts}
              onChange={(event) => setDrafts(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  event.currentTarget.form?.requestSubmit();
                }
              }}
              placeholder={t("typeMessage")}
              className="min-h-11 flex-1 resize-none rounded-lg border border-input px-3 py-2.5 text-base focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:text-sm"
            />
            <button
              type="submit"
              disabled={!drafts.trim()}
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg bg-navy-900 px-4 text-sm font-semibold text-white hover:bg-navy-800 disabled:opacity-50"
            >
              <Send className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">{t("send")}</span>
              <span className="sr-only sm:hidden">{t("send")}</span>
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
