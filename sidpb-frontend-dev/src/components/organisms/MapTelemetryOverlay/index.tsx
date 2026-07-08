interface MapTelemetryOverlayProps {
  mouseCoordinate: [number, number] | null
  scaleKm: number
}

export function MapTelemetryOverlay({ mouseCoordinate, scaleKm }: MapTelemetryOverlayProps) {
  return (
    <div className="absolute bottom-8 right-3 z-[400] flex flex-col items-end gap-1 pointer-events-none">
      <div className="bg-card/90 backdrop-blur border border-border rounded-none px-2 py-1">
        <span className="text-xs font-mono text-muted-foreground">
          {mouseCoordinate
            ? `${mouseCoordinate[0].toFixed(5)}, ${mouseCoordinate[1].toFixed(5)}`
            : "--.-----, --.-----"}
        </span>
      </div>
      <div className="bg-card/90 backdrop-blur border border-border rounded-none px-2 py-1 min-w-36">
        <div className="h-1.5 w-[120px] border-x border-b border-foreground/70 mb-1" />
        <span className="text-xs text-muted-foreground">{scaleKm.toLocaleString("pt-BR")} km</span>
      </div>
    </div>
  )
}
