import { Globe, Plus, SendHorizonal, SearchCheck, Lightbulb, BookCheck, Fingerprint } from "lucide-react"
import { Carousel } from "@/components/carousel"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const cards = [
  {
    icon: SearchCheck,
    title: "Preservação",
    description:
      "A união e categorização de milhares de imagens com ricas descrições cria um acervo digital estruturado. Essa iniciativa garante que a memória e a riqueza da cultura maranhense sejam devidamente documentadas e protegidas.",
  },
  {
    icon: BookCheck,
    title: "Inclusão",
    description:
      "Ao disponibilizar esse acervo, a cultura maranhense rompe barreiras e passa a ocupar novos espaços tecnológicos. Isso permite que as tradições locais ganhem visibilidade e alcancem públicos e lugares antes não incluídos.",
  },
  {
    icon: Fingerprint,
    title: "Representatividade",
    description:
      "O projeto garante que as manifestações culturais regionais sejam retratadas de forma precisa e respeitosa. Ao combater estereótipos e representações simplificadas, as tradições ganham a devida voz e imagem.",
  },
  {
    icon: Lightbulb,
    title: "Inovação",
    description:
      "A iniciativa avança na fronteira tecnológica ao capacitar modelos de Inteligência Artificial com dados culturais ricos. Isso permite que a tecnologia aprenda a reconhecer e gerar imagens autênticas da nossa cultura.",
  },
]

const aiLogos = [
  { src: "/CHATGPT.png",    alt: "ChatGPT",    delay: "0s",    duration: "2.4s" },
  { src: "/MIDJOURNEY.png", alt: "MidJourney",  delay: "0.35s", duration: "2.8s" },
  { src: "/GEMINI.png",     alt: "Gemini",      delay: "0.7s",  duration: "2.2s" },
]

