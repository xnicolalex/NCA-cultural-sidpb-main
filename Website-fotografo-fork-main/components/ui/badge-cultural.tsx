import type React from "react"
import { cn } from "@/lib/utils"

interface BadgeCulturalProps {
  children: React.ReactNode
  variant?: "bumba" | "tambor" | "divino" | "arquitetura" | "artesanato" | "default"
  className?: string
}

const variantStyles = {
  bumba: "bg-accent/10 text-accent border-accent/20",
  tambor: "bg-primary/10 text-primary border-primary/20",
  divino: "bg-secondary/10 text-secondary-foreground border-secondary/20",
  arquitetura: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  artesanato: "bg-chart-5/10 text-chart-5 border-chart-5/20",
  default: "bg-muted text-muted-foreground border-border",
}

export function BadgeCultural({ children, variant = "default", className }: BadgeCulturalProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
