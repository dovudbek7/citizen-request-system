import { useState, useRef, useEffect } from "react"
import { Globe2, ChevronDown } from "lucide-react"
import { useLocale } from "@/hooks/use-locale"
import { API_ENDPOINTS } from "@/lib/api"
import type { Locale } from "@/lib/types"
import { cn } from "@/lib/utils"

const locales: Array<{ key: Locale; label: string }> = [
  { key: "uz", label: "O'zbekcha" },
  { key: "kk", label: "Qaraqalpaqsha" },
  { key: "kir", label: "Ўзбекча" },
  { key: "ru", label: "Русский" },
  { key: "en", label: "English" },
]


const localeLabels: Record<Locale, string> = {
  uz: "O'zbekcha",
  kk: "Qaraqalpaqsha",
  kir: "Ўзбекча",
  ru: "Русский",
  en: "English",
}

export function LanguageToggle() {
  const { locale, setLocale, t } = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div ref={dropdownRef} className="relative z-">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full bg-white/45 px-4 py-2 text-sm font-semibold text-slate-600 transition-all focus-visible:outline-none focus-visible:ring-0 dark:bg-slate-900/60 dark:text-slate-300"
        aria-label={t.common.language}
      >
        <Globe2 className="h-4 w-4" />
        {localeLabels[locale]}
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-[20px] border border-white/60 bg-white/95 shadow-lg backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/95">
          <div className="p-2">
            {locales.map(item => (
              <button
                key={item.key}
                onClick={() => {
                  setLocale(item.key)
                  setIsOpen(false)
                  fetch(API_ENDPOINTS.visits.create(), {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ language: item.key }),
                  }).catch(() => {})
                }}
                className={cn(
                  "w-full rounded-[16px] px-4 py-3 text-left text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-0",
                  locale === item.key
                    ? "bg-primary text-white dark:bg-sky-500 dark:text-slate-950"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
