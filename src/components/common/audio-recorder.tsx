import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Mic, Square, RotateCcw, Send, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/hooks/use-locale"

interface AudioRecorderProps {
  onComplete: (blob: Blob) => void
  onCancel: () => void
}

export function AudioRecorder({ onComplete, onCancel }: AudioRecorderProps) {
  const { t } = useLocale()
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [isRecording, setIsRecording] = useState(false)
  const [isPreviewing, setIsPreviewing] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initMicrophone = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        streamRef.current = stream
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "audio/webm;codecs=opus",
        })
        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunksRef.current.push(e.data)
        }
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: "audio/webm" })
          setAudioUrl(URL.createObjectURL(blob))
          setIsRecording(false)
          setIsPreviewing(true)
        }
        mediaRecorderRef.current = mediaRecorder
      } catch {
        setError(t.recorder.micError)
      }
    }
    initMicrophone()
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isRecording) return
    const interval = setInterval(() => setRecordingTime((p) => p + 1), 1000)
    return () => clearInterval(interval)
  }, [isRecording])

  const fmt = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`

  const startRecording = () => {
    if (!mediaRecorderRef.current) return
    chunksRef.current = []
    mediaRecorderRef.current.start()
    setIsRecording(true)
    setRecordingTime(0)
  }
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) mediaRecorderRef.current.stop()
  }
  const resetRecording = () => {
    setIsPreviewing(false)
    setIsPlaying(false)
    setRecordingTime(0)
    chunksRef.current = []
    if (audioUrl) { URL.revokeObjectURL(audioUrl); setAudioUrl(null) }
  }
  const submitAudio = () => {
    if (chunksRef.current.length > 0)
      onComplete(new Blob(chunksRef.current, { type: "audio/webm" }))
  }
  const togglePlayback = () => {
    if (!audioRef.current || !audioUrl) return
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false) }
    else { audioRef.current.play(); setIsPlaying(true) }
  }

  if (error) {
    return (
      <div className="rounded-[20px] border border-red-200 bg-red-50 p-5 dark:border-red-900/50 dark:bg-red-950/20 sm:rounded-[28px] sm:p-6">
        <p className="text-base font-semibold text-red-700 dark:text-red-300 sm:text-lg">{error}</p>
        <Button onClick={onCancel} variant="outline" className="mt-4">{t.common.close}</Button>
      </div>
    )
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex min-h-[100px] items-center justify-center rounded-[20px] border border-white/40 bg-slate-50 dark:bg-slate-900/60 sm:min-h-[120px] sm:rounded-[28px]">
        {isRecording ? (
          <div className="flex items-center gap-3 sm:gap-4">
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40 sm:h-16 sm:w-16"
            >
              <Mic className="h-6 w-6 text-red-600 dark:text-red-400 sm:h-8 sm:w-8" />
            </motion.div>
            <span className="text-xl font-bold tabular-nums text-slate-700 dark:text-slate-200 sm:text-2xl">{fmt(recordingTime)}</span>
          </div>
        ) : isPreviewing && audioUrl ? (
          <div className="flex w-full flex-col items-center gap-3 px-6">
            <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlayback}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white dark:bg-sky-500 sm:h-14 sm:w-14"
            >
              {isPlaying ? <Pause className="h-5 w-5 sm:h-6 sm:w-6" /> : <Play className="h-5 w-5 sm:h-6 sm:w-6" />}
            </motion.button>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{fmt(recordingTime)}</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <Mic className="h-8 w-8 sm:h-10 sm:w-10" />
            <span className="text-sm font-medium">{t.recorder.recordingAudio}</span>
          </div>
        )}
      </div>

      {isRecording && (
        <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity }}
          className="flex items-center justify-center gap-2 rounded-[16px] bg-red-100 px-4 py-2.5 dark:bg-red-950/30 sm:rounded-[20px] sm:py-3"
        >
          <div className="h-3 w-3 rounded-full bg-red-600" />
          <span className="text-sm font-semibold text-red-700 dark:text-red-300 sm:text-base">
            {t.recorder.recording} {fmt(recordingTime)}
          </span>
        </motion.div>
      )}

      <div className="flex gap-2 sm:gap-3">
        {!isRecording && !isPreviewing && (
          <Button onClick={startRecording} size="lg" className="flex-1">
            <Mic className="h-5 w-5" />{t.recorder.startRecording}
          </Button>
        )}
        {isRecording && (
          <Button onClick={stopRecording} size="lg" variant="secondary" className="flex-1">
            <Square className="h-5 w-5" />{t.recorder.stopRecording}
          </Button>
        )}
        {isPreviewing && (
          <>
            <Button onClick={resetRecording} size="lg" variant="outline" className="flex-1">
              <RotateCcw className="h-5 w-5" />{t.recorder.retake}
            </Button>
            <Button onClick={submitAudio} size="lg" className="flex-1">
              <Send className="h-5 w-5" />{t.recorder.sendAudio}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
