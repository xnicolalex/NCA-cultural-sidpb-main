"use client"

import { useCallback, useMemo } from "react"
import type {
  OccurrenceFeatureCollection,
  OccurrenceFilters,
} from "@/entities/occurrence/occurrence.types"
import { apiRequest, SHOULD_USE_MOCKS } from "@/services/apiClient"
import { getMockOccurrences } from "@/services/mockData"
import { useFiltersStore } from "@/store/FiltersStore"
import { useApiQuery } from "@/hooks/useApiQuery"

interface UseOccurrencesOptions {
  filters?: OccurrenceFilters
  enabled?: boolean
}

export function useOccurrences(options: UseOccurrencesOptions = {}) {
  const storeFilters = useFiltersStore()

  const filters = useMemo<OccurrenceFilters>(
    () => ({
      diseases: storeFilters.selectedDiseases,
      vectors: storeFilters.selectedVectors,
      hosts: storeFilters.selectedHosts,
      geographicLevel: storeFilters.geographicLevel,
      region: storeFilters.selectedRegion,
      ...options.filters,
    }),
    [
      options.filters?.articles,
      options.filters?.diseases,
      options.filters?.geographicLevel,
      options.filters?.hosts,
      options.filters?.region,
      options.filters?.search,
      options.filters?.vectors,
      storeFilters.geographicLevel,
      storeFilters.selectedDiseases,
      storeFilters.selectedHosts,
      storeFilters.selectedRegion,
      storeFilters.selectedVectors,
    ]
  )

  const fallbackData = useCallback(() => getMockOccurrences(filters), [filters])

  return useApiQuery<OccurrenceFeatureCollection>(
    ["occurrences", filters],
    (signal) => {
      if (SHOULD_USE_MOCKS) return Promise.resolve(getMockOccurrences(filters))

      return apiRequest<OccurrenceFeatureCollection>("/occurrences", {
        signal,
        params: {
          diseases: filters.diseases,
          articles: filters.articles,
          vectors: filters.vectors,
          hosts: filters.hosts,
          geographicLevel: filters.geographicLevel,
          region: filters.region,
          search: filters.search,
        },
      })
    },
    {
      enabled: options.enabled ?? true,
      fallbackData,
    }
  )
}
