import { Building } from "lucide-react"
import { NavLink } from "react-router-dom"
import { LanguageToggle } from "@/components/common/language-toggle"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { useLocale } from "@/hooks/use-locale"
import { cn } from "@/lib/utils"

export function TopBar() {
  const { t } = useLocale()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/50 bg-white/50 backdrop-blur-2xl transition-colors dark:border-slate-700/60 dark:bg-slate-950/65">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 rounded-b-[24px] px-3 py-3 sm:px-4 sm:py-3 lg:rounded-b-[32px] lg:px-10 lg:py-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white dark:bg-sky-500 dark:text-slate-950 sm:h-12 sm:w-12">
            <Building className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div className="hidden sm:block">
            <p className="font-display text-sm font-black uppercase tracking-tight text-primary dark:text-sky-300 sm:text-base">
              Ulug'nor
            </p>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {t.brand.subtitle}
            </p>
          </div>
        </div>

        {/* Desktop navigation - hidden on mobile and tablet */}
        <nav className="hidden gap-2 lg:flex">
          {[
            ["/", t.nav.home],
            ["/directory", t.nav.directory],
            ["/analytics", t.nav.analytics],
            ["/faq", t.nav.faq],
          ].map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-0",
                  isActive
                    ? "bg-primary text-white dark:bg-sky-500 dark:text-slate-950"
                    : "bg-white/40 text-slate-600 dark:bg-slate-900/50 dark:text-slate-400",
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
