"use client"

import { Marker } from "react-leaflet"
import L from "leaflet"
import type { Occurrence } from "@/entities/occurrence/occurrence.types"

interface OccurrenceMarkerProps {
  occurrence: Occurrence
  icon: L.Icon
  selectedOccurrence?: Occurrence | null
  onMarkerRef?: (marker: L.Marker | null) => void
  onOccurrenceClick?: (occurrence: Occurrence) => void
}

export function OccurrenceMarker({
  occurrence,
  icon,
  selectedOccurrence,
  onMarkerRef,
  onOccurrenceClick,
}: OccurrenceMarkerProps) {
  const [lon, lat] = occurrence.coordinates

  return (
    <Marker
      ref={onMarkerRef}
      position={[lat, lon]}
      icon={icon}
      opacity={selectedOccurrence?.id === occurrence.id ? 1 : 0.85}
      eventHandlers={{
        click: () => onOccurrenceClick?.(occurrence),
      }}
    />
  )
}
