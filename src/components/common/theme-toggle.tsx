import { MoonStar, SunMedium } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    // "common.theme" yozuvini olib tashladik, chunki ikonkalardan hamma narsa tushunarli
    // Bu orqali TopBar-da ancha joy tejaladi
    <div className="flex items-center gap-1 rounded-full border border-white/40 bg-white/40 p-1 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/50">
      <button
        onClick={() => setTheme("light")}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full transition-all",
          theme === "light" 
            ? "bg-white text-orange-500 shadow-sm" 
            : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
        )}
      >
        <SunMedium className="h-4 w-4" />
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full transition-all",
          theme === "dark" 
            ? "bg-slate-800 text-sky-400 shadow-sm" 
            : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
        )}
      >
        <MoonStar className="h-4 w-4" />
      </button>
    </div>
  );
}