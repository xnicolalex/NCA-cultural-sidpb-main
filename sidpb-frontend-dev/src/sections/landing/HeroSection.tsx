import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-primary/10 text-primary text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-none bg-accent animate-pulse" />
            Plataforma Cientifica
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Monitoramento da Distribuição de <span className="text-primary">Doenças Parasitárias</span> no Brasil
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-pretty">
            Plataforma dedicada ao mapeamento e análise da distribuição de doenças parasitárias no território brasileiro,
            fornecendo dados científicos para pesquisadores e profissionais das áreas de saúde animal, saúde humana e parasitologia.
          </p>
          <div className="flex justify-center">
            <Button size="lg" asChild>
              <Link href="/dashboard">Visualizar Plataforma</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
