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
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"> {/* 4 tadan bo'lsa tor bo'lib qolishi mumkin, shunga 3 qildim */}
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.06 }}
          whileTap={{ scale: 0.99 }}
        >
          <Card className="flex h-full flex-col p-5 shadow-md">
            {/* Yuqori qism: Avatar va Matnlar yonma-yon */}
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-[24px]">
                <AvatarFallback
                  name={getLocalizedText(item.name, locale)}
                  src={item.avatar}
                  type={item.type}
                />
              </div>
              
              <div className="flex-1 min-w-0"> {/* min-w-0 matn sig'may qolsa kesish uchun kerak */}
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-primary/70 dark:text-sky-300/80">
                  {getLocalizedText(item.department, locale)}
                </p>
                <h3 className="mt-1 truncate font-display text-xl font-black text-slate-950 dark:text-slate-100">
                  {getLocalizedText(item.name, locale) || item.phone}
                </h3>
                <p className="text-sm font-medium text-secondary dark:text-cyan-300">
                  {getLocalizedText(item.title, locale)}
                </p>
              </div>
            </div>

            {/* Pastki qism: Tugma */}
            <div className="mt-auto pt-5">
              <Button
                className="w-full"
                onClick={() => onOpen(item)}
                variant="outline"
              >
                {t.directory.openProfile}
              </Button>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
