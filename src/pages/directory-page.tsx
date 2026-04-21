import { useDeferredValue, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Building2, UserRound } from "lucide-react"
import { employees, organizations } from "@/data/mock-data"
import { useDirectoryData } from "@/features/employees/use-directory-data"
import { DirectoryGrid } from "@/features/employees/directory-grid"
import { SearchField } from "@/components/common/search-field"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLocale } from "@/hooks/use-locale"
import type { ContactEntity, DirectoryType } from "@/lib/types"
import { cn, getLocalizedText } from "@/lib/utils"

interface DirectoryPageProps {
  activeType: DirectoryType
  selectedItem: ContactEntity | null
  onTypeChange: (type: DirectoryType) => void
  onOpenDetail: (item: ContactEntity) => void
}

export function DirectoryPage({
  activeType,
  selectedItem,
  onTypeChange,
  onOpenDetail,
}: DirectoryPageProps) {
  const { locale, t } = useLocale()
  const [query, setQuery] = useState("")
  const deferredQuery = useDeferredValue(query)

  // API integration
  const { data, loading, error, refetch, fetchDetail } = useDirectoryData(locale)
  
  const items = data.length
    ? data
    : loading
      ? []
      : activeType === "employees"
        ? employees
        : organizations

  const filteredItems = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase()
    return items
      .filter(item => {
        if (item.type !== activeType) return false
        const matchesQuery =
          !normalized ||
          [
            getLocalizedText(item.name, locale),
            getLocalizedText(item.title, locale),
            getLocalizedText(item.description, locale),
            getLocalizedText(item.department, locale),
            item.tags?.map(tag => getLocalizedText(tag, locale)).join(" ") ?? "",
          ]
            .join(" ")
            .toLowerCase()
            .includes(normalized)
        return matchesQuery
      })
      .sort((a, b) => (a.type === b.type ? 0 : a.type === "employees" ? -1 : 1))
  }, [deferredQuery, items, locale, activeType])

  async function handleOpenDetail(item: ContactEntity) {
    const detail = await fetchDetail(item.id)
    onOpenDetail(detail || item)
  }

  return (
    <div className="flex flex-col space-y-4 2xl:space-y-6">
      
      {/* HEADER CARD - Ixcham va Elegant */}
      <Card className="overflow-hidden border-none bg-white/90 p-4 shadow-xl shadow-black/5 backdrop-blur-xl dark:bg-slate-900/90 sm:p-6 2xl:p-8">
        <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
          
          {/* Title & Type Indicator */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-sky-500/10 dark:text-sky-400 2xl:h-16 2xl:w-16">
              {activeType === "employees" ? <UserRound className="h-6 w-6 2xl:h-8 2xl:w-8" /> : <Building2 className="h-6 w-6 2xl:h-8 2xl:w-8" />}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 dark:text-sky-300/60 2xl:text-xs">
                {t.directory.title}
              </p>
              <h1 className="font-display text-2xl font-black tracking-tight text-primary dark:text-sky-300 2xl:text-4xl">
                {activeType === "employees" ? t.directory.employees : t.directory.organizations}
              </h1>
            </div>
          </div>

          {/* Action Area: Switcher & Search */}
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:items-center 2xl:gap-4">
            
            {/* Custom Tab Switcher */}
            <div className="inline-flex h-12 items-center rounded-xl bg-slate-100 p-1 dark:bg-slate-800 2xl:h-14 2xl:rounded-2xl">
              {[
                { key: "employees" as const, label: t.directory.employees, icon: UserRound },
                { key: "organizations" as const, label: t.directory.organizations, icon: Building2 },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => onTypeChange(key)}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all 2xl:rounded-xl 2xl:px-6 2xl:text-lg",
                    activeType === key 
                      ? "bg-white text-primary shadow-sm dark:bg-slate-700 dark:text-sky-300" 
                      : "text-slate-500 hover:text-primary dark:text-slate-400"
                  )}
                >
                  <Icon className="h-4 w-4 2xl:h-5 2xl:w-5" />
                  {label}
                </button>
              ))}
            </div>

            {/* Search Field - Width fixed for Desktop, full for Mobile */}
            <div className="w-full lg:w-80 2xl:w-[450px]">
              <SearchField
                onChange={setQuery}
                placeholder={t.directory.search}
                value={query}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Active Selection Breadcrumb - Faqat tanlanganda chiqadi */}
      {selectedItem && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-none bg-primary/5 p-3 dark:bg-sky-500/5 2xl:p-4">
            <p className="text-center text-sm font-medium text-slate-600 dark:text-slate-300 2xl:text-lg">
              {t.directory.activeSelection}:{" "}
              <span className="font-bold text-primary dark:text-sky-400">
                {getLocalizedText(selectedItem.name, locale)}
              </span>
            </p>
          </Card>
        </motion.div>
      )}

      {/* Grid Content - Kiosk uchun 4 ustunli (2xl) */}
      <div className="relative min-h-[400px] pb-12">
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                className="h-64 w-full rounded-[32px] bg-slate-100 dark:bg-slate-800/50 2xl:h-72"
              />
            ))}
          </div>
        ) : filteredItems.length ? (
          <div className="transition-all duration-300 2xl:scale-[0.98] 2xl:origin-top">
            <DirectoryGrid items={filteredItems} onOpen={handleOpenDetail} />
          </div>
        ) : (
          <Card className="flex h-64 flex-col items-center justify-center border-none bg-slate-50/50 text-center dark:bg-slate-900/30">
            <p className="text-lg font-medium text-slate-500 2xl:text-2xl">{t.directory.noResults}</p>
          </Card>
        )}
      </div>
    </div>
  )
}