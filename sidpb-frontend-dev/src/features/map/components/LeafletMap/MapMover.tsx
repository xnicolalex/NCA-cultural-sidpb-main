"use client"

import { useEffect } from "react"
import L from "leaflet"
import { useMap } from "react-leaflet"

interface MapMoverProps {
  center?: [number, number]
  zoom: number
  bounds?: [number, number][]
}

export function MapMover({ center, zoom, bounds }: MapMoverProps) {
  const map = useMap()

  useEffect(() => {
    if (bounds && bounds.length === 2) {
      map.fitBounds(bounds as L.LatLngBoundsExpression, { animate: true, duration: 1.5 })
    } else if (center) {
      map.flyTo(center, zoom, { animate: true, duration: 1.5 })
    }
  }, [center, zoom, bounds, map])

  return null
}
