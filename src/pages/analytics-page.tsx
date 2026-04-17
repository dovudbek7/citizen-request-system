import { useDeferredValue, useMemo, useState } from "react"
import {
  MapPin,
  Sparkles,
  TrendingUp,
  Zap,
  ArrowUpRight,
  Lock,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { SearchField } from "@/components/common/search-field"
import { StatusBadge } from "@/components/common/status-badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLocale } from "@/hooks/use-locale"
import { cn } from "@/lib/utils"
import type { Locale } from "@/lib/types"

// --- TRANSLATED FAKE DATA ---
const analyticsMetrics = [
  {
    id: "requests",
    label: {
      uz: "Umumiy so'rovlar",
      kr: "Жами муроажатлар",
      ru: "Всего обращений",
      en: "Total Requests",
    },
    month: "1,284",
    trend: 12.5,
  },
  {
    id: "active",
    label: {
      uz: "Faol foydalanuvchilar",
      kr: "Актив фойдаланувчилар",
      ru: "Активные пользователи",
      en: "Active Users",
    },
    month: "856",
    trend: 8.2,
  },
  {
    id: "solved",
    label: {
      uz: "Hal qilingan",
      kr: "Хал қилинган",
      ru: "Решено",
      en: "Resolved",
    },
    month: "1,056",
    trend: 15.3,
  },
  {
    id: "rating",
    label: {
      uz: "O'rtacha baho",
      kr: "Уртача бахо",
      ru: "Средняя оценка",
      en: "Average Rating",
    },
    month: "4.6",
    trend: 2.1,
  },
]

const mostRequestedServices = [
  {
    id: 1,
    label: {
      uz: "ID-karta yangilash",
      kr: "ИД-карта янгилаш",
      ru: "Обновление ID-карты",
      en: "ID Card Renewal",
    },
    completionRate: 85,
  },
  {
    id: 2,
    label: {
      uz: "Soliq imtiyozlari",
      kr: "Солик имтиёзлари",
      ru: "Налоговые льготы",
      en: "Tax Benefits",
    },
    completionRate: 62,
  },
  {
    id: 3,
    label: {
      uz: "Pasport almashtirish",
      kr: "Паспорт алмаштириш",
      ru: "Замена паспорта",
      en: "Passport Replacement",
    },
    completionRate: 45,
  },
  {
    id: 4,
    label: {
      uz: "Fuqarolik ro'yxatga olish",
      kr: "Фуқаролик рўйхатга олиш",
      ru: "Регистрация гражданства",
      en: "Citizenship Registration",
    },
    completionRate: 38,
  },
]

const locationServices = [
  {
    id: 1,
    service: {
      uz: "Markaziy DXM",
      kr: "Марказий ДХМ",
      ru: "Центральный ЦГУ",
      en: "Central CSC",
    },
    region: { uz: "Andijon", kr: "Андижон", ru: "Андижан", en: "Andijan" },
    availability: "online",
    distanceKm: 1.2,
    etaMinutes: 5,
  },
  {
    id: 2,
    service: {
      uz: "IT-Park Filiali",
      kr: "ИТ-Парк филиали",
      ru: "Филиал IT-Park",
      en: "IT-Park Branch",
    },
    region: { uz: "Toshkent", kr: "Тошкент", ru: "Ташкент", en: "Tashkent" },
    availability: "busy",
    distanceKm: 4.5,
    etaMinutes: 15,
  },
  {
    id: 3,
    service: {
      uz: "Yangiyer DXM",
      kr: "Янгиер ДХМ",
      ru: "ЦГУ Янгиер",
      en: "Yangiyer CSC",
    },
    region: { uz: "Sirdaryo", kr: "Сирдарё", ru: "Сырдарья", en: "Sirdarya" },
    availability: "online",
    distanceKm: 2.8,
    etaMinutes: 8,
  },
  {
    id: 4,
    service: {
      uz: "Navoiy Kon-Metall",
      kr: "Навоий Кон-Меттал",
      ru: "Навоий Кон-Меттал",
      en: "Navoi Mining & Metallurgy",
    },
    region: { uz: "Navoiy", kr: "Навоий", ru: "Навои", en: "Navoi" },
    availability: "offline",
    distanceKm: 12.3,
    etaMinutes: 45,
  },
  {
    id: 5,
    service: {
      uz: "Buxoro Arxeologiya",
      kr: "Бухоро Археология",
      ru: "Бухарская археология",
      en: "Bukhara Archaeology",
    },
    region: { uz: "Buxoro", kr: "Бухоро", ru: "Бухара", en: "Bukhara" },
    availability: "online",
    distanceKm: 6.1,
    etaMinutes: 20,
  },
]

const monthlyReport = [20, 45, 28, 80, 99, 43, 67, 88, 32, 55, 76, 90]
const serviceFilters = ["all", "online", "priority"] as const

// --- LOCALIZATION HELPERS ---
type LocalizedObj = Record<Locale, string>

function getLocalizedText(obj: LocalizedObj, locale: Locale): string {
  // If the current locale exists in the object, use it
  if (obj[locale]) {
    return obj[locale]
  }
  // Fallback to Uzbek (uz) as default
  return obj["uz"] || ""
}

export function AnalyticsPage() {
  const { locale, t } = useLocale()
  const [serviceFilter, setServiceFilter] =
    useState<(typeof serviceFilters)[number]>("all")
  const [locationQuery, setLocationQuery] = useState("")
  const deferredQuery = useDeferredValue(locationQuery)

  // --- FILTR MANTIQI (FIXED) ---
  const filteredLocations = useMemo(() => {
    return locationServices.filter(item => {
      const name = getLocalizedText(item.service, locale).toLowerCase()
      const matchesQuery =
        !deferredQuery || name.includes(deferredQuery.toLowerCase())

      const matchesFilter =
        serviceFilter === "all" ||
        (serviceFilter === "online" && item.availability === "online") ||
        (serviceFilter === "priority" && item.etaMinutes <= 8)

      return matchesQuery && matchesFilter
    })
  }, [deferredQuery, locale, serviceFilter])

  const maxMonthly = Math.max(...monthlyReport)

  // Translation helper
  const tr = (key: string): string => {
    return (t.analytics as any)[key] || key
  }

  // Upcoming feature text by locale
  const upcomingText = {
    uz: "Tez kunda: Analitika bo'limi",
    kr: "Тез кунда: Аналитика бўлими",
    ru: "Скоро: Раздел аналитики",
    en: "Coming Soon: Analytics Section",
  }

  return (
    <div className="relative mx-auto max-w-[1400px] space-y-8 p-4 pb-20 sm:p-6">
      {/* --- UPCOMING FEATURE OVERLAY --- */}
      <div className="absolute inset-x-0 top-0 z-10 flex h-full w-full items-start justify-center pt-20 backdrop-blur-[2px]">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-3 rounded-full bg-amber-500 px-6 py-3 font-bold text-white shadow-2xl ring-4 ring-amber-500/20"
        >
          <Lock className="h-5 w-5" />
          <span>{upcomingText[locale]}</span>
        </motion.div>
      </div>

      {/* --- BLURRED CONTENT --- */}
      <div className="opacity-40 grayscale-[0.5] pointer-events-none select-none">
        {/* Header */}
        <section className="relative overflow-hidden rounded-[32px] bg-slate-900 p-8 text-white shadow-2xl sm:p-12">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-sky-400">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-bold uppercase tracking-widest">
                {locale === "uz"
                  ? "Live Statistics"
                  : locale === "kr"
                    ? "Live Статистика"
                    : locale === "ru"
                      ? "Live статистика"
                      : "Live Statistics"}
              </span>
            </div>
            <h1 className="mt-4 font-display text-5xl font-black tracking-tight sm:text-7xl">
              {tr("title")}
            </h1>
            <p className="mt-4 text-lg text-slate-400 max-w-xl">
              {tr("subtitle")}
            </p>
          </div>
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
        </section>

        <div className="grid gap-8 xl:grid-cols-3">
          {/* Main Metrics */}
          <div className="xl:col-span-2 grid gap-6 md:grid-cols-2">
            {analyticsMetrics.map(metric => (
              <Card key={metric.id} className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-500">
                    {getLocalizedText(metric.label, locale)}
                  </span>
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
              <h2 className="font-display text-xl font-bold mb-6">
                {tr("requestedServices")}
              </h2>
              <div className="space-y-6">
                {mostRequestedServices.map(service => (
                  <div key={service.id} className="space-y-2">
                    <div className="flex justify-between text-sm font-bold">
                      <span>{getLocalizedText(service.label, locale)}</span>
                      <span className="text-primary">
                        {service.completionRate}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${service.completionRate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Monthly Report Chart */}
          <Card className="bg-slate-50 p-6 dark:bg-slate-900/50">
            <h2 className="font-display text-2xl font-black mb-8">
              {tr("monthlyReport")}
            </h2>
            <div className="flex h-48 items-end justify-between gap-1">
              {monthlyReport.map((value, i) => (
                <div
                  key={i}
                  className="w-full rounded-t-sm bg-primary/30"
                  style={{ height: `${(value / maxMonthly) * 100}%` }}
                />
              ))}
            </div>
            <div className="mt-4 flex justify-between text-xs text-slate-400">
              <span>Yan</span>
              <span>Dek</span>
            </div>
          </Card>
        </div>

        {/* Discovery Section */}
        <section className="mt-12 space-y-6">
          <h2 className="font-display text-3xl font-black">
            {tr("serviceDiscovery")}
          </h2>

          {/* Search and Filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full sm:w-80">
              <SearchField
                value={locationQuery}
                onChange={setLocationQuery}
                placeholder={tr("discoverPlaceholder")}
              />
            </div>
            <div className="flex gap-2">
              {serviceFilters.map(filter => (
                <Button
                  key={filter}
                  variant={serviceFilter === filter ? "default" : "outline"}
                  onClick={() => setServiceFilter(filter)}
                  className="rounded-full px-4 py-2 text-sm min-h-0 h-auto"
                >
                  {filter === "all"
                    ? locale === "uz"
                      ? "Barcha"
                      : locale === "kr"
                        ? "Барча"
                        : locale === "ru"
                          ? "Все"
                          : "All"
                    : filter === "online"
                      ? locale === "uz"
                        ? "Onlayn"
                        : locale === "kr"
                          ? "Онлайн"
                          : locale === "ru"
                            ? "Онлайн"
                            : "Online"
                      : locale === "uz"
                        ? "Priority"
                        : locale === "kr"
                          ? "Приоритет"
                          : locale === "ru"
                            ? "Приоритет"
                            : "Priority"}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLocations.map(item => (
              <Card
                key={item.id}
                className="p-6 transition-all hover:shadow-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <StatusBadge availability={item.availability as any} />
                  <div className="flex items-center gap-1 text-slate-400">
                    <MapPin className="h-3 w-3" />
                    <span className="text-xs font-bold">
                      {item.distanceKm} km
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold">
                  {getLocalizedText(item.service, locale)}
                </h3>
                <p className="text-slate-500 text-sm mb-4">
                  {getLocalizedText(item.region, locale)}
                </p>
                <div className="border-t pt-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    {tr("eta")}
                  </span>
                  <p className="text-lg font-black text-primary">
                    {item.etaMinutes} min
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
