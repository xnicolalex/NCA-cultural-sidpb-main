import { Award, Eye, Heart, Shield, TrendingUp, Users } from "lucide-react"

export function ContributionBenefits() {
  const benefits = [
    {
      icon: Shield,
      title: "Impacto Cultural",
      description: "Contribua diretamente para a preservação e documentação digital do patrimônio cultural maranhense, reconhecendo o papel fundamental das manifestações culturais regionais na formação da identidade coletiva.",
    },
    {
      icon: Eye,
      title: "Impacto Tecnológico",
      description: "Ajude a permitir o desenvolvimento de aplicações tecnológicas culturalmente relevantes, como guias turísticos virtuais, jogos educativos e experiências de realidade aumentada baseadas em elementos autênticos da nossa cultura.",
    },
    {
      icon: Award,
      title: "Representação Justa",
      description: "O projeto contribuirá para que modelos de IA reconheçam e gerem imagens mais precisas e respeitosas das manifestações culturais regionais, combatendo estereótipos e representações simplificadas.",
    },
    {
      icon: Heart,
      title: "Inovação Científica",
      description: "Sua contribuição para este dataset representa um passo fundamental para a democratização tecnológica.",
    },
    {
      icon: TrendingUp,
      title: "Você Mantém os Direitos",
      description: "Todas as suas fotos permanecem sob sua autoria. Você escolhe a licença de uso.",
    },
    {
      icon: Users,
      title: "Crédito em Todas as Imagens",
      description: "Seu nome aparece como autor no dataset para todas as fotos que colaborar, a equipe do dataset cultural garantirá a visibilidade do fotógrafo de todas as formas possíveis.",
    },
  ]

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Por Que Contribuir?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Descubra como você está ajudando na evolução tecnológica do Maranhão ao participar deste projeto colaborativo
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="rounded-xl border border-border bg-card p-6 hover:shadow-md transition-shadow">
              <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}