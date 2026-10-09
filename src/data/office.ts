import type { Localized } from "./types";

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface OpeningHours {
  day: DayKey;
  schemaDay: string;
  opens?: string;
  closes?: string;
  appointment?: boolean;
}

export const office = {
  name: { en: "New York headquarters", es: "Sede de Nueva York" } satisfies Localized,
  street: "245 East 45th Street, Suite 1800",
  locality: "New York",
  region: "NY",
  postalCode: "10017",
  country: "US",
  neighborhood: "Midtown Manhattan",
  latitude: 40.7518,
  longitude: -73.9714,
  hours: [
    { day: "mon", schemaDay: "Monday", opens: "08:30", closes: "18:00" },
    { day: "tue", schemaDay: "Tuesday", opens: "08:30", closes: "18:00" },
    { day: "wed", schemaDay: "Wednesday", opens: "08:30", closes: "18:00" },
    { day: "thu", schemaDay: "Thursday", opens: "08:30", closes: "18:00" },
    { day: "fri", schemaDay: "Friday", opens: "08:30", closes: "17:00" },
    { day: "sat", schemaDay: "Saturday", appointment: true },
    { day: "sun", schemaDay: "Sunday" },
  ] satisfies OpeningHours[],
} as const;

export const officeAddressLine = `${office.street}, ${office.locality}, ${office.region} ${office.postalCode}`;

export const mapEmbedUrl = (() => {
  const delta = 0.006;
  const bbox = [
    office.longitude - delta,
    office.latitude - delta / 1.6,
    office.longitude + delta,
    office.latitude + delta / 1.6,
  ].join("%2C");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${office.latitude}%2C${office.longitude}`;
})();

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(officeAddressLine)}`;
