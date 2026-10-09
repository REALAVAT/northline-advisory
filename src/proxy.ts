import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { DEMO_COOKIE, isPortalPublicPath } from "@/lib/auth";
import { routing } from "@/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const portalPattern = new RegExp(
  `^/(${routing.locales.join("|")})/portal(/.*)?$`,
);

export function proxy(request: NextRequest) {
  const match = request.nextUrl.pathname.match(portalPattern);

  if (match) {
    const [, locale, rest = ""] = match;
    const signedIn = request.cookies.has(DEMO_COOKIE);
    const isPublic = isPortalPublicPath(rest.replace(/\/$/, ""));

    if (!signedIn && !isPublic) {
      return NextResponse.redirect(
        new URL(`/${locale}/portal/login`, request.url),
      );
    }
    if (signedIn && isPublic) {
      return NextResponse.redirect(new URL(`/${locale}/portal`, request.url));
    }
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
