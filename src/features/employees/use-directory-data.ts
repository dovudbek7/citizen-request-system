import { useCallback, useEffect, useState } from "react"
import { API_ENDPOINTS } from "@/lib/api"
import {
  ContactEntity,
  type Locale,
  type DirectoryType,
  type Availability,
  type LocalizedText,
} from "@/lib/types"

interface UseDirectoryDataResult {
  data: ContactEntity[]
  loading: boolean
  error: string | null
  refetch: () => void
  fetchDetail: (id: string) => Promise<ContactEntity | null>
}

// API response type from backend
interface ApiTarget {
  id: number
  target_type: string
  name: string
  position: string
  agency: string
  description: string
  working_hours: string
  image?: string
}

// Transform API response to ContactEntity type
function transformTarget(apiItem: ApiTarget, locale: Locale): ContactEntity {
  const localizedValue = (value: string): LocalizedText => ({
    uz: value,
    kr: value,
    ru: value,
    en: value,
  })

  const isOrganization = apiItem.target_type === "TASHKILOT"

  return {
    id: String(apiItem.id),
    type: isOrganization ? "organizations" : "employees",
    name: localizedValue(apiItem.name),
    title: localizedValue(apiItem.position),
    department: localizedValue(apiItem.agency),
    description: localizedValue(apiItem.description),
    workingHours: localizedValue(apiItem.working_hours),
    availability: "offline" as Availability,
    tags: [],
    avatar:
      apiItem.image && apiItem.image !== "string" && apiItem.image.length > 0
        ? apiItem.image
        : undefined,
  }
}

// Convert frontend locale to API locale format
function toApiLocale(locale: Locale): string {
  return locale
}

export function useDirectoryData(locale: Locale): UseDirectoryDataResult {
  const [data, setData] = useState<ContactEntity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshIndex, setRefreshIndex] = useState(0)

  const fetchDetail = useCallback(
    async (id: string): Promise<ContactEntity | null> => {
      try {
        const res = await fetch(API_ENDPOINTS.targets.detail(id, toApiLocale(locale)))
        if (!res.ok) throw new Error("Failed to fetch detail")
        const json = await res.json()
        // Transform single API item to ContactEntity
        return transformTarget(json as ApiTarget, locale)
      } catch {
        return null
      }
    },
    [locale],
  )

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      setLoading(true)
      setError(null)
      // console.log("[Directory] Fetching from API...")
      try {
        const res = await fetch(API_ENDPOINTS.targets.list(toApiLocale(locale)))
        // console.log("[Directory] API response status:", res.status)
        if (!res.ok) throw new Error("Failed to fetch directory data")
        const json = await res.json()
        // console.log("[Directory] API raw data:", json)

        if (!cancelled) {
          // Handle Django REST Framework paginated response
          const items = (json.results ?? json) as ApiTarget[]
          // console.log("[Directory] API items count:", items.length)
          // console.log("[Directory] API first item:", items[0])
          setData(items.map(item => transformTarget(item, locale)))
        }
      } catch (e: unknown) {
        if (!cancelled) {
          console.error("[Directory] API error:", e)
          setError(e instanceof Error ? e.message : "Unknown error")
          setData([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()
    return () => {
      cancelled = true
    }
  }, [locale, refreshIndex])

  return {
    data,
    loading,
    error,
    refetch: () => setRefreshIndex(i => i + 1),
    fetchDetail,
  }
}
