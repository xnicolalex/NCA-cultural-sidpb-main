import type {
  Occurrence,
  OccurrenceFeature,
  OccurrenceFeatureCollection,
} from "@/entities/occurrence/occurrence.types"

export function occurrenceFeatureToOccurrence(feature: OccurrenceFeature): Occurrence {
  const [lon, lat] = feature.geometry.coordinates

  return {
    id: feature.properties.id,
    coordinates: [lon, lat],
    city: feature.properties.city,
    state: feature.properties.state,
    disease: feature.properties.disease,
    vector: feature.properties.vector,
    date: feature.properties.date,
    host: feature.properties.host,
    hostCategory: feature.properties.hostCategory,
    hostSex: feature.properties.hostSex,
    hostAge: feature.properties.hostAge,
    outcome: feature.properties.outcome,
    articles: feature.properties.articles,
  }
}

export function occurrenceCollectionToOccurrences(
  collection?: OccurrenceFeatureCollection | null
) {
  return collection?.features.map(occurrenceFeatureToOccurrence) ?? []
}
