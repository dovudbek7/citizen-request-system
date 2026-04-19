import * as React from "react"
import { motion } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "relative inline-flex min-h-14 items-center justify-center overflow-hidden rounded-3xl px-6 py-4 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground dark:bg-sky-500 dark:text-slate-950",
        secondary:
          "bg-secondary text-secondary-foreground dark:bg-cyan-300 dark:text-slate-950",
        outline:
          "border border-border bg-white/85 text-foreground dark:border-slate-700 dark:bg-slate-900/75 dark:text-slate-100",
        ghost: "bg-transparent text-foreground dark:text-slate-100",
      },
      size: {
        default: "min-w-[140px]",
        lg: "min-h-16 min-w-[168px] px-8 text-lg",
        icon: "h-14 w-14 min-w-0 rounded-full p-0",
      },
      pulse: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      pulse: true,
    },
  },
)

type Ripple = { id: number; x: number; y: number; size: number }

export interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, pulse, children, onPointerDown, ...props },
    ref,
  ) => {
    const [ripples, setRipples] = React.useState<Ripple[]>([])

    const handlePointerDown = (
      event: React.PointerEvent<HTMLButtonElement>,
    ) => {
      const bounds = event.currentTarget.getBoundingClientRect()
      const dimension = Math.max(bounds.width, bounds.height)
      const nextRipple = {
        id: window.setTimeout(() => undefined, 0),
        x: event.clientX - bounds.left - dimension / 2,
        y: event.clientY - bounds.top - dimension / 2,
        size: dimension,
      }

      setRipples(current => [...current, nextRipple])
      window.setTimeout(() => {
        setRipples(current =>
          current.filter(ripple => ripple.id !== nextRipple.id),
        )
      }, 450)
      onPointerDown?.(event)
    }

    return (
      <motion.div whileTap={{ scale: 0.97 }}>
        <button
          ref={ref}
          className={cn(buttonVariants({ variant, size, pulse, className }))}
          onPointerDown={handlePointerDown}
          {...props}
        >
          <span className="relative z-10 flex items-center gap-2">
            {children}
          </span>
          {ripples.map(ripple => (
            <motion.span
              key={ripple.id}
              animate={{ opacity: [0.35, 0], scale: [0, 1] }}
              className="pointer-events-none absolute rounded-full bg-white/50 dark:bg-cyan-100/25"
              initial={{ opacity: 0.35, scale: 0 }}
              style={{
                height: ripple.size,
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
              }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          ))}
        </button>
      </motion.div>
    )
  },
)
Button.displayName = "Button"

export { buttonVariants }
