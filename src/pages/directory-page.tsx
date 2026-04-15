import { useDeferredValue, useMemo, useState } from "react";
import { Building2, SlidersHorizontal, UserRound } from "lucide-react";
import { employees, organizations } from "@/data/mock-data";
import { DirectoryGrid } from "@/features/employees/directory-grid";
import { SearchField } from "@/components/common/search-field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/hooks/use-locale";
import type { ContactEntity, DirectoryType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DirectoryPageProps {
  activeType: DirectoryType;
  selectedItem: ContactEntity | null;
  onTypeChange: (type: DirectoryType) => void;
  onOpenDetail: (item: ContactEntity) => void;
}

export function DirectoryPage({
  activeType,
  selectedItem,
  onTypeChange,
  onOpenDetail,
}: DirectoryPageProps) {
  const { t } = useLocale();
  const [query, setQuery] = useState("");
  const [onlineOnly, setOnlineOnly] = useState(false);
  const deferredQuery = useDeferredValue(query);

  const items = activeType === "employees" ? employees : organizations;

  const filteredItems = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();

    return items.filter((item) => {
      const matchesQuery =
        !normalized ||
        [item.name, item.title, item.description, item.department, item.tags.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      const matchesAvailability = !onlineOnly || item.availability === "online";

      return matchesQuery && matchesAvailability;
    });
  }, [deferredQuery, items, onlineOnly]);

  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/70">{t.directory.title}</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-primary sm:text-6xl">
              {activeType === "employees" ? t.directory.employees : t.directory.organizations}
            </h1>
          </div>
          <div className="flex w-full flex-col gap-3 xl:max-w-3xl xl:flex-row">
            <SearchField onChange={setQuery} placeholder={t.directory.search} value={query} />
            <Button onClick={() => setOnlineOnly((value) => !value)} variant={onlineOnly ? "secondary" : "outline"}>
              <SlidersHorizontal className="h-4 w-4" />
              {t.directory.onlineOnly}
            </Button>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {[
            { key: "employees" as const, label: t.directory.employees, icon: UserRound },
            { key: "organizations" as const, label: t.directory.organizations, icon: Building2 },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              className={cn(
                "inline-flex min-h-12 items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold transition-all",
                activeType === key ? "bg-primary text-white shadow-kiosk" : "bg-white/70 text-slate-600 hover:bg-white",
              )}
              onClick={() => onTypeChange(key)}
              type="button"
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </Card>

      {selectedItem ? (
        <Card className="border-primary/20 bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
          <p className="text-sm text-slate-700">
            Active selection: <span className="font-semibold">{selectedItem.name}</span>
          </p>
        </Card>
      ) : null}

      {filteredItems.length ? (
        <DirectoryGrid items={filteredItems} onOpen={onOpenDetail} />
      ) : (
        <Card className="p-10 text-center text-slate-600">{t.directory.noResults}</Card>
      )}
    </div>
  );
}
