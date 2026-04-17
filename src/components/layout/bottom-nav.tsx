import { Home, MessageCircle, HelpCircle, BarChart3 } from "lucide-react"
import { NavLink } from "react-router-dom"
import { useLocale } from "@/hooks/use-locale"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const { t } = useLocale()

  const navItems = [
    { to: "/", icon: Home, label: t.nav.home },
    { to: "/directory", icon: MessageCircle, label: t.nav.directory },// API_CONTRACT bo'yicha messages yo'li
    { to: "/faq", icon: HelpCircle, label: t.nav.faq },
    { to: "/analytics", icon: BarChart3, label: t.nav.analytics },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 w-full border-t border-slate-200/60 bg-white/90 pb-safe pt-2 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 w-full max-w-md items-center justify-around px-4">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "group relative flex flex-1 flex-col items-center justify-center gap-1 py-1 transition-all duration-300 active:scale-90",
                isActive
                  ? "text-primary dark:text-sky-400"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100",
              )
            }
          >
            {/* Ikonka va Effekt */}
            <div className="relative flex h-8 w-8 items-center justify-center">
              <Icon
                className={cn(
                  "h-6 w-6 transition-all duration-300",
                  "group-hover:scale-110"
                )}
              />
              
              {/* Active Indicator Background Glow */}
              <div className={cn(
                "absolute inset-0 -z-10 scale-150 rounded-full bg-primary/10 opacity-0 blur-lg transition-opacity duration-500",
                "group-[.active]:opacity-100" // isActive bo'lganda ishlaydi
              )} />
            </div>

            {/* Label */}
            <span className="text-[10px] font-medium leading-none tracking-tight">
              {label}
            </span>

            {/* Pastki chiziqcha/nuqta indikatori */}
            <div
              className={cn(
                "mt-1 h-1 w-1 rounded-full bg-current transition-all duration-300",
                "opacity-0 scale-0 group-[.active]:opacity-100 group-[.active]:scale-100"
              )}
            />
          </NavLink>
        ))}
      </div>
    </nav>
  )
}