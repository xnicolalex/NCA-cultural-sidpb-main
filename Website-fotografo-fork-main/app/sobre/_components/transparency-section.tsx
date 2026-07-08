import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function TransparencySection() {
  return (
    <section className="py-12 md:py-20 bg-primary/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-4 md:mb-6">Transparência e Políticas</h2>
          <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed">Acesse nossa documentação completa sobre licenças, privacidade e uso dos dados.</p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center w-full px-2 sm:px-0">
            <Button asChild variant="outline" className="w-full sm:w-auto text-xs sm:text-sm py-5 sm:py-6 px-6 sm:px-8 rounded-full transition-all"><Link href="/termos">Termos de Uso<ExternalLink className="ml-2 h-4 w-4" /></Link></Button>
            <Button asChild variant="outline" className="w-full sm:w-auto text-xs sm:text-sm py-5 sm:py-6 px-6 sm:px-8 rounded-full transition-all"><Link href="/privacidade">Política de Privacidade<ExternalLink className="ml-2 h-4 w-4" /></Link></Button>
            <Button asChild variant="outline" className="w-full sm:w-auto text-xs sm:text-sm py-5 sm:py-6 px-6 sm:px-8 rounded-full transition-all"><Link href="/docs">Documentação Técnica<ExternalLink className="ml-2 h-4 w-4" /></Link></Button>
          </div>
        </div>
      </div>
    </section>
  );
}