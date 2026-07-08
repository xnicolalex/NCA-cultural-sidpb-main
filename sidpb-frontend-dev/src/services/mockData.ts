import type { Article } from "@/entities/article/article.types"
import type { HostSummary } from "@/entities/host/host.types"
import type {
  OccurrenceFeatureCollection,
  OccurrenceFilters,
} from "@/entities/occurrence/occurrence.types"
import type { LocationSearchResult } from "@/entities/location/location.types"
import type { VectorSummary } from "@/entities/vector/vector.types"
import { mockGeoJsonData, mockOccurrences } from "@/features/articles/data/articles.mock"

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function includesAny(value: string, filters?: string[]) {
  if (!filters || filters.length === 0) return true
  const normalized = slugify(value)
  return filters.some((filter) => normalized.includes(slugify(filter)) || slugify(filter).includes(normalized))
}

export function getMockOccurrences(filters: OccurrenceFilters = {}): OccurrenceFeatureCollection {
  const features = mockGeoJsonData.features.filter((feature) => {
    const properties = feature.properties

    return (
      includesAny(properties.disease, filters.diseases) &&
      includesAny(properties.vector, filters.vectors) &&
      includesAny(properties.host, filters.hosts) &&
      (!filters.articles?.length ||
        properties.articles.some((article) => filters.articles?.includes(article.id))) &&
      (!filters.search ||
        [properties.city, properties.state, properties.disease, properties.host]
          .join(" ")
          .toLowerCase()
          .includes(filters.search.toLowerCase()))
    )
  })

  return {
    type: "FeatureCollection",
    features,
  } as OccurrenceFeatureCollection
}

export function getMockArticles(): Article[] {
  const articles = mockOccurrences.flatMap((occurrence) => occurrence.articles)
  return Array.from(new Map(articles.map((article) => [article.id, article])).values())
}

export function getMockVectors(): VectorSummary[] {
  const byVector = new Map<string, VectorSummary>()

  mockOccurrences.forEach((occurrence) => {
    const id = slugify(occurrence.vector)
    const current = byVector.get(id)

    byVector.set(id, {
      id,
      scientificName: occurrence.vector,
      commonName: id === "cochliomyia-hominivorax" ? "Mosca-varejeira / Mosca da bicheira" : undefined,
      description:
        id === "cochliomyia-hominivorax"
          ? "Principal causador de miiase primaria no Brasil. Deposita ovos em feridas e tecidos vivos."
          : undefined,
      occurrenceCount: (current?.occurrenceCount ?? 0) + 1,
    })
  })

  return Array.from(byVector.values())
}

export function getMockHosts(): HostSummary[] {
  const byHost = new Map<string, HostSummary>()

  mockOccurrences.forEach((occurrence) => {
    const id = slugify(occurrence.host)
    const current = byHost.get(id)

    byHost.set(id, {
      id,
      name: occurrence.host,
      commonName: occurrence.host.split(" ")[0],
      category: slugify(occurrence.hostCategory),
      count: (current?.count ?? 0) + 1,
      inCurrentMap: true,
    })
  })

  return Array.from(byHost.values())
}

export function getMockLocationResults(query: string): LocationSearchResult[] {
  if (query.trim().length < 3) return []

  const normalizedQuery = query.toLowerCase()
  return mockOccurrences
    .filter((occurrence) =>
      `${occurrence.city} ${occurrence.state}`.toLowerCase().includes(normalizedQuery)
    )
    .map((occurrence) => ({
      id: occurrence.id,
      label: `${occurrence.city}, ${occurrence.state}, Brasil`,
      lat: occurrence.coordinates[1],
      lon: occurrence.coordinates[0],
    }))
}
