import type { LocationSearchResult } from "@/entities/location/location.types"

interface NominatimResult {
  place_id: number | string
  display_name: string
  lat: string
  lon: string
  boundingbox?: [string, string, string, string]
}

export async function searchBrazilLocations(query: string, signal?: AbortSignal): Promise<LocationSearchResult[]> {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
    { signal }
  )
  const data = (await response.json()) as NominatimResult[]

  return data.map((item) => ({
    id: String(item.place_id),
    label: item.display_name,
    lat: Number(item.lat),
    lon: Number(item.lon),
    boundingBox: item.boundingbox
      ? [
          Number(item.boundingbox[0]),
          Number(item.boundingbox[1]),
          Number(item.boundingbox[2]),
          Number(item.boundingbox[3]),
        ]
      : undefined,
  }))
}
