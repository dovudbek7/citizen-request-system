import { Clock3, Phone, Video, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { AvatarFallback } from "@/components/common/avatar-fallback";
import { StatusBadge } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/hooks/use-locale";
import type { ContactEntity } from "@/lib/types";

interface ContactDetailModalProps {
  item: ContactEntity | null;
  callingMode: "audio" | "video" | null;
  onClose: () => void;
  onCall: (mode: "audio" | "video") => void;
}

export function ContactDetailModal({ item, callingMode, onClose, onCall }: ContactDetailModalProps) {
  const { t } = useLocale();

  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/25 p-4 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-5xl"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            onClick={(event) => event.stopPropagation()}
          >
            <Card className="relative overflow-hidden p-6 sm:p-8">
              <button
                className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200"
                onClick={onClose}
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <div className="flex flex-wrap items-center gap-5">
                    <div className="h-28 w-28 overflow-hidden rounded-[32px] shadow-kiosk">
                      <AvatarFallback name={item.name} src={item.avatar} type={item.type} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/70">{item.department}</p>
                      <h3 className="mt-2 font-display text-4xl font-black tracking-tight text-slate-950">
                        {item.name}
                      </h3>
                      <p className="mt-2 text-lg font-medium text-secondary">{item.title}</p>
                      <StatusBadge availability={item.availability} className="mt-4" />
                    </div>
                  </div>
                  <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600">{item.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-5">
                  <Card className="bg-slate-50/85 p-5">
                    <div className="flex items-center gap-3 text-primary">
                      <Clock3 className="h-5 w-5" />
                      <span className="font-semibold">{t.directory.workingHours}</span>
                    </div>
                    <p className="mt-3 text-lg font-medium text-slate-700">{item.workingHours}</p>
                  </Card>
                  <Card className="bg-gradient-to-br from-primary to-secondary p-5 text-white">
                    <p className="text-sm uppercase tracking-[0.2em] text-white/70">{t.directory.status}</p>
                    <p className="mt-3 text-2xl font-display font-black">
                      {callingMode ? t.directory.calling : item.availability === "online" ? t.directory.available : t.directory.unavailable}
                    </p>
                    <p className="mt-2 text-white/80">
                      {callingMode
                        ? "Session will automatically transition to a rating step after the simulation."
                        : "Choose an audio or video call to continue the kiosk request flow."}
                    </p>
                  </Card>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button className="w-full" disabled={Boolean(callingMode)} onClick={() => onCall("audio")} size="lg">
                      <Phone className="h-5 w-5" />
                      {callingMode === "audio" ? t.directory.calling : t.directory.call}
                    </Button>
                    <Button
                      className="w-full"
                      disabled={Boolean(callingMode)}
                      onClick={() => onCall("video")}
                      size="lg"
                      variant="secondary"
                    >
                      <Video className="h-5 w-5" />
                      {callingMode === "video" ? t.directory.calling : t.directory.videoCall}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
