import { Globe2 } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import type { Locale } from "@/lib/types";
import { cn } from "@/lib/utils";

const locales: Locale[] = ["uz", "ru", "en"];

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/60 bg-white/55 p-1 backdrop-blur-xl">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Globe2 className="h-5 w-5" />
      </span>
      {locales.map((item) => (
        <button
          key={item}
          className={cn(
            "min-h-10 rounded-full px-3 text-sm font-semibold uppercase transition-all",
            locale === item ? "bg-primary text-white shadow-kiosk" : "text-slate-600 hover:bg-white/70",
          )}
          onClick={() => setLocale(item)}
          type="button"
        >
          {item}
        </button>
      ))}
    </div>
  );
}