export function AboutSection() {
  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px);   }
          50%       { transform: translateY(-10px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .azulejo-card:hover {
          border-color: rgba(33, 114, 190, 0.35);
          box-shadow: 0 4px 16px rgba(33, 114, 190, 0.08);
        }
      `}</style>

      <section className="min-h-screen bg-background">

        <div className="container mx-auto px-4 md:px-8 py-12 md:py-20 max-w-[1400px]">
          <div className="mb-12 md:mb-8 flex flex-col lg:flex-row gap-8 lg:gap-20">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance">
                Conjunto de Dados para Inovar a realidade tecnológica Maranhense
              </h1>
            </div>
            <div className="lg:w-1/2">
              <p className="text-sm uppercase tracking-wide text-muted-foreground mb-4">
                Objetivo
              </p>
              <p className="text-base md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Este é um projeto do Núcleo de Computação Aplicada (NCA) da Universidade Federal do Maranhão. O nosso objetivo é criar um grande repositório de dados iconográficos da cultura maranhense, a fim de mitigar a subrepresentação do estado nos modelos de Inteligência Artificial emergentes.
              </p>
            </div>
          </div>

          <div className="flex justify-center mb-10 px-0 sm:px-1 py-10 md:py-20">

            <div className="relative w-full lg:w-[95%] min-h-[600px] md:min-h-[800px] pt-16 md:pt-20 pb-40 md:pb-60 px-4 md:px-20 rounded-3xl md:rounded-[3rem] shadow-2xl flex flex-col items-center gap-6 overflow-hidden" style={{ background: "linear-gradient(to right, #ede9e3, #f0ede8, #f5f3ef)" }}>
 
              <div className="absolute top-4 md:top-10 left-4 md:left-10 w-40 h-40 md:w-72 md:h-72 rounded-full pointer-events-none select-none" style={{ background: "radial-gradient(circle, rgba(33,114,190,0.12) 0%, transparent 70%)" }} />
              <div className="absolute bottom-20 md:bottom-40 right-4 md:right-10 w-64 h-64 md:w-96 md:h-96 rounded-full pointer-events-none select-none" style={{ background: "radial-gradient(circle, rgba(33,114,190,0.08) 0%, transparent 70%)" }} />

              <h2 className="text-3xl md:text-6xl font-black text-neutral-900 text-center font-extrabold relative z-10">
                A IA Não enxerga o Maranhão
              </h2>
              <p className="text-neutral-700 max-w-2xl text-center text-base md:text-lg mb-6 md:mb-10 relative z-10">
                Atualmente, as IAs globais não conhecem a riqueza dos nossos detalhes.
                Elas replicam estereótipos porque faltam dados reais.
                Quando a cultura maranhense não está presente nos dados de treinamento, a IA inventa versões simplificadas da nossa identidade.
                Essas imagens circulam, se repetem e passam a representar algo que não somos.
              </p>

              <div className="relative w-full flex justify-center items-center pt-6 md:pt-10">
                <div className="relative overflow-visible z-40 w-full max-w-[1000px] min-h-[450px] md:min-h-[600px] p-4 md:p-10 rounded-2xl md:rounded-[2rem] flex flex-col items-center justify-center" style={{ background: "#ffffff", border: "1px solid #d1d5db", boxShadow: "0 20px 40px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0,0,0,0.05)" }}>
  
                  <div className="absolute top-0 left-0 w-full h-12 md:h-20 overflow-hidden rounded-t-[1rem] md:rounded-t-[1.3rem]">
                    <div className="min-h-[40px] md:min-h-[60px] w-[110%] -ml-[5%]" style={{ background: "#f9f9f9", borderBottom: "1px solid #d1d5db" }} />
                  </div>

                  <div className="flex flex-wrap justify-center -space-x-4 md:-space-x-10 pb-2 pt-12 md:pt-20">
                    {aiLogos.map((logo, i) => (
                      <img key={logo.alt} className="h-16 w-16 md:h-24 md:w-24 bg-gray-50 border border-gray-300 shadow-sm rounded-full object-cover select-none pointer-events-none" src={logo.src} alt={logo.alt} style={{ animation: `float ${logo.duration} ease-in-out infinite`, animationDelay: logo.delay, zIndex: 10 + i * 10 }} />
                    ))}
                  </div>

                  <div className="bg-white border border-gray-300 mt-8 md:mt-10 mb-16 md:mb-20 rounded-[2rem] md:rounded-[35px] w-full md:w-[80%] flex flex-row items-center justify-between px-4 md:px-6 py-3 md:py-4 shadow-[0_0_15px_rgba(0,0,0,0.05)] gap-3 md:gap-0">
                    <div className="flex flex-col flex-1 overflow-hidden">
                      <p className="text-[#0D0D0D] text-sm md:text-xl font-medium mb-1 md:mb-2 truncate md:overflow-visible md:whitespace-normal">
                        Gere uma imagem de apresentação de cacuriá no Maranhão
                        <span className="ml-0.5 font-light" style={{ color: "#000000", animation: "blink 1.1s step-end infinite" }} aria-hidden="true"> | </span>
                      </p>
                      <div className="flex items-center gap-2 md:gap-3 text-gray-400">
                        <Plus className="w-4 h-4 md:w-5 md:h-5 cursor-default hover:text-black stroke-3" />
                        <div className="flex items-center gap-2 md:gap-3 cursor-default hover:text-black">
                          <Globe className="w-4 h-4 md:w-5 md:h-5" />
                          <p className="text-xs md:text-sm font-black">Pesquisar na Web</p>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full translate-y-1/2 z-50">
                        <Carousel />
                      </div>
                    </div>
                    <div className="ml-2 md:ml-4 rounded-full bg-black hover:bg-gray-800 p-3 md:p-4 shrink-0 flex items-center justify-center cursor-default transition-colors">
                      <SendHorizonal className="text-white w-5 h-5 md:w-6 md:h-6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-neutral-950 py-16 md:py-24 mb-20 md:mb-32 border-y border-neutral-800">
          <div className="container mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-12">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight mb-4 md:mb-6">
                Um conjunto de imagens pode reduzir a falta de representação da nossa cultura.
              </h2>
              <p className="text-neutral-400 text-base md:text-lg mb-6 md:mb-8">
                O Maranhão pode ser melhor representado nas tecnologias emergentes. O projeto tem como objetivo a criação de uma coleção de imagens para apoiar o treino da inteligência artificial e a preservação da nossa cultura.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                <Button asChild size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-neutral-200">
                  <Link href="/contribuir">Colaborar com Imagens</Link>
                </Button>
                <p className="text-sm text-neutral-500 font-medium">
                  Participe na preservação tecnológica.
                </p>
              </div>
            </div>
            <div className="w-full sm:w-3/4 lg:w-2/5">
              <img src="/bumbaDanca.png" alt="Bumba Meu Boi" className="rounded-2xl object-cover aspect-square shadow-2xl w-full" />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 pb-20 md:pb-32 flex flex-col items-center justify-center gap-10 md:gap-16">
          <h3 className="text-foreground font-serif font-bold text-3xl md:text-4xl lg:text-5xl text-center max-w-3xl">
            Como um conjunto de imagens estruturado pode ajudar?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
            {cards.map((card) => (
              <div key={card.title} className="azulejo-card flex flex-col gap-3 md:gap-4 p-6 md:p-10 bg-white border border-border rounded-[1.5rem] md:rounded-3xl transition-all duration-300">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-1 md:mb-2" style={{ background: "rgba(33,114,190,0.08)" }}>
                  <card.icon className="w-5 h-5 md:w-6 md:h-6 text-neutral-900" />
                </div>
                <h4 className="text-foreground font-bold text-xl md:text-2xl">{card.title}</h4>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </section>
    </>
  )
}