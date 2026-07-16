"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react" 
import { toast } from "sonner"
import { useAuth } from "@/contexts/auth-context"
import { AuthModal } from "@/components/auth-modal"
import { withBasePath } from "@/lib/paths"

export function SiteHeader() {
  const { user, logoutSessao } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const handleOpenModal = () => setIsModalOpen(true)
    window.addEventListener("openLoginModal", handleOpenModal)
    return () => window.removeEventListener("openLoginModal", handleOpenModal)
  }, [])

  const handleLogout = () => {
    logoutSessao()
    toast.info("Sessão terminada de forma segura. Até breve!")
  }

  const navigation = [
    { name: "Início", href: "/" },
    { name: "Sobre o Projeto", href: "/sobre" },
    { name: "FAQ", href: "/faq" },
    { name: "Contato", href: "/contato" },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto flex h-16 sm:h-20 items-center justify-between px-4 lg:px-8">
          
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-lg flex items-center justify-center overflow-hidden">
              <img src={withBasePath("/logo.svg")} alt="Logo do NCA" className="object-contain p-1 text-primary-foreground" />
            </div>
            <div className="hidden md:block">
              <div className="font-serif text-lg font-bold leading-tight text-foreground">Dataset Multimodal</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">{item.name}</Link>
            ))}
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/perfil" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">MEU PERFIL</Link>
                {user.papel_acesso === "ANOTADOR" && <Link href="/anotacao" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">ANOTAÇÃO</Link>}
                {user.papel_acesso === "CURADOR" && <Link href="/curadoria" className="text-sm font-medium text-emerald-600 hover:text-emerald-800 transition-colors">CURADORIA</Link>}
                {user.papel_acesso === "ADMINISTRADOR" && <Link href="/admin" className="text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors">ADMIN</Link>}
                <Button size="sm" variant="outline" onClick={handleLogout}>SAIR</Button>
              </div>
            ) : (
              <Button size="sm" className="hidden md:inline-flex bg-black text-white" onClick={() => setIsModalOpen(true)}>ENTRAR</Button>
            )}

            <button type="button" className="md:hidden rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground min-h-[44px] min-w-[44px] flex items-center justify-center" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} className="block py-3 text-base font-medium text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMobileMenuOpen(false)}>{item.name}</Link>
              ))}
              
              {user ? (
                <>
                  <Link href="/perfil" className="block py-3 text-base font-medium text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMobileMenuOpen(false)}>MEU PERFIL</Link>
                  {user.papel_acesso === "ANOTADOR" && <Link href="/anotacao" className="block py-3 text-base font-medium text-blue-600 hover:text-blue-800 transition-colors" onClick={() => setMobileMenuOpen(false)}>ANOTAÇÃO</Link>}
                  {user.papel_acesso === "CURADOR" && <Link href="/curadoria" className="block py-3 text-base font-medium text-emerald-600 hover:text-emerald-800 transition-colors" onClick={() => setMobileMenuOpen(false)}>CURADORIA</Link>}
                  {user.papel_acesso === "ADMINISTRADOR" && <Link href="/admin" className="block py-3 text-base font-medium text-purple-600 hover:text-purple-800 transition-colors" onClick={() => setMobileMenuOpen(false)}>ADMIN</Link>}
                  <Button variant="outline" className="w-full mt-4 min-h-[44px]" onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>SAIR</Button>
                </>
              ) : (
                <Button className="w-full mt-4 bg-black text-white min-h-[44px]" onClick={() => { setIsModalOpen(true); setMobileMenuOpen(false); }}>ENTRAR</Button>
              )}
            </div>
          </div>
        )}
      </header>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onLoginSuccess={() => setIsModalOpen(false)} />
    </>
  )
}
