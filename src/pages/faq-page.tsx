import { useDeferredValue, useMemo, useState } from "react";
import { SearchField } from "@/components/common/search-field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FaqAccordion } from "@/features/faq/faq-accordion";
import { useFaqData } from "@/features/faq/use-faq-data";
import { useLocale } from "@/hooks/use-locale";

const CATEGORY_MAP: Record<number, string> = {
  1: "services",
  2: "payments",
  3: "security",
  4: "working_hours",
  5: "technical",
};

const categories = ["all", "services", "payments", "security", "working_hours", "technical"] as const;

export function FaqPage() {
  const { locale, t } = useLocale();
  const { data: faqItems, loading } = useFaqData(locale);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("all");
  const deferredQuery = useDeferredValue(query);

  const filteredItems = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();
    return faqItems.filter((item) => {
      const itemCategory = CATEGORY_MAP[item.category] ?? "other";
      const matchesCategory = category === "all" || itemCategory === category;
      const matchesQuery =
        !normalized ||
        item.question.toLowerCase().includes(normalized) ||
        item.answer.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [category, deferredQuery, faqItems]);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.34fr_0.66fr]">
      {/* Chap tomondagi asosiy Card */}
      <Card className="h-fit p-6 sm:p-8 border-white/40 bg-white/70 backdrop-blur-xl rounded-[32px] shadow-2xl dark:bg-slate-900/60 dark:border-slate-800/50 shadow-black/5">
        <h1 className="font-display text-4xl font-black tracking-tight text-primary dark:text-sky-400 sm:text-5xl">
          {t.faq.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
          {t.faq.description}
        </p>
        
        <div className="mt-6">
          <SearchField onChange={setQuery} placeholder={t.faq.search} value={query} />
        </div>

        <div className="mt-6 grid gap-3">
          {categories.map((item) => (
            <Button
              key={item}
              className="justify-start rounded-2xl transition-all duration-300"
              onClick={() => setCategory(item)}
              pulse={category === item}
              type="button"
              variant={category === item ? "default" : "outline"}
              // Active bo'lganda biroz soya qo'shish
              style={category === item ? { boxShadow: '0 4px 12px rgba(var(--primary), 0.2)' } : {}}
            >
              {t.faq.categories[item]}
            </Button>
          ))}
        </div>

        <Card className="mt-8 bg-gradient-to-br from-primary to-secondary p-5 text-white rounded-2xl border-none shadow-lg shadow-primary/20">
          <p className="font-medium">{t.faq.contactPrompt}</p>
        </Card>
      </Card>

      {/* O'ng tomondagi Accordion qismi */}
      <div className="space-y-4">
        {loading ? (
          <Card className="p-10 text-center text-slate-600 bg-white/50 backdrop-blur-md rounded-[32px] border-white/40 shadow-sm">
            {t.faq.loading}
          </Card>
        ) : filteredItems.length ? (
          <div className="rounded-[32px] overflow-hidden">
             <FaqAccordion items={filteredItems} />
          </div>
        ) : (
          <Card className="p-10 text-center text-slate-600 bg-white/50 backdrop-blur-md rounded-[32px] border-white/40 shadow-sm">
            {t.faq.noResults}
          </Card>
        )}
      </div>
    </div>
  );
}
