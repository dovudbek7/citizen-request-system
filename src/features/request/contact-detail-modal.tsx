import { useCallback, useEffect, useRef, useState } from "react"
import {
  Bell,
  CheckCircle2,
  Clock3,
  Loader2,
  MessageSquareText,
  Mic,
  Phone,
  Video,
  X,
  XCircle,
} from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { AvatarFallback } from "@/components/common/avatar-fallback"
import { Button } from "@/components/ui/button"
import { API_ENDPOINTS } from "@/lib/api"
import { useLocale } from "@/hooks/use-locale"
import { getLocalizedText } from "@/lib/utils"
import type { ContactEntity, MessageMode, RingStatus } from "@/lib/types"

interface ContactDetailModalProps {
  item: ContactEntity | null
  messagingMode: MessageMode | null
  onClose: () => void
  onMessage: (mode: MessageMode) => void
}

const RING_TIMEOUT_MS = 5 * 60 * 1000
const POLL_INTERVAL_MS = 2000

export function ContactDetailModal({
  item,
  messagingMode,
  onClose,
  onMessage,
}: ContactDetailModalProps) {
  const { locale, t } = useLocale()

  const [ringStatus, setRingStatus] = useState<RingStatus | null>(null)
  const [ringLoading, setRingLoading] = useState(false)
  const [responderName, setResponderName] = useState("")

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const trackedRef = useRef<string | null>(null)

  const cleanup = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current)
      pollRef.current = null
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  // Track service-request when profile is opened
  useEffect(() => {
    if (item && trackedRef.current !== item.id) {
      trackedRef.current = item.id
      fetch(API_ENDPOINTS.serviceRequests.create(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetId: Number(item.id) }),
      }).catch(() => {})
    }
    if (!item) {
      trackedRef.current = null
    }
  }, [item])

  // Reset when modal closes
  useEffect(() => {
    if (!item) {
      cleanup()
      setRingStatus(null)
      setRingLoading(false)
      setResponderName("")
    }
  }, [item, cleanup])

  useEffect(() => cleanup, [cleanup])

  const startPolling = useCallback(
    (id: string) => {
      pollRef.current = setInterval(async () => {
        try {
          const res = await fetch(API_ENDPOINTS.targets.ringStatus(id))
          if (!res.ok) return
          const data = await res.json()
          const status = data.status as RingStatus

          if (status !== "pending") {
            setRingStatus(status)
            setResponderName(data.responderName || "")
            cleanup()
          }
        } catch {
          // ignore poll errors
        }
      }, POLL_INTERVAL_MS)

      // 5 min timeout → busy
      timeoutRef.current = setTimeout(() => {
        cleanup()
        setRingStatus("busy")
      }, RING_TIMEOUT_MS)
    },
    [cleanup],
  )

  const handleRing = async () => {
    if (!item) return
    setRingLoading(true)
    setRingStatus(null)

    try {
      const res = await fetch(API_ENDPOINTS.targets.ring(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetId: Number(item.id),
          callerName: "Reception Visitor",
        }),
      })

      if (!res.ok) throw new Error("Ring failed")
      const data = await res.json()
      setRingStatus("pending")
      startPolling(data.ringId as string)
    } catch {
      // API error → show busy
      setRingStatus("busy")
    } finally {
      setRingLoading(false)
    }
  }

  const handleClose = () => {
    cleanup()
    onClose()
  }

  const isRinging = ringStatus === "pending"
  const hasResponse = ringStatus && ringStatus !== "pending"

  const ringStatusConfig: Record<
    RingStatus,
    { icon: React.ReactNode; text: string; color: string }
  > = {
    pending: {
      icon: <Loader2 className="h-5 w-5 animate-spin sm:h-6 sm:w-6" />,
      text: t.directory.ringPending,
      color:
        "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-300 dark:border-amber-800/50",
    },
    coming: {
      icon: <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" />,
      text: t.directory.ringComing,
      color:
        "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-300 dark:border-emerald-800/50",
    },
    busy: {
      icon: <XCircle className="h-5 w-5 sm:h-6 sm:w-6" />,
      text: t.directory.ringBusy,
      color:
        "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/20 dark:text-orange-300 dark:border-orange-800/50",
    },
    day_off: {
      icon: <XCircle className="h-5 w-5 sm:h-6 sm:w-6" />,
      text: t.directory.ringDayOff,
      color:
        "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-300 dark:border-red-800/50",
    },
  }

  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-3 backdrop-blur-lg sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="max-h-[90vh] w-full max-w-5xl overflow-y-auto"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-[24px] border border-white/40 bg-white/90 p-5 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/85 sm:rounded-[32px] sm:p-8">
              {/* Close button */}
              <button
                aria-label={t.common.close}
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-700 transition-all hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 sm:right-4 sm:top-4 sm:h-14 sm:w-14"
                onClick={handleClose}
                type="button"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
                {/* Left: Profile */}
                <div>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                    <div className="h-20 w-20 overflow-hidden rounded-[20px] sm:h-28 sm:w-28 sm:rounded-[32px]">
                      <AvatarFallback
                        name={getLocalizedText(item.name, locale)}
                        src={item.avatar}
                        type={item.type}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary/70 dark:text-sky-300/80 sm:text-sm sm:tracking-[0.2em]">
                        {getLocalizedText(item.department, locale)}
                      </p>
                      <h3 className="mt-1 font-display text-2xl font-black tracking-tight text-slate-950 dark:text-slate-100 sm:mt-2 sm:text-4xl">
                        {getLocalizedText(item.name, locale)}
                      </h3>
                      <p className="mt-1 text-base font-medium text-secondary dark:text-cyan-300 sm:mt-2 sm:text-xl">
                        {getLocalizedText(item.title, locale)}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
                    {getLocalizedText(item.description, locale)}
                  </p>

                  {item.tags && item.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2 sm:mt-6">
                      {item.tags.map(tag => (
                        <span
                          key={`${item.id}-${getLocalizedText(tag, locale)}`}
                          className="rounded-full bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground dark:bg-slate-800 dark:text-slate-200 sm:px-4 sm:py-2 sm:text-base"
                        >
                          #{getLocalizedText(tag, locale)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Actions */}
                <div className="space-y-4 sm:space-y-5">
                  {/* Working hours */}
                  <div className="rounded-[20px] bg-slate-50/85 p-4 dark:bg-slate-900/85 sm:rounded-[24px] sm:p-5">
                    <div className="flex items-center gap-3 text-primary dark:text-sky-300">
                      <Clock3 className="h-5 w-5" />
                      <span className="text-base font-semibold sm:text-lg">
                        {t.directory.workingHours}
                      </span>
                    </div>
                    <p className="mt-2 text-base font-medium text-slate-700 dark:text-slate-200 sm:mt-3 sm:text-lg">
                      {getLocalizedText(item.workingHours, locale)}
                    </p>
                  </div>

                  {/* Ring button */}
                  <Button
                    className="w-full gap-3 text-base sm:text-lg"
                    disabled={
                      ringLoading || isRinging || Boolean(messagingMode)
                    }
                    onClick={handleRing}
                    pulse={!ringLoading && !ringStatus}
                    size="lg"
                  >
                    {ringLoading || isRinging ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Phone className="h-5 w-5" />
                    )}
                    {ringLoading || isRinging
                      ? t.directory.ringing
                      : t.directory.ring}
                  </Button>

                  {/* Ring status */}
                  <AnimatePresence>
                    {ringStatus && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div
                          className={`flex items-center gap-3 rounded-[20px] border p-4 sm:gap-4 sm:rounded-[24px] sm:p-5 ${ringStatusConfig[ringStatus].color}`}
                        >
                          {ringStatusConfig[ringStatus].icon}
                          <div className="min-w-0 flex-1">
                            <p className="text-base font-bold sm:text-lg">
                              {ringStatusConfig[ringStatus].text}
                            </p>
                            {ringStatus === "coming" && responderName && (
                              <p className="mt-1 truncate text-sm font-medium opacity-80 sm:text-base">
                                {responderName}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Pending animation */}
                        {isRinging && (
                          <div className="mt-3 flex justify-center sm:mt-4">
                            <motion.div
                              className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary sm:h-20 sm:w-20"
                              animate={{
                                scale: [1, 1.15, 1],
                                boxShadow: [
                                  "0 0 0 0 rgba(14,165,233,0.4)",
                                  "0 0 0 20px rgba(14,165,233,0)",
                                  "0 0 0 0 rgba(14,165,233,0)",
                                ],
                              }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <Bell className="h-7 w-7 text-white sm:h-9 sm:w-9" />
                            </motion.div>
                          </div>
                        )}

                        {/* Fallback prompt for busy/day_off */}
                        {hasResponse && ringStatus !== "coming" && (
                          <p className="mt-3 text-center text-sm font-medium text-slate-500 dark:text-slate-400 sm:mt-4 sm:text-base">
                            {t.directory.ringTimeout}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Divider + message label */}
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 sm:text-sm">
                      {t.directory.leaveMessage}
                    </span>
                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
                  </div>

                  {/* Message buttons — always visible */}
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <Button
                      className="flex-1 min-w-[140px] justify-center gap-2 px-4 text-sm"
                      disabled={Boolean(messagingMode)}
                      onClick={() => onMessage("text")}
                      size="lg"
                      variant="outline"
                    >
                      <MessageSquareText className="h-4 w-4 shrink-0 text-primary" />
                      <span className="truncate">
                        {t.directory.textMessage}
                      </span>
                    </Button>

                    <Button
                      className="flex-1 min-w-[140px] justify-center gap-2 px-4 text-sm"
                      disabled={Boolean(messagingMode)}
                      onClick={() => onMessage("audio")}
                      size="lg"
                      variant="outline"
                    >
                      <Mic className="h-4 w-4 shrink-0 text-primary" />
                      <span className="truncate">
                        {t.directory.audioMessage}
                      </span>
                    </Button>

                    <Button
                      className="flex-1 min-w-[140px] justify-center gap-2 px-4 text-sm"
                      disabled={Boolean(messagingMode)}
                      onClick={() => onMessage("video")}
                      size="lg"
                      variant="outline"
                    >
                      <Video className="h-4 w-4 shrink-0 text-primary" />
                      <span className="truncate">
                        {t.directory.videoMessage}
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
