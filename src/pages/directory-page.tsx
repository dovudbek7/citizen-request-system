import { useDeferredValue, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Building2, UserRound } from "lucide-react"
import { employees, organizations } from "@/data/mock-data" // fallback only
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
  const { data, loading, error, refetch, fetchDetail } =
    useDirectoryData(locale)
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
        // Filter by active type (HODIM or TASHKILOT)
        if (item.type !== activeType) return false

        const matchesQuery =
          !normalized ||
          [
            getLocalizedText(item.name, locale),
            getLocalizedText(item.title, locale),
            getLocalizedText(item.description, locale),
            getLocalizedText(item.department, locale),
            item.tags?.map(tag => getLocalizedText(tag, locale)).join(" ") ??
              "",
          ]
            .join(" ")
            .toLowerCase()
            .includes(normalized)
        return matchesQuery
      })
      .sort((a, b) => {
        // Sort HODIM (employees) first, then TASHKILOT (organizations)
        if (a.type === b.type) return 0
        return a.type === "employees" ? -1 : 1
      })
  }, [deferredQuery, items, locale, activeType])

  // Fetch detail and show modal
  async function handleOpenDetail(item: ContactEntity) {
    const detail = await fetchDetail(item.id)
    if (detail) {
      onOpenDetail(detail)
    } else {
      onOpenDetail(item)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/70 dark:text-sky-300/75">
              {t.directory.title}
            </p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-primary dark:text-sky-300 sm:text-6xl">
              {activeType === "employees"
                ? t.directory.employees
                : t.directory.organizations}
            </h1>
          </div>
          <div className="flex w-full flex-col gap-3 xl:max-w-3xl xl:flex-row">
            <SearchField
              onChange={setQuery}
              placeholder={t.directory.search}
              value={query}
            />
            <Button type="button" variant="default">
              Search
            </Button>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {[
            {
              key: "employees" as const,
              label: t.directory.employees,
              icon: UserRound,
            },
            {
              key: "organizations" as const,
              label: t.directory.organizations,
              icon: Building2,
            },
          ].map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              className={cn(
                "min-w-[160px]",
                activeType === key ? "" : "shadow-none",
              )}
              onClick={() => onTypeChange(key)}
              pulse={activeType === key}
              type="button"
              variant={activeType === key ? "default" : "outline"}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Button>
          ))}
        </div>
      </Card>
      {selectedItem ? (
        <Card className="border-primary/20 bg-gradient-to-r from-primary/10 to-secondary/10 p-4 dark:from-sky-500/10 dark:to-cyan-300/10">
          <p className="text-base text-slate-700 dark:text-slate-200">
            {t.directory.activeSelection}:{" "}
            <span className="font-semibold">
              {getLocalizedText(selectedItem.name, locale)}
            </span>
          </p>
        </Card>
      ) : null}
      {loading ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
              className="rounded-3xl bg-slate-100 dark:bg-slate-900 h-64 w-full"
            />
          ))}
        </div>
      ) : filteredItems.length ? (
        <DirectoryGrid items={filteredItems} onOpen={handleOpenDetail} />
      ) : (
        <Card className="p-10 text-center text-slate-600">
          {t.directory.noResults}
        </Card>
      )}
    </div>
  )
}
