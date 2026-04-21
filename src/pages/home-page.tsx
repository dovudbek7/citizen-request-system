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
    <div className="flex flex-col gap-6">
      
      {/* 1. ASOSIY CARD - TV uchun optimallashgan */}
      <Card className="relative overflow-hidden p-8 sm:p-12 lg:p-16 shadow-2xl shadow-black/15 border-none bg-white/80 backdrop-blur-md dark:bg-slate-900/90">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }}
          className="grid items-center gap-8 lg:grid-cols-2" // Eni katta ekranlarda 2 ga bo'lamiz
        >
          {/* Chap tomon: Sarlavha */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold uppercase tracking-widest text-primary dark:bg-sky-500/10 dark:text-sky-300">
              <ShieldCheck className="h-5 w-5" />
              {t.home.badge}
            </div>
            
            <h1 className="mt-6 font-display text-4xl font-black leading-[1] tracking-tighter text-primary dark:text-sky-300 sm:text-6xl xl:text-7xl 2xl:text-8xl">
              {t.home.titleLead} <br />
              <span className="text-slate-950 dark:text-slate-100">{t.home.titleAccent}</span> <br />
              <span className="text-secondary dark:text-cyan-400">{t.home.titleEnd}</span>
            </h1>
          </div>

          {/* O'ng tomon: Tavsif va Tugmalar */}
          <div className="flex flex-col justify-center lg:border-l lg:border-slate-200 lg:pl-12 dark:lg:border-slate-800">
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 sm:text-2xl 2xl:text-3xl">
              {t.home.description}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button 
                onClick={onOpenSelection} 
                className="h-16 px-12 text-xl font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-transform"
              >
                {t.home.request}
              </Button>
              <Button 
                onClick={() => navigate("/faq")} 
                variant="outline" 
                className="h-16 px-12 text-xl font-bold rounded-2xl border-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                {t.home.faq}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Orqa fondagi dekorativ element (TV-da bo'shliqni to'ldiradi) */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </Card>

      {/* 2. PASTDAGI IKKITA CARD - Yonma-yon */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Stats Card */}
        <Card className="p-8 shadow-xl shadow-black/5 border-none bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-primary/60 dark:text-sky-300/60">
            {t.home.statsLabel}
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-1">
            {t.home.statsItems.map((item, index) => {
              const Icon = [TrendingUp, Sparkles, ShieldCheck][index] ?? ShieldCheck;
              return (
                <div key={item} className="flex items-center gap-6 rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-800">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-xl font-bold text-slate-700 dark:text-slate-200">{item}</p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Flow Steps Card */}
        <Card className="flex flex-col justify-center bg-gradient-to-br from-primary to-secondary p-8 lg:p-10 2xl:p-12 text-white dark:from-slate-900 dark:to-slate-800 shadow-lg shadow-black/20">
  <p className="text-xs font-black uppercase tracking-[0.2em] text-white/80 2xl:text-lg">
    {t.home.flowLabel}
  </p>
  <div className="mt-6 grid gap-4 2xl:gap-5">
    {t.home.flowSteps.map((step, index) => (
      <div 
        key={step} 
        className="flex items-center gap-5 rounded-[22px] border border-white/20 bg-white/10 px-5 py-4 2xl:px-7 2xl:py-6 backdrop-blur-md"
      >
        <span className="flex h-10 w-10 2xl:h-12 2xl:w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/20 font-display text-xl 2xl:text-2xl font-black">
          {index + 1}
        </span>
        <p className="text-lg font-bold leading-tight 2xl:text-2xl">
          {step}
        </p>
      </div>
    ))}
  </div>
</Card>
      </div>
    </div>
  );
}
