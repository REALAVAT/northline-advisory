"use client";

import { useSyncExternalStore } from "react";
import { DEMO_ANCHOR_DATE } from "@/data/portal";

const subscribe = () => () => {};

function todayInNewYork() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });
}

export function useToday(): string {
  return useSyncExternalStore(subscribe, todayInNewYork, () => DEMO_ANCHOR_DATE);
}

export function shiftDays(iso: string, days: number): string {
  const date = new Date(`${iso}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function shiftMinutes(iso: string, minutes: number): Date {
  const date = new Date(`${iso}T16:00:00Z`);
  date.setUTCMinutes(date.getUTCMinutes() + minutes);
  return date;
}
