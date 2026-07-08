"use client"
import { Upload, FileText, CheckCircle2, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useContribuirClick } from "@/hooks/useContribuirClick"

const stepCardHoverStyle = `
  .azulejo-step-card:hover {
    border-color: rgba(33, 114, 190, 0.35);
    box-shadow: 0 4px 16px rgba(33, 114, 190, 0.08);
  }
`

export function HowItWorksSection() {
  const { handleContribuirClick } = useContribuirClick()

  const steps = [
    {
      number: "01",
      icon: Upload,
      title: "Envie Suas Imagens",
      description:
        "Faça upload de fotos de manifestações culturais maranhenses. Suportamos múltiplos arquivos e alta resolução.",
    },
    {
      number: "02",
      icon: FileText,
      title: "Adicione Contexto",
      description:
        "Preencha metadados essenciais: localização, data, manifestação cultural e descrição etnográfica detalhada.",
    },
    {
      number: "03",
      icon: CheckCircle2,
      title: "Revisão por Curadoria",
      description:
        "Nossa equipe de curadores e especialistas culturais verifica a qualidade e a contextualização das imagens.",
    },
    {
      number: "04",
      icon: Share2,
      title: "Compartilhe com o Mundo",
      description:
        "Suas imagens aprovadas integram o dataset público, beneficiando educação, pesquisa e preservação cultural.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-white border-y border-border">
      <style>{stepCardHoverStyle}</style>
      <div className="container mx-auto px-4 lg:px-8">

        <div className="text-center mb-12 md:mb-20">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground text-balance">Como Funciona a Contribuição</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">Um processo simples e transparente para garantir qualidade e respeito cultural.</p>
        </div>

        <div className="grid gap-6 md:gap-10 md:grid-cols-2 max-w-5xl mx-auto mb-12 md:mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">

              {index % 2 === 0 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-[1px] bg-border z-0" />
              )}

              <div className="azulejo-step-card relative z-10 bg-neutral-50 rounded-[1.5rem] md:rounded-3xl border border-border p-6 md:p-10 shadow-sm transition-all duration-300 h-full flex flex-col">
                <div className="mb-4 md:mb-6 flex items-start justify-between">
                  <span className="font-serif text-4xl md:text-5xl font-bold select-none" style={{ color: "rgba(33,114,190,0.18)" }}>{step.number}</span>

                  <div className="rounded-full bg-white shadow-sm p-3 md:p-4" style={{ border: "1px solid rgba(33,114,190,0.2)" }}>
                    <step.icon className="h-5 w-5 md:h-6 md:w-6 text-neutral-900" />
                  </div>
                </div>

                <h3 className="font-bold text-xl md:text-2xl mb-2 md:mb-3 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground text-sm md:text-lg leading-relaxed flex-1">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center w-full px-2 sm:px-0">
          <Button size="lg" className="w-full sm:w-auto bg-black text-white hover:bg-neutral-800 px-6 md:px-8 py-6 rounded-full text-base md:text-lg shadow-md transition-transform hover:-translate-y-1" onClick={handleContribuirClick}>Começar Agora</Button>
        </div>

      </div>
    </section>
  )
}