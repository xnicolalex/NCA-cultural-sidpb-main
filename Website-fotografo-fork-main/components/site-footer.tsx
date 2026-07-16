"use client"

import Link from "next/link"
import { useContribuirClick } from "@/hooks/useContribuirClick"
import { withBasePath } from "@/lib/paths"

interface FooterLink {
  name: string
  href?: string
  onClick?: () => void
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

export function SiteFooter() {
  const { handleContribuirClick } = useContribuirClick()

  const footerSections: FooterSection[] = [
    {
      title: "Projeto",
      links: [
        { name: "Sobre", href: "/sobre" },
        { name: "Metodologia", href: "/sobre#metodologia" },
      ],
    },
    {
      title: "Participar",
      links: [
        { name: "Como Contribuir", onClick: handleContribuirClick },
        { name: "Licenças", href: "/faq#licencas" },
      ],
    },
    {
      title: "Importante",
      links: [
        { name: "Termos de Uso", href: "/termos" },
        { name: "Política de Privacidade", href: "/privacidade" },
        { name: "Documentação", href: "/docs" },
        { name: "Contato", href: "/contato" },
      ],
    },
  ]

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid gap-10 md:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[auto_1fr]">
          <div className="pl-0 sm:pl-3 lg:pl-6 flex justify-center sm:justify-start">
            <Link href="/" className="flex items-center gap-3 mb-2 sm:mb-4">
              <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-lg flex items-center justify-center overflow-hidden">
                <img src={withBasePath("/logo.svg")} alt="Logo do NCA" className="object-contain p-1" />
              </div>
            </Link>
          </div>
          <div className="flex justify-center lg:justify-end w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-3xl text-center sm:text-left">
              {footerSections.map((section) => (
                <div key={section.title} className="flex flex-col items-center sm:items-start">
                  <h3 className="font-semibold text-foreground mb-3 sm:mb-4">{section.title}</h3>
                  <ul className="space-y-2 sm:space-y-3 flex flex-col items-center sm:items-start">
                    {section.links.map((link) => (
                      <li key={link.name} className="w-full text-center sm:text-left">
                        {link.onClick ? (
                          <button onClick={link.onClick} className="text-sm text-muted-foreground hover:text-foreground transition-colors w-full text-center sm:text-left py-1 sm:py-0">{link.name}</button>
                        ) : (
                          <Link href={link.href!} className="text-sm text-muted-foreground hover:text-foreground transition-colors block w-full py-1 sm:py-0">{link.name}</Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
