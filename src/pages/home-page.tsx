import { ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/use-locale";

interface HomePageProps {
  onOpenSelection: () => void;
}

export function HomePage({ onOpenSelection }: HomePageProps) {
  const { t } = useLocale();
  const navigate = useNavigate();

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <Card className="overflow-hidden p-8 sm:p-10 lg:p-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground">
            <ShieldCheck className="h-4 w-4" />
            {t.home.badge}
          </div>
          <h1 className="mt-6 font-display text-5xl font-black leading-[0.92] tracking-tight text-primary sm:text-7xl xl:text-[5.5rem]">
            {t.home.titleLead} <br />
            <span className="text-slate-950">{t.home.titleAccent}</span> <br />
            <span className="text-secondary">{t.home.titleEnd}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">{t.home.description}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button onClick={onOpenSelection} size="lg">
              {t.home.request}
            </Button>
            <Button onClick={() => navigate("/faq")} size="lg" variant="outline">
              {t.home.faq}
            </Button>
          </div>
        </motion.div>
      </Card>
      <div className="grid gap-6">
        <Card className="p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/70">{t.home.statsLabel}</p>
          <div className="mt-6 space-y-4">
            {t.home.statsItems.map((item, index) => {
              const Icon = [TrendingUp, Sparkles, ShieldCheck][index] ?? ShieldCheck;
              return (
                <div key={item} className="flex items-center gap-4 rounded-2xl bg-slate-50 px-4 py-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="font-medium text-slate-700">{item}</p>
                </div>
              );
            })}
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-primary to-secondary p-7 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">Kiosk flow</p>
          <div className="mt-6 grid gap-4">
            {["Select contact type", "Browse availability", "Start call", "Submit rating"].map((step, index) => (
              <div key={step} className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-4 py-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 font-display text-lg font-black">
                  {index + 1}
                </span>
                <p className="font-medium">{step}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
