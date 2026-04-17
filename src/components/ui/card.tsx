import * as React from "react"
import { cn } from "@/lib/utils"

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[32px] border border-slate-200/60 bg-white shadow-sm dark:border-slate-700/70 dark:bg-slate-900",
        className,
      )}
      {...props}
    />
  )
}
