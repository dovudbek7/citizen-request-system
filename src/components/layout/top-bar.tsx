import { Building } from "lucide-react"
import { NavLink } from "react-router-dom"
import { LanguageToggle } from "@/components/common/language-toggle"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { useLocale } from "@/hooks/use-locale"
import { cn } from "@/lib/utils"
import logo from "../../assets/logo.png"
export function TopBar() {
  const { t } = useLocale()

  return (
    <header className="sticky top-0 z-40 w-full px-4 py-3">
      <div 
        className={cn(
          "mx-auto flex max-w-[1440px] items-center justify-between gap-2 px-4 py-3", // gap-4 ni gap-2 qildik
          "bg-white/70 backdrop-blur-xl border border-white/40",
          "dark:bg-slate-900/60 dark:border-slate-800/50",
          "rounded-[28px] shadow-lg shadow-black/5"
        )}
      >
        {/* LOGO QISMI: flex-shrink-0 beramizki, u hech qachon qisqarmasin */}
        <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
          <div className="flex-shrink-0">
            <img src={logo} alt="Logo" className="h-9 w-auto sm:h-11 lg:h-12 object-contain" />
          </div>
          <div className="hidden md:block flex-shrink-0"> {/* sm dan md ga o'tkazdik, kichikroq ekranda yozuv yashirinadi */}
            <p className="font-display text-sm font-black uppercase leading-none tracking-tight text-primary dark:text-sky-300">
              Ulug'nor 
            </p>
            <p className="mt-1 text-[9px] font-medium text-slate-500 dark:text-slate-400">
              {t.brand.subtitle}
            </p>
          </div>
        </div>

        {/* NAVIGATSIYA: O'rtada qoladi, moslashuvchan bo'ladi */}
        <nav className="hidden lg:flex items-center gap-1.5 flex-1 justify-center px-4">
          {[
            ["/home", t.nav.home],
            ["/directory", t.nav.directory],
            ["/analytics", t.nav.analytics],
            ["/faq", t.nav.faq],
          ].map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition-all", // whitespace-nowrap matnni sindirmaydi
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-slate-600 hover:bg-white/80 dark:text-slate-400",
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT CONTROLS: Bu ham qisqarmasligi kerak */}
        <div className="flex flex-shrink-0 items-center gap-1 sm:gap-2">
          <LanguageToggle />
          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-0.5 sm:mx-1" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
