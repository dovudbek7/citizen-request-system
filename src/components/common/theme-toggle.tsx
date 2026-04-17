import { MoonStar, SunMedium } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/use-locale";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useLocale();

  return (
    <div className="flex items-center gap-2 rounded-[28px] border border-white/60 bg-white/55 p-2 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-950/70">
      <Button onClick={() => setTheme("light")} pulse={theme === "light"} size="icon" type="button" variant={theme === "light" ? "secondary" : "outline"}>
        <SunMedium className="h-5 w-5" />
      </Button>
      <Button onClick={() => setTheme("dark")} pulse={theme === "dark"} size="icon" type="button" variant={theme === "dark" ? "secondary" : "outline"}>
        <MoonStar className="h-5 w-5" />
      </Button>
      <span className="pr-2 text-sm font-semibold text-slate-600 dark:text-slate-300">{t.common.theme}</span>
    </div>
  );
}
