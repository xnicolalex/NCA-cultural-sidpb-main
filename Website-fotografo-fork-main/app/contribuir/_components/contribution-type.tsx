"use client"

import Link from "next/link"
import { Upload, Folder } from "lucide-react"


export function ContributionTypes() {
 
  return (
    <section className="py-16 md:py-20"> 
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Como Contribuir?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            É muito fácil e rápido, você pode nos mandar um "Oi" ou contribuir pelo próprio site!
          </p>
        </div>
        <div className="max-w-6xl mx-auto bg-gradient-to-b from-white via-white/95 to-muted/5 rounded-3xl p-1 shadow-lg">
          <div className="grid gap-6 md:grid-cols-2 bg-card rounded-3xl p-8 md:p-10">
            <div className="relative flex flex-col justify-between gap-6 p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                  <Upload className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl font-semibold text-balance">
                    Contribua rápido pelo site
                  </h3>
                  <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
                    Deseja contribuir com poucas imagens ou de forma mais rápida? Use o formulário do site — é prático e direto. As imagens e os metadados que você enviar chegam direto para nossa equipe.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <Link
                  href="#metadata-step"
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium bg-yellow-500 text-white hover:bg-yellow-600 transition">
                  Contribuir pelo site
                </Link>
              </div>
            </div>
            <div className="relative flex flex-col justify-between gap-6 p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-secondary/10">
                  <Folder className="h-7 w-7 text-secondary" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl font-semibold text-balance">
                    Contribuições em lotes
                  </h3>
                  <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
                    Deseja enviar pastas inteiras ou estabelecer um contato direto com a equipe para coordenação e suporte? Conte-nos sobre o seu interesse e combinamos a melhor forma de colaboração.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <Link href="/contato"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:opacity-95 transition">
                  Entrar em contato!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}