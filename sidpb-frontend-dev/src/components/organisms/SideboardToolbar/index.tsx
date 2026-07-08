"use client"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { ChevronRight, Menu } from "lucide-react"

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

export type SideboardToolbarPanel = "artigos" | "vetor" | "hospedeiro" | null

interface SideboardToolbarProps {
  activePanel: SideboardToolbarPanel
  isFullscreen: boolean
  showLegend: boolean
  isSearchOpen?: boolean
  mapView: "street" | "satellite"
  onSearchToggle?: () => void
  onZoomIn: () => void
  onZoomOut: () => void
  onToggleMapView: () => void
  onToggleFullscreen: () => void
  onResetView: () => void
  onPanelChange: (panel: SideboardToolbarPanel) => void
  onToggleLegend: () => void
}

export function SideboardToolbar({
  activePanel,
  isFullscreen,
  showLegend,
  isSearchOpen,
  mapView,
  onSearchToggle,
  onZoomIn,
  onZoomOut,
  onToggleMapView,
  onToggleFullscreen,
  onResetView,
  onPanelChange,
  onToggleLegend,
}: SideboardToolbarProps) {
    return (
        <div className="w-full">
            <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <Button className="w-56 rounded-none justify-start gap-2">
                <Menu className="w-4 h-4" />
                Ferramentas do mapa
                </Button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
                side="bottom"
                align="start"
                className="w-56 bg-card border border-border shadow-md rounded-none p-1 z-[600]"
            >
                <DropdownMenu.Item
                onClick={onZoomIn}
                className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-muted outline-none rounded-none"
                >
                <ZoomIn className="w-4 h-4" />
                Aumentar zoom
                </DropdownMenu.Item>

                <DropdownMenu.Item
                onClick={onZoomOut}
                className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-muted outline-none rounded-none"
                >
                <ZoomOut className="w-4 h-4" />
                Diminuir zoom
                </DropdownMenu.Item>

                <DropdownMenu.Item
                onClick={onResetView}
                className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-muted outline-none rounded-none"
                >
                <RotateCcw className="w-4 h-4" />
                Visualização padrão
                </DropdownMenu.Item>

                <DropdownMenu.Item
                onClick={onToggleMapView}
                className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-muted outline-none rounded-none"
                >
                <Layers className="w-4 h-4" />
                {mapView === "satellite" ? "Visão de ruas" : "Visão de satélite"}
                </DropdownMenu.Item>

                <DropdownMenu.Item
                onClick={onToggleFullscreen}
                className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-muted outline-none rounded-none"
                >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                {isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
                </DropdownMenu.Item>

                <DropdownMenu.Separator className="h-px bg-border my-1" />

                <DropdownMenu.Item
                onClick={() => onSearchToggle?.()}
                className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-muted outline-none rounded-none"
                >
                <Search className="w-4 h-4" />
                {isSearchOpen ? "Fechar pesquisa" : "Pesquisar local"}
                </DropdownMenu.Item>

                <DropdownMenu.Item
                onClick={onToggleLegend}
                className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-muted outline-none rounded-none"
                >
                <Layers className="w-4 h-4" />
                {showLegend ? "Ocultar legenda" : "Mostrar legenda"}
                </DropdownMenu.Item>

                <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger className="flex items-center justify-between gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-muted outline-none rounded-none">
                    <span className="flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    Painéis e filtros
                    </span>
                    <ChevronRight className="w-4 h-4" />
                </DropdownMenu.SubTrigger>

                <DropdownMenu.SubContent className="min-w-52 bg-card border border-border shadow-md rounded-none p-1 z-[700]">
                    <DropdownMenu.Item
                    onClick={() => onPanelChange("artigos")}
                    className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-muted outline-none rounded-none"
                    >
                    <FileText className="w-4 h-4" />
                    Fontes / Artigos
                    </DropdownMenu.Item>

                    <DropdownMenu.Item
                    onClick={() => onPanelChange("vetor")}
                    className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-muted outline-none rounded-none"
                    >
                    <Bug className="w-4 h-4" />
                    Filtro por vetor
                    </DropdownMenu.Item>

                    <DropdownMenu.Item
                    onClick={() => onPanelChange("hospedeiro")}
                    className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-muted outline-none rounded-none"
                    >
                    <Users className="w-4 h-4" />
                    Filtro por hospedeiro
                    </DropdownMenu.Item>

                </DropdownMenu.SubContent>
                </DropdownMenu.Sub>
            </DropdownMenu.Content>
            </DropdownMenu.Root>
        </div>
    )
}
