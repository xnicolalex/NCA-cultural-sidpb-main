import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-semibold text-foreground mb-4">Pronto para explorar?</h3>
          <p className="text-muted-foreground mb-8">
            Acesse a plataforma e explore os dados de distribuição de doenças parasitárias no Brasil.
          </p>
          <Button size="lg" asChild>
            <Link href="/dashboard">Acessar Plataforma</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
