import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Locale, LocalizedText } from "@/lib/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLocalizedText(
  value: LocalizedText | undefined,
  locale: Locale,
): string {
  if (!value || typeof value !== "object") {
    return ""
  }
  return value[locale] || ""
}
