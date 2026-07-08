"use client"

import Link from "next/link"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AppHeaderProps {
  compact?: boolean
  action?: "dashboard" | "home"
}

export function AppHeader({ compact = false, action = "dashboard" }: AppHeaderProps) {
  return (
    <header className="shrink-0 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className={compact ? "px-4 h-12 flex items-center justify-between" : "container mx-auto px-4 h-16 flex items-center justify-between"}>
        <Link href="/" className="flex items-center gap-3">
          <div className={compact ? "w-8 h-8 rounded-none bg-primary flex items-center justify-center" : "w-10 h-10 rounded-none bg-primary flex items-center justify-center"}>
            <MapPin className={compact ? "w-4 h-4 text-primary-foreground" : "w-5 h-5 text-primary-foreground"} />
          </div>
          <div>
            <h1 className={compact ? "text-sm font-semibold text-foreground leading-tight" : "text-lg font-semibold text-foreground leading-tight"}>SIDPB</h1>
            <p className="text-xs text-muted-foreground">Sistema de Informação de Doenças Parasitárias no Brasil</p>
          </div>
        </Link>

        {action === "dashboard" ? (
          <Button asChild>
            <Link href="/dashboard">Visualizar Plataforma</Link>
          </Button>
        ) : (
          <Button asChild variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-foreground">
            <Link href="/">Início</Link>
          </Button>
        )}
      </div>
    </header>
  )
}
