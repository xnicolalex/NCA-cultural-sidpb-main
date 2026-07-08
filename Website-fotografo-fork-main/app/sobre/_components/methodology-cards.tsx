import { BookOpen } from "lucide-react";
import { methodology } from "../_data";

export function MethodologyCards() {
  return (
    <section className="py-12 md:py-20" id="metodologia">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <div className="rounded-lg bg-primary/10 p-2 md:p-3"><BookOpen className="h-5 w-5 md:h-6 md:w-6 text-primary" /></div>
          <h2 className="font-serif text-2xl md:text-4xl font-bold">Metodologia</h2>
        </div>
        <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-12 max-w-3xl leading-relaxed">Nosso processo garante qualidade, respeito cultural e transparência em todas as etapas.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {methodology.map((item, index) => (
            <div key={index} className="rounded-xl border border-border bg-card p-5 md:p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <span className="font-serif text-xl md:text-2xl font-bold text-primary/30">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="font-semibold text-base md:text-lg">{item.title}</h3>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}