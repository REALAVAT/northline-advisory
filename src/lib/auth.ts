export const DEMO_COOKIE = "nla_demo";

export const DEMO_SESSION_MAX_AGE = 60 * 60 * 8;

export function isPortalPublicPath(rest: string) {
  return rest === "/login";
}
