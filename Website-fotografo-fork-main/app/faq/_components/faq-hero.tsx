import { BadgeCultural } from "@/components/ui/badge-cultural";

export function FaqHero() {
  return (
    <section className="py-12 md:py-24 bg-primary/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl">
          <BadgeCultural variant="default" className="mb-4">Perguntas Frequentes</BadgeCultural>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-balance">Tire Suas Dúvidas</h1>
          <p className="text-base md:text-xl text-muted-foreground leading-relaxed">Encontre respostas sobre contribuição, direitos autorais, boas práticas culturais e uso do dataset.</p>
        </div>
      </div>
    </section>
  );
}