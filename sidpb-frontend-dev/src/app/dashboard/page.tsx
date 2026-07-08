"use client"

import { useCallback, useEffect, useState, useRef } from "react"
import dynamic from "next/dynamic"
import type { Occurrence } from "@/entities/occurrence/occurrence.types"
import {
  DEFAULT_MAP_CENTER,
  DEFAULT_MAP_ZOOM,
  DEFAULT_SELECTED_HOSTS,
  DEFAULT_SELECTED_VECTORS,
} from "@/features/dashboard/constants/dashboardDefaults"
import { useFullscreen } from "@/features/dashboard/hooks/useFullscreen"
import { useOccurrences } from "@/features/occurrences/hooks/useOccurrences"
import { ArticlesPanel } from "@/features/articles/components/ArticlesPanel/ArticlesPanel"
import { HostPanel } from "@/features/hosts/components/HostPanel/HostPanel"
import { LocationSearch } from "@/features/locations/components/LocationSearch/LocationSearch"
import { OccurrencePanel } from "@/features/occurrences/components/OccurrencePanel/OccurrencePanel"
import { VectorPanel } from "@/features/vectors/components/VectorPanel/VectorPanel"
import { DashboardShell } from "@/components/layouts/DashboardShell"
import {
  SideboardToolbar,
  type SideboardToolbarPanel,
} from "@/components/organisms/SideboardToolbar"
import { MapLegend } from "@/components/organisms/MapLegend"
import { MapTelemetryOverlay } from "@/components/organisms/MapTelemetryOverlay"
import { DashboardFooterSection } from "@/sections/dashboard/DashboardFooterSection"

const LeafletMap = dynamic(() => import("@/features/map/components/LeafletMap/LeafletMap"), {
  ssr: false,
})

