import { BarChart3, FileText, MapPin, Users } from "lucide-react"
import { FeatureCard } from "@/components/molecules/FeatureCard"

export function FeaturesSection() {
  return (
    <section className="py-16 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-semibold text-foreground mb-3">Funcionalidades da Plataforma</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ferramentas desenvolvidas para auxiliar a pesquisa e o monitoramento epidemiológico
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <FeatureCard icon={<MapPin className="w-6 h-6" />} title="Mapa Interativo" description="Visualize a distribuição geográfica de ocorrências em todo o Brasil com filtros por região, hospedeiro e período." />
          <FeatureCard icon={<BarChart3 className="w-6 h-6" />} title="Estatísticas e Graficos" description="Analise tendências temporais e regionais através de visualizações estatísticas detalhadas dos dados coletados." />
          <FeatureCard icon={<FileText className="w-6 h-6" />} title="Base de Artigos" description="Acesse a lista de artigos científicos que fundamentam os dados da plataforma, com filtros por tipo e região." />
          <FeatureCard icon={<Users className="w-6 h-6" />} title="Filtro por Hospedeiro" description="Filtre ocorrências por tipo de hospedeiro: animais de produção, silvestres, de criação, humanos e outros." />
          <FeatureCard icon={<FileText className="w-6 h-6" />} title="Relatorios Completos" description="Gere relatórios consolidados com estatísticas e visualizações para apoiar análises científicas." />
          <FeatureCard icon={<MapPin className="w-6 h-6" />} title="Dados por Vetor" description="Visualize informações específicas sobre os vetores e sua distribuição no território brasileiro." />
        </div>
      </div>
    </section>
  )
}
