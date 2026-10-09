"use server";

import { hasLocale } from "next-intl";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";
import { DEMO_COOKIE, DEMO_SESSION_MAX_AGE } from "@/lib/auth";

function localeFrom(formData: FormData) {
  const value = formData.get("locale");
  return typeof value === "string" && hasLocale(routing.locales, value) ? value : routing.defaultLocale;
}

export async function enterDemo(formData: FormData) {
  const locale = localeFrom(formData);
  const store = await cookies();
  store.set(DEMO_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: DEMO_SESSION_MAX_AGE,
  });
  redirect(`/${locale}/portal`);
}

export async function signOut(formData: FormData) {
  const locale = localeFrom(formData);
  const store = await cookies();
  store.delete(DEMO_COOKIE);
  redirect(`/${locale}/portal/login`);
}
