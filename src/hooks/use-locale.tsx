import type { ReactNode } from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { translations } from "@/lib/translations"
import type { Locale } from "@/lib/types"

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (typeof translations)[Locale]
}

const STORAGE_KEY = "citizen-request-locale"
const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") return "uz"
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null
    return stored && stored in translations ? stored : "uz"
  })

  useEffect(() => {
    document.documentElement.lang = locale
    window.localStorage.setItem(STORAGE_KEY, locale)
  }, [locale])

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: translations[locale] || translations["uz"],
    }),
    [locale],
  )

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider")
  }

  return context
}
