import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ContactCta() {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center rounded-2xl border border-border bg-card p-8 md:p-12">
          <HelpCircle className="h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-3 md:mb-4" />
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4">Ainda tem dúvidas?</h2>
          <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed">Nossa equipe está pronta para ajudar. Entre em contato e responderemos em breve.</p>
          <Button asChild size="lg" className="w-full sm:w-auto"><Link href="/contato">Falar Conosco</Link></Button>
        </div>
      </div>
    </section>
  );
}