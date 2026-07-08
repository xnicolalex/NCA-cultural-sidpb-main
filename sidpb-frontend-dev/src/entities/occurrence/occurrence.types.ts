import type { Article } from "@/entities/article/article.types"

export interface Occurrence {
  id: string
  coordinates: [number, number]
  city: string
  state: string
  disease: string
  vector: string
  date: string
  host: string
  hostCategory: string
  hostSex?: string
  hostAge?: string
  outcome?: string
  articles: Article[]
}

export interface OccurrenceProperties {
  id: string
  disease: string
  vector: string
  date: string
  city: string
  state: string
  host: string
  hostCategory: string
  hostSex?: string
  hostAge?: string
  outcome?: string
  articles: Article[]
}

export interface OccurrenceFeature {
  type: "Feature"
  geometry: {
    type: "Point"
    coordinates: [number, number]
  }
  properties: OccurrenceProperties
}

export interface OccurrenceFeatureCollection {
  type: "FeatureCollection"
  features: OccurrenceFeature[]
}

export interface OccurrenceFilters {
  diseases?: string[]
  articles?: string[]
  vectors?: string[]
  hosts?: string[]
  geographicLevel?: "country" | "state" | "city"
  region?: string | null
  search?: string
}
