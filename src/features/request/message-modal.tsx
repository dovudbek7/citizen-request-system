import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle2, Mic, SendHorizonal, Video, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AudioRecorder } from "@/components/common/audio-recorder"
import { VideoRecorder } from "@/components/common/video-recorder"
import { API_ENDPOINTS } from "@/lib/api"
import { useLocale } from "@/hooks/use-locale"
import { getLocalizedText } from "@/lib/utils"
import type { ContactEntity, MessageMode } from "@/lib/types"
import { useNavigate } from "react-router-dom"

interface MessageModalProps {
  item: ContactEntity | null
  mode: MessageMode | null
  open: boolean
  onClose: () => void
  onSent: () => void
}

export function MessageModal({
  item,
  mode,
  open,
  onClose,
  onSent,
}: MessageModalProps) {
  const { locale, t } = useLocale()
  const [senderName, setSenderName] = useState("")
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navigate = useNavigate()

  // 1. Modal ochilganda statelarni tozalash
  useEffect(() => {
    if (!open) {
      setSenderName("")
      setMessage("")
      setSending(false)
      setSent(false)
      setVideoBlob(null)
      setAudioBlob(null)
    }
  }, [open])

  // 2. Idle Timer - Agar modal ochiq bo'lsa va harakat bo'lmasa redirect qilish
  useEffect(() => {
    if (!open) {
      if (timerRef.current) clearTimeout(timerRef.current)
      return
    }

    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current)

      timerRef.current = setTimeout(() => {
        onClose()
        navigate("/", { replace: true })
      }, 10000) // Test uchun 5 soniya
    }

    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ]
    events.forEach(event => window.addEventListener(event, resetTimer))

    resetTimer()

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      events.forEach(event => window.removeEventListener(event, resetTimer))
    }
  }, [open, navigate, onClose])

  if (!item || !mode) return null

  // 3. Xabar yuborish funksiyasi
  const handleSend = async () => {
    setSending(true)

    try {
      const formData = new FormData()
      formData.append("targetId", item.id)
      formData.append("senderName", senderName || "Tashrif buyuvchi")
      formData.append("type", mode)

      if (mode === "text") {
        formData.append("content", message)
      } else if (mode === "audio" && audioBlob) {
        formData.append("content", "")
        formData.append("media", audioBlob, "audio.webm")
      } else if (mode === "video" && videoBlob) {
        formData.append("content", "")
        formData.append("media", videoBlob, "video.webm")
      }

      const res = await fetch(API_ENDPOINTS.messages.send(), {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Failed to send message")

      setSending(false)
      setSent(true)

      // Muvaffaqiyatli yuborilgach redirect
      setTimeout(() => {
        onSent()
        onClose()
        navigate("/", { replace: true })
      }, 900)
    } catch {
      setSending(false)
      setSent(true) // Xatolik bo'lsa ham UI yopilishi uchun
      setTimeout(() => {
        onSent()
        onClose()
        navigate("/", { replace: true })
      }, 900)
    }
  }

  const canSend =
    (mode === "text" && message.trim().length > 0) ||
    (mode === "audio" && audioBlob !== null) ||
    (mode === "video" && videoBlob !== null)

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/40 p-3 backdrop-blur-xl sm:p-4"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto"
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="relative rounded-[24px] border border-white/40 bg-white/90 p-5 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/85 sm:rounded-[32px] sm:p-8">
              {/* Close */}
              <button
                aria-label={t.common.close}
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-600 transition-all hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 sm:right-4 sm:top-4 sm:h-12 sm:w-12"
                onClick={onClose}
                type="button"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-gradient-to-br from-primary to-secondary text-white dark:text-slate-950 sm:h-16 sm:w-16 sm:rounded-[24px]">
                  {mode === "text" ? (
                    <SendHorizonal className="h-5 w-5 sm:h-7 sm:w-7" />
                  ) : mode === "audio" ? (
                    <Mic className="h-5 w-5 sm:h-7 sm:w-7" />
                  ) : (
                    <Video className="h-5 w-5 sm:h-7 sm:w-7" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-xl font-black text-primary dark:text-sky-300 sm:text-3xl">
                    {mode === "text"
                      ? t.directory.textMessage
                      : mode === "audio"
                        ? t.directory.audioMessage
                        : t.directory.videoMessage}
                  </h3>
                  <p className="mt-0.5 truncate text-sm text-slate-600 dark:text-slate-300 sm:mt-1 sm:text-base">
                    {getLocalizedText(item.name, locale)}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
                {t.directory.messagePrompt}
              </p>

              {/* Sender name */}
              <div className="mt-3 sm:mt-4">
                <Input
                  onChange={e => setSenderName(e.target.value)}
                  placeholder={t.directory.senderNamePlaceholder}
                  value={senderName}
                />
              </div>

              {/* Content */}
              {mode === "video" ? (
                <div className="mt-3 sm:mt-4">
                  <VideoRecorder
                    onComplete={blob => setVideoBlob(blob)}
                    onCancel={() => setVideoBlob(null)}
                  />
                </div>
              ) : mode === "audio" ? (
                <div className="mt-3 sm:mt-4">
                  <AudioRecorder
                    onComplete={blob => setAudioBlob(blob)}
                    onCancel={() => setAudioBlob(null)}
                  />
                </div>
              ) : (
                <div className="mt-3 sm:mt-4">
                  <Textarea
                    autoFocus
                    onChange={e => setMessage(e.target.value)}
                    placeholder={t.directory.messagePlaceholder}
                    value={message}
                  />
                </div>
              )}

              {/* Sent Status UI */}
              {sent ? (
                <div className="mt-4 flex items-center gap-3 rounded-[20px] bg-emerald-100 px-4 py-3 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 sm:mt-6 sm:rounded-[24px] sm:py-4">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-base font-semibold sm:text-lg">
                    {t.directory.messageSent}
                  </span>
                </div>
              ) : null}

              {/* Action Button */}
              {!sent && (
                <Button
                  className="mt-4 w-full sm:mt-6"
                  disabled={sending || !canSend}
                  onClick={handleSend}
                  size="lg"
                >
                  {sending ? t.directory.sending : t.directory.send}
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
