import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import type { FaqItem, Locale } from "@/lib/types";

interface FaqAccordionProps {
  items: FaqItem[];
  locale: Locale;
}

export function FaqAccordion({ items, locale }: FaqAccordionProps) {
  return (
    <Accordion className="space-y-4" collapsible type="single">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card>
            <AccordionItem value={item.id}>
              <AccordionTrigger>{item.question[locale]}</AccordionTrigger>
              <AccordionContent>
                {item.answer[locale]}
              </AccordionContent>
            </AccordionItem>
          </Card>
        </motion.div>
      ))}
    </Accordion>
  );
}
