import { Building } from "lucide-react";
import { NavLink } from "react-router-dom";
import { LanguageToggle } from "@/components/common/language-toggle";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";

export function TopBar() {
  const { t } = useLocale();

  return (
    <header className="sticky top-0 z-40 mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 rounded-b-[32px] border border-white/50 bg-white/50 px-4 py-4 backdrop-blur-2xl sm:px-6 lg:px-10">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-kiosk">
          <Building className="h-6 w-6" />
        </div>
        <div>
          <p className="font-display text-xl font-black uppercase tracking-tight text-primary sm:text-2xl">ETHEREAL</p>
          <p className="text-xs font-medium text-slate-500">Citizen Request System</p>
        </div>
      </div>
      <nav className="hidden items-center gap-2 md:flex">
        {[
          ["/", t.nav.home],
          ["/directory", t.nav.directory],
          ["/faq", t.nav.faq],
        ].map(([to, label]) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "rounded-full px-4 py-3 text-sm font-semibold transition-all",
                isActive ? "bg-primary text-white shadow-kiosk" : "text-slate-600 hover:bg-white/70",
              )
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <LanguageToggle />
    </header>
  );
}