export default function DashboardPage() {
  const [zoom, setZoom] = useState(DEFAULT_MAP_ZOOM)
  const { isFullscreen, toggleFullscreen } = useFullscreen()
  const [mapView, setMapView] = useState<"street" | "satellite">("street")

  const [showLegend, setShowLegend] = useState(false)
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null)
  const [mapCenter, setMapCenter] = useState<[number, number]>(DEFAULT_MAP_CENTER)
  const [mapBounds, setMapBounds] = useState<[number, number][] | undefined>(undefined)
  const [mouseCoordinate, setMouseCoordinate] = useState<[number, number] | null>(null)
  const [scaleKm, setScaleKm] = useState(500)

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement | null>(null)

  const [selectedOccurrences, setSelectedOccurrences] = useState<Occurrence[]>([])
  const [isOccurrencePanelExpanded, setIsOccurrencePanelExpanded] = useState(false)

  const [activePanel, setActivePanel] = useState<SideboardToolbarPanel>(null)
  const [isPanelMaximized, setIsPanelMaximized] = useState(false)

  const [selectedArticles, setSelectedArticles] = useState<string[]>([])
  const [selectedVectors, setSelectedVectors] = useState<string[]>(DEFAULT_SELECTED_VECTORS)
  const [selectedHosts, setSelectedHosts] = useState<string[]>(DEFAULT_SELECTED_HOSTS)

  const [appliedFilters, setAppliedFilters] = useState({
    articles: [] as string[],
    vectors: DEFAULT_SELECTED_VECTORS,
    hosts: [] as string[],
  })

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      window.dispatchEvent(new Event("resize"))
    }, 100)

    return () => window.clearTimeout(timeout)
  }, [])

  useEffect(() => {
  if (!isSearchOpen) return

  requestAnimationFrame(() => {
    searchInputRef.current?.focus()
  })
}, [isSearchOpen])

  const {
    data: occurrenceData,
    isLoading: isLoadingOccurrences,
    error: occurrencesError,
  } = useOccurrences({
    filters: {
      articles: appliedFilters.articles,
      vectors: appliedFilters.vectors,
      hosts: appliedFilters.hosts,
    },
  })

  const resetView = () => {
    setZoom(DEFAULT_MAP_ZOOM)
    setMapCenter(DEFAULT_MAP_CENTER)
    setMapBounds(undefined)
    setMarkerPosition(null)
    setSelectedOccurrences([])
    setIsOccurrencePanelExpanded(false)
    setActivePanel(null)
    setSelectedArticles([])
    setSelectedVectors(DEFAULT_SELECTED_VECTORS)
    setSelectedHosts(DEFAULT_SELECTED_HOSTS)
    setAppliedFilters({
      articles: [],
      vectors: DEFAULT_SELECTED_VECTORS,
      hosts: [],
    })
  }

  const handlePanelChange = (panel: SideboardToolbarPanel) => {
    if (panel !== null) {
      setSelectedOccurrences([])
      setIsOccurrencePanelExpanded(false)
    }

    setActivePanel(activePanel === panel ? null : panel)
    setIsPanelMaximized(false)
  }

  const handleOccurrenceClick = (occurrence: Occurrence) => {
    setSelectedOccurrences([occurrence])
    setIsOccurrencePanelExpanded(false)
  }

  const handleLocationSelect = (
    lat: number,
    lon: number,
    suggestedZoom: number
  ) => {
    setMapCenter([lat, lon])
    setZoom(suggestedZoom)
    setMarkerPosition([lat, lon])
  }

  const handleClusterClick = useCallback((occurrences: Occurrence[]) => {
    setSelectedOccurrences(occurrences)
    setIsOccurrencePanelExpanded(false)
  }, [])

  return (
    <DashboardShell footer={<DashboardFooterSection />}>
      <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2 w-56">
        <SideboardToolbar
          activePanel={activePanel}
          isFullscreen={isFullscreen}
          mapView={mapView}
          onToggleMapView={() => setMapView((current) => current === "street" ? "satellite" : "street")}
          isSearchOpen={isSearchOpen}
          onSearchToggle={() => setIsSearchOpen((prev) => !prev)}
          showLegend={showLegend}
          onZoomIn={() => setZoom((previous) => Math.min(previous * 1.5, 8))}
          onZoomOut={() => setZoom((previous) => Math.max(previous / 1.5, 0.5))}
          onToggleFullscreen={toggleFullscreen}
          onResetView={resetView}
          onPanelChange={handlePanelChange}
          onToggleLegend={() => setShowLegend((current) => !current)}
        />

        {isSearchOpen && (
          <LocationSearch
            ref={searchInputRef}
            onLocationSelect={(lat, lon, suggestedZoom) => {
              setMapCenter([lat, lon])
              setZoom(suggestedZoom)
              setMarkerPosition([lat, lon])
            }}
          />
        )}
      </div>

      {activePanel === "artigos" && (
        <ArticlesPanel
          isExpanded={isPanelMaximized}
          onClose={() => setActivePanel(null)}
          onToggleExpand={() => setIsPanelMaximized((current) => !current)}
          selectedArticles={selectedArticles}
          onArticleSelect={setSelectedArticles}
          onApplyFilter={() => {
            setAppliedFilters((previous) => ({ ...previous, articles: selectedArticles }))
            setActivePanel(null)
          }}
        />
      )}

      {activePanel === "vetor" && (
        <VectorPanel
          isExpanded={isPanelMaximized}
          onClose={() => setActivePanel(null)}
          onToggleExpand={() => setIsPanelMaximized((current) => !current)}
          selectedVectors={selectedVectors}
          onVectorSelect={setSelectedVectors}
          onApplyFilter={() => {
            setAppliedFilters((previous) => ({ ...previous, vectors: selectedVectors }))
            setActivePanel(null)
          }}
        />
      )}

      {activePanel === "hospedeiro" && (
        <HostPanel
          isExpanded={isPanelMaximized}
          onClose={() => setActivePanel(null)}
          onToggleExpand={() => setIsPanelMaximized((current) => !current)}
          selectedHosts={selectedHosts}
          onHostSelect={setSelectedHosts}
          onApplyFilter={() => {
            setAppliedFilters((previous) => ({ ...previous, hosts: selectedHosts }))
            setActivePanel(null)
          }}
        />
      )}
      
          {showLegend && <MapLegend onClose={() => setShowLegend(false)} />}

          <MapTelemetryOverlay mouseCoordinate={mouseCoordinate} scaleKm={scaleKm} />

          <div className="absolute inset-0">
            <LeafletMap
              zoom={zoom}
              mapView={mapView}
              center={mapCenter}
              bounds={mapBounds}
              markerPosition={markerPosition}
              occurrences={occurrenceData}
              onOccurrenceClick={handleOccurrenceClick}
              onClusterClick={handleClusterClick}
              onMouseCoordinateChange={setMouseCoordinate}
              onScaleChange={setScaleKm}
              selectedOccurrence={selectedOccurrences[0] ?? null}
            />
          </div>

          {isLoadingOccurrences && (
            <div className="absolute bottom-4 left-4 z-[400] bg-card border border-border rounded-none px-3 py-2 text-xs text-muted-foreground shadow">
              Carregando ocorrencias...
            </div>
          )}
          
          {occurrencesError && (
            <div className="absolute bottom-4 left-4 z-[400] bg-destructive/10 border border-destructive/20 rounded-none px-3 py-2 text-xs text-destructive shadow">
              Exibindo dados locais.
            </div>
          )}

          {selectedOccurrences.length > 0 && (
            <OccurrencePanel
              occurrences={selectedOccurrences}
              isExpanded={isOccurrencePanelExpanded}
              onClose={() => {
                setSelectedOccurrences([])
                setIsOccurrencePanelExpanded(false)
              }}
              onExpand={() => setIsOccurrencePanelExpanded(true)}
              onCollapse={() => setIsOccurrencePanelExpanded(false)}
            />
          )}
    </DashboardShell>
  )
}
