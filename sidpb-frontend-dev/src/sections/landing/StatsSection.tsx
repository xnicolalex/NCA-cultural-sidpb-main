import { StatCard } from "@/components/molecules/StatCard"

export function StatsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold text-foreground mb-3">Dados Cientificos</h3>
            <p className="text-muted-foreground">
              Baseado em revisão abrangente da literatura científica sobre <em>C. hominivorax</em> no Brasil
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard value="174" label="Artigos Analisados" />
            <StatCard value="208" label="Municípios Registrados" />
            <StatCard value="26" label="Estados Cobertos" />
            <StatCard value="142" label="Anos de Dados" sublabel="(1875-2017)" />
          </div>
        </div>
      </div>
    </section>
  )
}
