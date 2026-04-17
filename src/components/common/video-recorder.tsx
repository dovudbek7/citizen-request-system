import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Play, Square, RotateCcw, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/hooks/use-locale"

interface VideoRecorderProps {
  onComplete: (blob: Blob) => void
  onCancel: () => void
}

export function VideoRecorder({ onComplete, onCancel }: VideoRecorderProps) {
  const { t } = useLocale()
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const [isRecording, setIsRecording] = useState(false)
  const [isPreviewing, setIsPreviewing] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: true,
        })
        streamRef.current = stream
        if (videoRef.current) videoRef.current.srcObject = stream

        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "video/webm;codecs=vp9,opus",
        })
        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunksRef.current.push(e.data)
        }
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: "video/webm" })
          if (videoRef.current) {
            videoRef.current.srcObject = null
            videoRef.current.src = URL.createObjectURL(blob)
          }
          setIsRecording(false)
          setIsPreviewing(true)
        }
        mediaRecorderRef.current = mediaRecorder
      } catch {
        setError(t.recorder.cameraError)
      }
    }
    initCamera()
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
  const resetRecording = async () => {
    setIsPreviewing(false)
    setRecordingTime(0)
    chunksRef.current = []
    if (videoRef.current && streamRef.current) {
      videoRef.current.src = ""
      videoRef.current.srcObject = streamRef.current
    }
  }
  const submitVideo = () => {
    if (chunksRef.current.length > 0)
      onComplete(new Blob(chunksRef.current, { type: "video/webm" }))
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
      <div className="overflow-hidden rounded-[20px] border border-white/40 bg-black sm:rounded-[28px]">
        <video ref={videoRef} autoPlay muted={!isPreviewing} playsInline className="w-full bg-black" style={{ maxHeight: "400px" }} />
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
            <div className="h-5 w-5 rounded-full bg-white" />
            {t.recorder.startRecording}
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
            <Button onClick={submitVideo} size="lg" className="flex-1">
              <Send className="h-5 w-5" />{t.recorder.sendVideo}
            </Button>
          </>
        )}
      </div>

      {isPreviewing && (
        <div className="flex justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => videoRef.current?.play()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white dark:bg-sky-500 sm:h-12 sm:w-12"
          >
            <Play className="h-5 w-5 sm:h-6 sm:w-6" />
          </motion.button>
        </div>
      )}

      <p className="text-center text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
        {isRecording
          ? t.recorder.recording
          : isPreviewing
            ? t.recorder.playPrompt
            : t.recorder.recordPrompt}
      </p>
    </div>
  )
}
