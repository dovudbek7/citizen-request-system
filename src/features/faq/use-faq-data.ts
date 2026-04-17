import { useCallback, useEffect, useState } from "react"
import { API_ENDPOINTS } from "@/lib/api"
import type { Locale } from "@/lib/types"

export interface ApiFaqItem {
  id: number
  category: number
  question: string
  answer: string
}

interface UseFaqDataResult {
  data: ApiFaqItem[]
  loading: boolean
  error: string | null
  refetch: () => void
}

function toApiLocale(locale: Locale): string {
  return locale
}

export function useFaqData(locale: Locale): UseFaqDataResult {
  const [data, setData] = useState<ApiFaqItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshIndex, setRefreshIndex] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(API_ENDPOINTS.faqs.list(toApiLocale(locale)))
        if (!res.ok) throw new Error("Failed to fetch FAQ data")
        const json = await res.json()
        if (!cancelled) {
          const items = (json.results ?? json) as ApiFaqItem[]
          setData(items)
        }
      } catch (e: unknown) {
        if (!cancelled) {
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

  const refetch = useCallback(() => setRefreshIndex((i) => i + 1), [])

  return { data, loading, error, refetch }
}
