"use client"

import { useState } from "react"
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from "@/features/dashboard/constants/dashboardDefaults"

export function useMapControls() {
  const [zoom, setZoom] = useState(DEFAULT_MAP_ZOOM)
  const [center, setCenter] = useState<[number, number]>(DEFAULT_MAP_CENTER)
  const [bounds, setBounds] = useState<[number, number][] | undefined>(undefined)
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null)

  return {
    zoom,
    setZoom,
    center,
    setCenter,
    bounds,
    setBounds,
    markerPosition,
    setMarkerPosition,
  }
}
