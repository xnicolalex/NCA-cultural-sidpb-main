"use client"

import type { LocationSearchResult } from "@/entities/location/location.types"
import { useApiQuery } from "@/hooks/useApiQuery"
import { useDebouncedValue } from "@/hooks/useDebouncedValue"

interface NominatimResult {
  place_id: number
  display_name: string
  lat: string
  lon: string
  type?: string
  address?: {
    city?: string
    town?: string
    village?: string
    suburb?: string
    neighbourhood?: string
    state?: string
    country?: string
  }
}

function normalizeNominatimResult(item: NominatimResult): LocationSearchResult {
  const address = item.address ?? {}

  const name =
    address.city ??
    address.town ??
    address.village ??
    address.suburb ??
    address.neighbourhood ??
    item.display_name

  return {
    id: String(item.place_id),
    label: [name, address.state, address.country].filter(Boolean).join(", "),
    lat: Number(item.lat),
    lon: Number(item.lon),
  }
}

export function useLocationSearch(query: string, enabled = true) {
  const debouncedQuery = useDebouncedValue(query.trim(), 500)
  const canSearch = enabled && debouncedQuery.length > 2

  return useApiQuery<LocationSearchResult[]>(
    ["location-search", debouncedQuery],
    async (signal) => {
      if (!canSearch) return []

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=10&q=${encodeURIComponent(
          debouncedQuery
        )}`,
        { signal }
      )

      const data = (await response.json()) as NominatimResult[]
      return data.map(normalizeNominatimResult)
    },
    {
      enabled: canSearch,
      fallbackData: [],
      keepPreviousData: false,
    }
  )
}