import { Clock3 } from "lucide-react"
import { motion } from "framer-motion"
import { AvatarFallback } from "@/components/common/avatar-fallback"
import { StatusBadge } from "@/components/common/status-badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLocale } from "@/hooks/use-locale"
import { getLocalizedText } from "@/lib/utils"
import type { ContactEntity } from "@/lib/types"

interface DirectoryGridProps {
  items: ContactEntity[]
  onOpen: (item: ContactEntity) => void
}

export function DirectoryGrid({ items, onOpen }: DirectoryGridProps) {
  const { locale, t } = useLocale()

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.06 }}
          whileTap={{ scale: 0.99 }}
        >
          <Card className="flex h-full flex-col p-5 shadow-md">
            <div className="flex items-start justify-between gap-4">
              <div className="h-20 w-20 overflow-hidden rounded-[24px]">
                <AvatarFallback
                  name={getLocalizedText(item.name, locale)}
                  src={item.avatar}
                  type={item.type}
                />
              </div>
            </div>
            <div className="mt-5 flex-1">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/70 dark:text-sky-300/80">
                {getLocalizedText(item.department, locale)}
              </p>
              <h3 className="mt-2 font-display text-2xl font-black text-slate-950 dark:text-slate-100">
                {getLocalizedText(item.name, locale) || item.phone}
              </h3>
              <p className="mt-2 text-lg font-medium text-secondary dark:text-cyan-300">
                {getLocalizedText(item.title, locale)}
              </p>
              <p className="mt-3 line-clamp-3 text-base leading-7 text-slate-600 dark:text-slate-300">
                {getLocalizedText(item.description, locale)}
              </p>
            </div>
            <div className="mt-5 flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-base font-medium text-slate-700">
              <Clock3 className="h-4 w-4 text-primary" />
              <span>
                {t.directory.workingHours}:{" "}
                {getLocalizedText(item.workingHours, locale)}
              </span>
            </div>
            <Button
              className="mt-5 w-full"
              onClick={() => onOpen(item)}
              variant="outline"
            >
              {t.directory.openProfile}
            </Button>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
