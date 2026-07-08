"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useContribuirClick } from "@/hooks/useContribuirClick"

export function HeroSection() {
  const { handleContribuirClick } = useContribuirClick()
  return (
    <section className="relative min-h-[90svh] flex items-center justify-center bg-neutral-50 overflow-hidden">
      <img src="/azulejossite.svg" alt="Animação de azulejos históricos." className="hidden sm:block absolute top-0 left-0 w-64 md:w-96 lg:w-[28rem] xl:w-[32rem] pointer-events-none z-0" />
      <img src="/azulejossite.svg" alt="Animação de azulejos históricos." className="hidden sm:block absolute bottom-0 right-0 w-64 md:w-96 lg:w-[28rem] xl:w-[32rem] pointer-events-none rotate-180 z-0" />
      <div className="relative z-10 max-w-[92%] sm:max-w-xl md:max-w-2xl lg:max-w-5xl px-4 sm:px-6 text-center space-y-6 md:space-y-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl leading-[0.95] font-serif text-neutral-900 text-balance">
          <span className="block">Dataset</span>
          <span className="block">Multimodal</span>
          <span className="block">Cultural</span>
          <span className="block">Maranhense</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          O conjunto de dados para documentar o patrimônio e inovar representação tecnológica da cultura do Maranhão.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Button size="lg" className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 text-neutral-50 px-6 py-4 text-sm sm:px-8 sm:py-6 sm:text-base rounded-full transition-all" onClick={handleContribuirClick}>
            Contribua com suas Imagens
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-neutral-50 px-6 py-4 text-sm sm:px-8 sm:py-6 sm:text-base rounded-full transition-all bg-transparent" asChild>
            <Link href="/faq">Saiba Mais</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}