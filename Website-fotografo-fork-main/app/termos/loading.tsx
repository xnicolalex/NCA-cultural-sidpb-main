import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Skeleton */}
      <section className="relative min-h-[45vh] flex items-center justify-center bg-neutral-50 animate-pulse">
        <div className="relative text-center space-y-6 px-6 w-full max-w-2xl flex flex-col items-center">
          {/* Badge "Última atualização" */}
          <div className="h-3 w-40 bg-neutral-200 rounded-full" />
          
          {/* Título Grande */}
          <div className="h-16 w-3/4 sm:w-full bg-neutral-200 rounded-2xl" />
          
          {/* Subtítulo */}
          <div className="space-y-2 flex flex-col items-center w-full">
            <div className="h-4 w-5/6 bg-neutral-200 rounded-full" />
            <div className="h-4 w-4/6 bg-neutral-200 rounded-full" />
          </div>

          {/* Metadados (7 seções - Versão 1.0) */}
          <div className="h-3 w-32 bg-neutral-200 rounded-full mt-4" />
        </div>
      </section>

      {/* Conteúdo Principal Skeleton */}
      <section className="bg-background animate-pulse">
        <div className="container mx-auto px-8 py-20 max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">

            {/* Sidebar Skeleton (escondido em mobile) */}
            <aside className="hidden lg:block">
              <div className="sticky top-8 bg-white rounded-[2rem] shadow-sm p-6 border border-neutral-100 min-h-[300px] flex flex-col gap-4">
                <div className="h-3 w-24 bg-neutral-200 rounded-full mb-2" />
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-6 w-full bg-neutral-100 rounded-xl" />
                ))}
              </div>
            </aside>

            {/* Cards de Seção Skeleton */}
            <div className="flex flex-col gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-[3rem] shadow-sm border border-neutral-100 px-10 py-10 min-h-[300px]">
                  {/* Número e Título do Card */}
                  <div className="flex items-start gap-4 mb-8">
                    <div className="h-16 w-16 bg-neutral-100 rounded-2xl flex-shrink-0" />
                    <div className="h-8 w-3/4 bg-neutral-200 rounded-xl mt-2" />
                  </div>
                  
                  {/* Linhas de texto do Card */}
                  <div className="space-y-4">
                    <div className="h-4 w-full bg-neutral-100 rounded-full" />
                    <div className="h-4 w-full bg-neutral-100 rounded-full" />
                    <div className="h-4 w-5/6 bg-neutral-100 rounded-full" />
                    <div className="h-20 w-full bg-primary/5 rounded-xl my-6 border-l-4 border-primary/20" /> {/* Imita a caixa azul */}
                    <div className="h-4 w-full bg-neutral-100 rounded-full" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}