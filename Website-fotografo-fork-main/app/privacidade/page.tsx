export const dynamic = "force-dynamic"

import Link from "next/link"
import { notFound } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MarkdownViewer } from "@/components/markdown-viewer"
import { ScrollToTop } from "@/components/scroll-to-top"

interface PrivacySection {
  id: string
  num: string
  title: string
  content: string 
}

function SectionCard({ section }: { section: PrivacySection }) {
  return (
    <div id={section.id} className="bg-white rounded-[1.5rem] md:rounded-[3rem] shadow-lg hover:shadow-xl transition-shadow duration-300 px-6 py-8 md:px-10 md:py-10 scroll-mt-24 md:scroll-mt-32">
      <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
        <span aria-hidden="true" className="font-serif text-4xl md:text-6xl font-normal leading-none text-primary/10 select-none flex-shrink-0">{section.num}</span>
        <h2 className="font-black text-xl md:text-2xl text-foreground pt-1 md:pt-2">{section.title}</h2>
      </div>
      <MarkdownViewer content={section.content} />
    </div>
  )
}

function SidebarLink({ href, num, label }: { href: string; num: string; label: string }) {
  return (
    <a href={href} className="flex items-center gap-2 text-sm text-muted-foreground px-3 py-2 rounded-xl border-l-2 border-transparent hover:bg-primary/10 hover:text-[#0056A4] hover:border-[#0056A4] transition-all duration-150 min-h-[44px]">
      <span className="text-xs text-muted-foreground/40 font-mono flex-shrink-0">{num}</span>
      {label}
    </a>
  )
}

export default async function PrivacidadePage() {
  const prisma = new PrismaClient()

  let sections: PrivacySection[] = []
  let versao = "1.0"

  try {
    const politica = await prisma.politicaDePrivacidade.findFirst({ orderBy: { data_vigencia: "desc" } })
    if (!politica) notFound()
    versao = politica.versao
    try {
      sections = JSON.parse(politica.conteudo) as PrivacySection[]
    } catch (parseError) {
      console.error("Erro Crítico: O conteúdo do banco não é um JSON válido para a Política de Privacidade.", parseError)
      sections = [] 
    }
  } finally {
    await prisma.$disconnect()
  }

  if (sections.length === 0) notFound()

  return (
    <main className="min-h-screen bg-background">
      <ScrollToTop />
      <SiteHeader />

      <section className="relative min-h-[35vh] md:min-h-[45vh] flex items-center justify-center bg-neutral-50 overflow-hidden">
        <img src="/azulejossite.svg" alt="" aria-hidden="true" className="hidden sm:block absolute top-0 left-0 w-64 md:w-96 pointer-events-none opacity-80 z-0" />
        <img src="/azulejossite.svg" alt="" aria-hidden="true" className="hidden sm:block absolute bottom-0 right-0 w-64 md:w-96 pointer-events-none rotate-180 opacity-80 z-0" />

        <div className="relative z-10 text-center space-y-4 md:space-y-5 px-4 sm:px-6">
          <p className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground font-medium">Última atualização: Abril de 2025</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal text-foreground leading-[0.95] text-balance">Política de Privacidade</h1>
          <p className="text-sm md:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">Leia com atenção a política que rege o tratamento dos dados da plataforma e a sua privacidade enquanto usuário. Se tiver dúvidas, entre em contato conosco.</p>

          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 pt-2 text-[10px] md:text-xs text-muted-foreground/60">
            <span>{sections.length} seções</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40 hidden sm:block" />
            <span>Versão {versao}</span>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container mx-auto px-4 md:px-8 py-10 md:py-20 max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 md:gap-10">

            <aside className="hidden lg:block">
              <div className="sticky top-24 bg-white rounded-[2rem] shadow-lg p-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4">Nesta página</p>
                <nav className="flex flex-col gap-1">
                  {sections.map((s) => (
                    <SidebarLink key={s.id} href={`#${s.id}`} num={s.num} label={s.title} />
                  ))}
                </nav>
              </div>
            </aside>

            <div className="flex flex-col gap-5 md:gap-6">
              {sections.map((section) => (
                <SectionCard key={section.id} section={section} />
              ))}

              <div className="bg-neutral-900 rounded-[1.5rem] md:rounded-[3rem] p-6 md:px-10 md:py-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 md:gap-6 mt-4">
                <div>
                  <h3 className="font-serif text-xl md:text-2xl text-white mb-1">Dúvidas sobre a política de privacidade?</h3>
                  <p className="text-xs md:text-sm text-neutral-400">Entre em contato com nossa equipe.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto flex-shrink-0">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-neutral-900 hover:bg-neutral-100 rounded-full px-6 py-4 md:px-8 md:py-6 text-sm md:text-base font-semibold transition-all min-h-[44px]" asChild>
                    <Link href="/contato">Falar com a Equipe</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 rounded-full px-6 py-4 md:px-8 md:py-6 text-sm md:text-base bg-transparent transition-all min-h-[44px]" asChild>
                    <Link href="/">Voltar ao Início</Link>
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}