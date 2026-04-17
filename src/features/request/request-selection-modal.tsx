import { ArrowRight, Building2, UserRound } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLocale } from "@/hooks/use-locale"
import type { DirectoryType } from "@/lib/types"

interface RequestSelectionModalProps {
  open: boolean
  onClose: () => void
  onSelect: (type: DirectoryType) => void
}

export function RequestSelectionModal({
  open,
  onClose,
  onSelect,
}: RequestSelectionModalProps) {
  const { t } = useLocale()

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/20 p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-5xl"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.25 }}
            onClick={event => event.stopPropagation()}
          >
            <Card className="p-6 sm:p-10">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-display text-3xl font-black tracking-tight text-primary sm:text-5xl">
                  {t.request.title}
                </h2>
                <p className="mt-4 text-base text-slate-600 sm:text-lg">
                  {t.request.description}
                </p>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {[
                  {
                    key: "employees" as const,
                    icon: UserRound,
                    label: t.request.employees,
                  },
                  {
                    key: "organizations" as const,
                    icon: Building2,
                    label: t.request.organizations,
                  },
                ].map(({ key, icon: Icon, label }) => (
                  <motion.button
                    key={key}
                    whileTap={{ scale: 0.98 }}
                    className="text-left"
                    onClick={() => onSelect(key)}
                    type="button"
                  >
                    <Card className="h-full p-8 dark:text-slate-100">
                      <div className="flex items-start justify-between">
                        <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-gradient-to-br from-primary to-secondary text-white dark:text-slate-950">
                          <Icon className="h-10 w-10" />
                        </div>
                        <ArrowRight className="h-8 w-8 text-primary/40 dark:text-sky-300/60" />
                      </div>
                      <h3 className="mt-8 font-display text-3xl font-black text-slate-900 dark:text-slate-100">
                        {label}
                      </h3>
                      <p className="mt-3 text-slate-600 dark:text-slate-300">
                        {t.request.enter}
                      </p>
                    </Card>
                  </motion.button>
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                <Button onClick={onClose} variant="ghost">
                  {t.common.close}
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
