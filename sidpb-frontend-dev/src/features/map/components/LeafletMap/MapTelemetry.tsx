"use client"

import { useEffect } from "react"
import L from "leaflet"
import { useMap } from "react-leaflet"
import { formatScaleKm } from "@/features/map/utils/formatScaleKm"
import { metersPerPixel } from "@/features/map/utils/metersPerPixel"

interface MapTelemetryProps {
  clusterRadiusKm: number
  scaleBarWidthPx: number
  onMouseCoordinateChange?: (coordinate: [number, number] | null) => void
  onScaleChange?: (scaleKm: number) => void
  onInternalScaleChange?: (scaleKm: number) => void
  onClusterEnabledChange?: (enabled: boolean) => void
}

export function MapTelemetry({
  clusterRadiusKm,
  scaleBarWidthPx,
  onMouseCoordinateChange,
  onScaleChange,
  onInternalScaleChange,
  onClusterEnabledChange,
}: MapTelemetryProps) {
  const map = useMap()

  useEffect(() => {
    const updateScale = () => {
      const center = map.getCenter()
      const scaleKm = (metersPerPixel(center.lat, map.getZoom()) * scaleBarWidthPx) / 1000
      const formattedScaleKm = formatScaleKm(scaleKm)
      onInternalScaleChange?.(formattedScaleKm)
      onClusterEnabledChange?.(formattedScaleKm >= clusterRadiusKm)
      onScaleChange?.(formattedScaleKm)
    }

    const handleMouseMove = (event: L.LeafletMouseEvent) => {
      onMouseCoordinateChange?.([event.latlng.lat, event.latlng.lng])
    }

    const handleMouseOut = () => {
      onMouseCoordinateChange?.(null)
    }

    updateScale()
    map.on("mousemove", handleMouseMove)
    map.on("mouseout", handleMouseOut)
    map.on("zoomend moveend", updateScale)

    return () => {
      map.off("mousemove", handleMouseMove)
      map.off("mouseout", handleMouseOut)
      map.off("zoomend moveend", updateScale)
    }
  }, [clusterRadiusKm, map, onClusterEnabledChange, onInternalScaleChange, onMouseCoordinateChange, onScaleChange, scaleBarWidthPx])

  return null
}
