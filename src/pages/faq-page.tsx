import { useDeferredValue, useMemo, useState } from "react";
import { faqItems } from "@/data/mock-data";
import { SearchField } from "@/components/common/search-field";
import { Card } from "@/components/ui/card";
import { FaqAccordion } from "@/features/faq/faq-accordion";
import { useLocale } from "@/hooks/use-locale";

const categories = ["all", "services", "payments", "security"] as const;

export function FaqPage() {
  const { locale, t } = useLocale();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("all");
  const deferredQuery = useDeferredValue(query);

  const filteredItems = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();

    return faqItems.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const matchesQuery =
        !normalized ||
        item.question[locale].toLowerCase().includes(normalized) ||
        item.answer[locale].toLowerCase().includes(normalized);

      return matchesCategory && matchesQuery;
    });
  }, [category, deferredQuery, locale]);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.34fr_0.66fr]">
      <Card className="h-fit p-6 sm:p-8">
        <h1 className="font-display text-4xl font-black tracking-tight text-primary sm:text-5xl">{t.faq.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{t.faq.description}</p>
        <div className="mt-6">
          <SearchField onChange={setQuery} placeholder={t.faq.search} value={query} />
        </div>
        <div className="mt-6 grid gap-3">
          {categories.map((item) => (
            <button
              key={item}
              className={`min-h-12 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-all ${
                category === item ? "bg-primary text-white shadow-kiosk" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
              onClick={() => setCategory(item)}
              type="button"
            >
              {item === "all" ? t.faq.all : item}
            </button>
          ))}
        </div>
        <Card className="mt-8 bg-gradient-to-br from-primary to-secondary p-5 text-white">
          <p className="font-medium">{t.faq.contactPrompt}</p>
        </Card>
      </Card>
      <div>
        {filteredItems.length ? (
          <FaqAccordion items={filteredItems} locale={locale} />
        ) : (
          <Card className="p-10 text-center text-slate-600">{t.faq.noResults}</Card>
        )}
      </div>
    </div>
  );
}
