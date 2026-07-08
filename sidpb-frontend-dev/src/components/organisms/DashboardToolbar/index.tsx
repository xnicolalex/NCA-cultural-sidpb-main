"use client"

import {
  Bug,
  FileText,
  Layers,
  Maximize2,
  Minimize2,
  RotateCcw,
  Search,
  Users,
  ZoomIn,
  ZoomOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export type DashboardToolbarPanel = "artigos" | "vetor" | "hospedeiro" | null

interface DashboardToolbarProps {
  activePanel: DashboardToolbarPanel
  isFullscreen: boolean
  showLegend: boolean
  isSearchOpen?: boolean
  onSearchToggle?: () => void
  onZoomIn: () => void
  onZoomOut: () => void
  onToggleFullscreen: () => void
  onResetView: () => void
  onPanelChange: (panel: DashboardToolbarPanel) => void
  onToggleLegend: () => void
}

export function DashboardToolbar({
  activePanel,
  isFullscreen,
  showLegend,
  isSearchOpen,
  onSearchToggle,
  onZoomIn,
  onZoomOut,
  onToggleFullscreen,
  onResetView,
  onPanelChange,
  onToggleLegend,
}: DashboardToolbarProps) {
  return (
    <div className="shrink-0 w-12 bg-card border-r border-border flex flex-col z-30">
      <div className="border-b border-border">
        <Button variant="ghost" size="icon" onClick={onZoomIn} className="w-full h-10 rounded-none" title="Aumentar zoom">
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onZoomOut} className="w-full h-10 rounded-none border-b border-border" title="Diminuir zoom">
          <ZoomOut className="w-4 h-4" />
        </Button>
      </div>

      <div className="border-b border-border">
        <Button variant="ghost" size="icon" onClick={onToggleFullscreen} className="w-full h-10 rounded-none" title={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}>
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={onResetView} className="w-full h-10 rounded-none border-b border-border" title="Visualização padrão">
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      <div className="border-b border-border">
        <Button
          variant={isSearchOpen ? "default" : "ghost"}
          size="icon"
          onClick={() => onSearchToggle?.()}
          className="w-full h-10 rounded-none"
          title={isSearchOpen ? "Fechar pesquisa" : "Pesquisar local"}
          aria-label={isSearchOpen ? "Fechar pesquisa" : "Pesquisar local"}
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>

      <div className="border-b border-border">
        <Button variant={activePanel === "artigos" ? "default" : "ghost"} size="icon" onClick={() => onPanelChange("artigos")} className="w-full h-10 rounded-none" title="Fontes / Artigos">
          <FileText className="w-4 h-4" />
        </Button>
        <Button variant={activePanel === "vetor" ? "default" : "ghost"} size="icon" onClick={() => onPanelChange("vetor")} className="w-full h-10 rounded-none" title="Filtro por Vetor">
          <Bug className="w-4 h-4" />
        </Button>
        <Button variant={activePanel === "hospedeiro" ? "default" : "ghost"} size="icon" onClick={() => onPanelChange("hospedeiro")} className="w-full h-10 rounded-none border-b border-border" title="Filtro por Hospedeiro">
          <Users className="w-4 h-4" />
        </Button>
      </div>

      <Button variant={showLegend ? "default" : "ghost"} size="icon" onClick={onToggleLegend} className="w-full h-10 rounded-none" title="Mostrar legenda">
        <Layers className="w-4 h-4" />
      </Button>

      <div className="flex-1" />
    </div>
  )
}
