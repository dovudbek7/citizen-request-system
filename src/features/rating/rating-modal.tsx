import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Star, X } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLocale } from "@/hooks/use-locale"
import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"

interface RatingModalProps {
  open: boolean
  onClose: () => void
}

export function RatingModal({ open, onClose }: RatingModalProps) {
  const { t } = useLocale()
  const [rating, setRating] = useState(4)
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = () => {
    setSubmitted(true)
    window.setTimeout(() => {
      setSubmitted(false)
      setComment("")
      setRating(4)
      onClose()
      // navigate('/')
    }, 1200)
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/25 p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-2xl"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            onClick={event => event.stopPropagation()}
          >
            <Card className="relative p-8 text-center sm:p-10">
              <button
                aria-label={t.common.close}
                className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-200"
                onClick={onClose}
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white">
                <Star className="h-12 w-12 fill-current" />
              </div>
              <h3 className="mt-6 font-display text-4xl font-black tracking-tight text-primary dark:text-sky-300">
                {t.rating.title}
              </h3>
              <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
                {submitted ? t.rating.thanks : t.rating.description}
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                {Array.from({ length: 5 }, (_, index) => {
                  const active = index + 1 <= rating
                  return (
                    <motion.button
                      key={index}
                      whileTap={{ scale: 0.94 }}
                      className="rounded-full p-1"
                      onClick={() => setRating(index + 1)}
                      type="button"
                    >
                      <Star
                        className={cn(
                          "h-12 w-12 transition-colors",
                          active
                            ? "fill-cyan-400 text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]"
                            : "text-slate-300",
                        )}
                      />
                    </motion.button>
                  )
                })}
              </div>
              <div className="mt-8">
                <Textarea
                  placeholder={t.rating.placeholder}
                  value={comment}
                  onChange={event => setComment(event.target.value)}
                />
              </div>
              <Button className="mt-6 w-full" onClick={handleSubmit} size="lg">
                {t.rating.submit}
              </Button>
            </Card>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
