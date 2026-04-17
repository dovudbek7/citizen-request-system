import { useDeferredValue, useMemo, useState } from "react"
import { MapPin, Sparkles, TrendingUp, Zap, ArrowUpRight, Lock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { SearchField } from "@/components/common/search-field"
import { StatusBadge } from "@/components/common/status-badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLocale } from "@/hooks/use-locale"
import { cn } from "@/lib/utils"

// --- FAKE DATA ---
const analyticsMetrics = [
  { id: "requests", label: { uz: "Umumiy so'rovlar", ru: "Всего запросов" }, month: "1,284", trend: 12.5 },
  { id: "active", label: { uz: "Faol foydalanuvchilar", ru: "Активные пользователи" }, month: "856", trend: 8.2 },
]

const mostRequestedServices = [
  { id: 1, label: { uz: "ID-karta yangilash", ru: "Обновление ID-карты" }, completionRate: 85 },
  { id: 2, label: { uz: "Soliq imtiyozlari", ru: "Налоговые льготы" }, completionRate: 62 },
  { id: 3, label: { uz: "Pasport almashtirish", ru: "Замена паспорта" }, completionRate: 45 },
]

const locationServices = [
  { id: 1, service: { uz: "Markaziy DXM", ru: "Центральный ЦГУ" }, region: { uz: "Andijon", ru: "Андижан" }, availability: "online", distanceKm: 1.2, etaMinutes: 5 },
  { id: 2, service: { uz: "IT-Park Filiali", ru: "Филиал IT-Park" }, region: { uz: "Toshkent", ru: "Ташкент" }, availability: "busy", distanceKm: 4.5, etaMinutes: 15 },
]

const monthlyReport = [20, 45, 28, 80, 99, 43, 67, 88, 32, 55, 76, 90]
const serviceFilters = ["all", "online", "priority"] as const

export function AnalyticsPage() {
  const { locale, t } = useLocale()
  const [serviceFilter, setServiceFilter] = useState<(typeof serviceFilters)[number]>("all")
  const [locationQuery, setLocationQuery] = useState("")
  const deferredQuery = useDeferredValue(locationQuery)

  // --- FILTR MANTIQI (BU ENDI XATO BERMAYDI) ---
  const filteredLocations = useMemo(() => {
    return locationServices.filter(item => {
      const name = (item.service[locale as keyof typeof item.service] || "").toLowerCase()
      const matchesQuery = !deferredQuery || name.includes(deferredQuery.toLowerCase())
      
      const matchesFilter =
        serviceFilter === "all" ||
        (serviceFilter === "online" && item.availability === "online") ||
        (serviceFilter === "priority" && item.etaMinutes <= 8)

      return matchesQuery && matchesFilter
    })
  }, [deferredQuery, locale, serviceFilter])

  const maxMonthly = Math.max(...monthlyReport)

  // Helper function to get localized text
  const getTxt = (obj: any) => obj[locale] || obj['uz']

  return (
    <div className="relative mx-auto max-w-[1400px] space-y-8 p-4 pb-20 sm:p-6">
      
      {/* --- UPCOMING FEATURE OVERLAY --- */}
      <div className="absolute inset-x-0 top-0 z-40 flex h-full w-full items-start justify-center pt-20 backdrop-blur-[2px]">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-3 rounded-full bg-amber-500 px-6 py-3 font-bold text-white shadow-2xl ring-4 ring-amber-500/20"
        >
          <Lock className="h-5 w-5" />
          <span>{locale === 'uz' ? "Tez kunda: Tahlillar bo'limi" : "Скоро: Раздел аналитики"}</span>
        </motion.div>
      </div>

      {/* --- BLURRED CONTENT (Opacity reduced to show it's upcoming) --- */}
      <div className="opacity-40 grayscale-[0.5] pointer-events-none select-none">
        
        {/* Header */}
        <section className="relative overflow-hidden rounded-[32px] bg-slate-900 p-8 text-white shadow-2xl sm:p-12">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-sky-400">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-bold uppercase tracking-widest">Live Statistics</span>
            </div>
            <h1 className="mt-4 font-display text-5xl font-black tracking-tight sm:text-7xl">
              Dashboard
            </h1>
          </div>
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
        </section>

        <div className="grid gap-8 xl:grid-cols-3">
          {/* Main Metrics */}
          <div className="xl:col-span-2 grid gap-6 md:grid-cols-2">
            {analyticsMetrics.map((metric) => (
              <Card key={metric.id} className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-500">{getTxt(metric.label)}</span>
                  <div className="rounded-xl bg-slate-100 p-2 dark:bg-slate-800">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <h3 className="text-4xl font-black">{metric.month}</h3>
                  <div className="flex items-center gap-1 text-emerald-500 font-bold">
                    <ArrowUpRight className="h-4 w-4" />
                    <span>{metric.trend}%</span>
                  </div>
                </div>
              </Card>
            ))}
            
            <Card className="p-6 md:col-span-2">
              <h2 className="font-display text-xl font-bold mb-6">Xizmatlar samaradorligi</h2>
              <div className="space-y-6">
                {mostRequestedServices.map(service => (
                  <div key={service.id} className="space-y-2">
                    <div className="flex justify-between text-sm font-bold">
                      <span>{getTxt(service.label)}</span>
                      <span className="text-primary">{service.completionRate}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${service.completionRate}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Monthly Report Chart */}
          <Card className="bg-slate-50 p-6 dark:bg-slate-900/50">
            <h2 className="font-display text-2xl font-black mb-8">Oylik hisobot</h2>
            <div className="flex h-48 items-end justify-between gap-1">
              {monthlyReport.map((value, i) => (
                <div
                  key={i}
                  className="w-full rounded-t-sm bg-primary/30"
                  style={{ height: `${(value / maxMonthly) * 100}%` }}
                />
              ))}
            </div>
          </Card>
        </div>

        {/* Discovery Section */}
        <section className="mt-12 space-y-6">
          <h2 className="font-display text-3xl font-black">Xizmat nuqtalari</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLocations.map(item => (
              <Card key={item.id} className="p-6 transition-all hover:shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <StatusBadge availability={item.availability as any} />
                  <span className="text-xs font-bold text-slate-400">{item.distanceKm} km</span>
                </div>
                <h3 className="text-xl font-bold">{getTxt(item.service)}</h3>
                <p className="text-slate-500 text-sm mb-4">{getTxt(item.region)}</p>
                <div className="border-t pt-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Kutilish vaqti</span>
                  <p className="text-lg font-black text-primary">{item.etaMinutes} min</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}