"use client"

import { useState } from "react"

export function useMapTelemetry() {
  const [mouseCoordinate, setMouseCoordinate] = useState<[number, number] | null>(null)
  const [scaleKm, setScaleKm] = useState(500)

  return {
    mouseCoordinate,
    setMouseCoordinate,
    scaleKm,
    setScaleKm,
  }
}
