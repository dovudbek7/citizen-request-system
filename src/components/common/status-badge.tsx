import { motion } from "framer-motion";
import { useLocale } from "@/hooks/use-locale";
import type { Availability } from "@/lib/types";
import { cn } from "@/lib/utils";

export function StatusBadge({ availability, className }: { availability: Availability; className?: string }) {
  const { t } = useLocale();
  const online = availability === "online";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold",
        online
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
          : "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
        className,
      )}
    >
      <motion.span
        animate={online ? { scale: [1, 1.3, 1] } : undefined}
        transition={online ? { repeat: Infinity, duration: 1.8 } : undefined}
        className={cn(
          "h-2.5 w-2.5 rounded-full",
          online ? "bg-online shadow-[0_0_12px_rgba(16,185,129,0.8)]" : "bg-offline",
        )}
      />
      {online ? t.directory.available : t.directory.unavailable}
    </div>
  );
}
