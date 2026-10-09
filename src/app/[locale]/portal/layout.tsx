import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function PortalRootLayout({ children }: LayoutProps<"/[locale]/portal">) {
  return children;
}
