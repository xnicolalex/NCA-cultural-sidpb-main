"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LegendItem } from "@/components/molecules/LegendItem"

interface MapLegendProps {
  onClose: () => void
}

export function MapLegend({ onClose }: MapLegendProps) {
  return (
    <div className="absolute top-3 right-3 z-[400] bg-card rounded-none border border-border shadow-lg p-4 w-56">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground">Legenda</h3>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
          <X className="w-3 h-3" />
        </Button>
      </div>
      <div className="space-y-2.5">
        <LegendItem marker={<div className="w-3.5 h-3.5 rounded-none bg-accent" />} label="Ocorrência individual" />
        <LegendItem marker={<div className="w-3.5 h-3.5 rounded-none bg-primary" />} label="Múltiplas ocorrências" />
        <LegendItem marker={<div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[12px] border-b-destructive" />} label="Cluster de ocorrências" />
      </div>
    </div>
  )
}
