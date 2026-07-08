"use client"

import { useState } from "react"
import {
  DEFAULT_SELECTED_HOSTS,
  DEFAULT_SELECTED_VECTORS,
} from "@/features/dashboard/constants/dashboardDefaults"

export function useDashboardFilters() {
  const [selectedArticles, setSelectedArticles] = useState<string[]>([])
  const [selectedVectors, setSelectedVectors] = useState<string[]>(DEFAULT_SELECTED_VECTORS)
  const [selectedHosts, setSelectedHosts] = useState<string[]>(DEFAULT_SELECTED_HOSTS)
  const [appliedFilters, setAppliedFilters] = useState({
    articles: [] as string[],
    vectors: DEFAULT_SELECTED_VECTORS,
    hosts: [] as string[],
  })

  return {
    selectedArticles,
    setSelectedArticles,
    selectedVectors,
    setSelectedVectors,
    selectedHosts,
    setSelectedHosts,
    appliedFilters,
    setAppliedFilters,
  }
}
