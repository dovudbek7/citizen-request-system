import { Clock3 } from "lucide-react";
import { motion } from "framer-motion";
import { AvatarFallback } from "@/components/common/avatar-fallback";
import { StatusBadge } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/hooks/use-locale";
import type { ContactEntity } from "@/lib/types";

interface DirectoryGridProps {
  items: ContactEntity[];
  onOpen: (item: ContactEntity) => void;
}

export function DirectoryGrid({ items, onOpen }: DirectoryGridProps) {
  const { t } = useLocale();

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.06 }}
          whileHover={{ y: -6 }}
        >
          <Card className="flex h-full flex-col p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="h-20 w-20 overflow-hidden rounded-[24px]">
                <AvatarFallback name={item.name} src={item.avatar} type={item.type} />
              </div>
              <StatusBadge availability={item.availability} />
            </div>
            <div className="mt-5 flex-1">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/70">{item.department}</p>
              <h3 className="mt-2 font-display text-2xl font-black text-slate-950">{item.name}</h3>
              <p className="mt-2 text-base font-medium text-secondary">{item.title}</p>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{item.description}</p>
            </div>
            <div className="mt-5 flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-600">
              <Clock3 className="h-4 w-4 text-primary" />
              <span>{t.directory.workingHours}: {item.workingHours}</span>
            </div>
            <Button className="mt-5 w-full" onClick={() => onOpen(item)} variant="outline">
              {t.directory.openProfile}
            </Button>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
