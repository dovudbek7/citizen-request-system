import { useRef } from "react"
import { motion } from "framer-motion"
import { Lock } from "lucide-react"
import aiWomenVideo from "../assets/aiWomen.MOV"
import { useLocale } from "@/hooks/use-locale"
import type { Locale } from "@/lib/types"

const titleText: Record<Locale, string> = {
  uz: "Sayt vaqtinchalik muzlatildi",
  kk: "Sayt vaqtinchalik muzlatildi",
  kir: "Сайт вақтинча музлатилди",
  ru: "Сайт временно заморожен",
  en: "Website temporarily frozen",
}

const descriptionText: Record<Locale, string> = {
  uz: "Xizmat uchun to'lov o'z vaqtida amalga oshirilmaganligi sababli sayt faoliyati vaqtinchalik to'xtatildi. To'lov tasdiqlangach, sayt avvalgi holatida ishlashda davom etadi. Noqulayliklar uchun uzr so'raymiz.",
  kk: "Xizmat uchun to'lov o'z vaqtida amalga oshirilmaganligi sababli sayt faoliyati vaqtinchalik to'xtatildi. To'lov tasdiqlangach, sayt avvalgi holatida ishlashda davom etadi. Noqulayliklar uchun uzr so'raymiz.",
  kir: "Хизмат учун тўлов ўз вақтида амалга оширилмаганлиги сабабли сайт фаолияти вақтинча тўхтатилди. Тўлов тасдиқлангач, сайт аввалги ҳолатида ишлашда давом этади. Ноқулайликлар учун узр сўраймиз.",
  ru: "Деятельность сайта временно приостановлена в связи с тем, что оплата за услугу не была произведена вовремя. После подтверждения оплаты сайт продолжит работу в обычном режиме. Приносим извинения за неудобства.",
  en: "Website operations have been temporarily suspended due to non-payment for the service. Once payment is confirmed, the site will resume normal operation. We apologize for the inconvenience.",
}

const badgeText: Record<Locale, string> = {
  uz: "To'lov kutilmoqda",
  kk: "To'lov kutilmoqda",
  kir: "Тўлов кутилмоқда",
  ru: "Ожидается оплата",
  en: "Payment pending",
}

export function FrozenPage() {
  const { locale } = useLocale()
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#ffffff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          filter: "blur(14px) grayscale(0.4)",
          opacity: 0.55,
          pointerEvents: "none",
          transform: "scale(1.05)",
        }}
      >
        <video
          ref={videoRef}
          src={aiWomenVideo}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          style={{
            height: "100%",
            maxWidth: "100%",
            objectFit: "contain",
            pointerEvents: "none",
          }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />

      <div className="relative z-10 flex h-full w-full items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-xl rounded-3xl bg-white/95 p-8 text-center shadow-2xl ring-1 ring-amber-500/20 backdrop-blur-sm sm:p-10"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
            <Lock className="h-8 w-8 text-amber-600" />
          </div>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-500 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white" />
            {badgeText[locale]}
          </div>

          <h1 className="mt-5 font-display text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            {titleText[locale]}
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            {descriptionText[locale]}
          </p>

          <div className="mt-6 border-t border-slate-200 pt-5 text-xs text-slate-400">
            © {new Date().getFullYear()}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
