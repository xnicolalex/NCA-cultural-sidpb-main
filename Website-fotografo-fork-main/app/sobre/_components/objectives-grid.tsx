import { Target, CheckCircle2 } from "lucide-react";
import { objectives } from "../_data";

export function ObjectivesGrid() {
  return (
    <section className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <div className="rounded-lg bg-primary/10 p-2 md:p-3"><Target className="h-5 w-5 md:h-6 md:w-6 text-primary" /></div>
          <h2 className="font-serif text-2xl md:text-4xl font-bold">Objetivos do Projeto</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {objectives.map((objective, index) => (
            <div key={index} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm leading-relaxed">{objective}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}