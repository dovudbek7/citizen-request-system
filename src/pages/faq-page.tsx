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
      <Card className="h-fit p-6 sm:p-8">
        <h1 className="font-display text-4xl font-black tracking-tight text-primary sm:text-5xl">{t.faq.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{t.faq.description}</p>
        <div className="mt-6">
          <SearchField onChange={setQuery} placeholder={t.faq.search} value={query} />
        </div>
        <div className="mt-6 grid gap-3">
          {categories.map((item) => (
            <Button
              key={item}
              className="justify-start"
              onClick={() => setCategory(item)}
              pulse={category === item}
              type="button"
              variant={category === item ? "default" : "outline"}
            >
              {t.faq.categories[item]}
            </Button>
          ))}
        </div>
        <Card className="mt-8 bg-gradient-to-br from-primary to-secondary p-5 text-white">
          <p className="font-medium">{t.faq.contactPrompt}</p>
        </Card>
      </Card>
      <div>
        {loading ? (
          <Card className="p-10 text-center text-slate-600">{t.faq.loading}</Card>
        ) : filteredItems.length ? (
          <FaqAccordion items={filteredItems} />
        ) : (
          <Card className="p-10 text-center text-slate-600">{t.faq.noResults}</Card>
        )}
      </div>
    </div>
  );
}
