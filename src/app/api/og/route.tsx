import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

const size = { width: 1200, height: 630 };

const taglines: Record<string, string> = {
  en: "Accounting & tax advisory · Midtown Manhattan",
  es: "Contabilidad y asesoría fiscal · Midtown Manhattan",
};

const defaultTitles: Record<string, string> = {
  en: "Clear numbers. Confident decisions.",
  es: "Números claros. Decisiones seguras.",
};

export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const locale = params.get("locale") === "es" ? "es" : "en";
  const title = (params.get("title") || defaultTitles[locale]).slice(0, 110);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0b1f3a 0%, #13294b 60%, #1c3760 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="7" fill="#ffffff" fillOpacity="0.1" />
            <path
              d="M9 23V9l14 14V9"
              fill="none"
              stroke="#fff"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M8 6.5h16" stroke="#c9a46a" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>Northline</span>
            <span style={{ fontSize: 16, letterSpacing: 6, color: "#d9bf8f", textTransform: "uppercase" }}>
              Advisory
            </span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ width: 96, height: 4, background: "#b8955a", borderRadius: 4 }} />
          <div style={{ fontSize: title.length > 60 ? 58 : 70, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1.5 }}>
            {title}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#c7d2e3" }}>
          <span>{taglines[locale]}</span>
          <span>New York, NY</span>
        </div>
      </div>
    ),
    {
      ...size,
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable" },
    },
  );
}
