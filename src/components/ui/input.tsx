import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-16 w-full rounded-[28px] border border-input bg-white/85 px-5 py-4 text-lg text-foreground outline-none ring-offset-background transition-all placeholder:text-muted-foreground focus-visible:ring-4 focus-visible:ring-ring dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-100",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
