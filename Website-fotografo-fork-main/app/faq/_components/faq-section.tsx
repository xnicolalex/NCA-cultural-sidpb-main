import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { LucideIcon } from "lucide-react";

interface FaqSectionProps {
  id: string;
  title: string;
  icon: LucideIcon;
  questions: { q: string; a: string }[];
}

export function FaqSection({ id, title, icon: Icon, questions }: FaqSectionProps) {
  return (
    <div id={id}>
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="rounded-lg bg-primary/10 p-2 md:p-3"><Icon className="h-5 w-5 md:h-6 md:w-6 text-primary" /></div>
        <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold">{title}</h2>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {questions.map((item, index) => (
          <AccordionItem key={index} value={`${id}-${index}`}>
            <AccordionTrigger className="text-left hover:no-underline py-3 md:py-4"><span className="font-semibold text-sm sm:text-base">{item.q}</span></AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm sm:text-base leading-relaxed pb-3 md:pb-4">{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}