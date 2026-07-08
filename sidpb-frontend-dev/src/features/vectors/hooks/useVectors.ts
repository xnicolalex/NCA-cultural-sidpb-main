"use client"

import { useCallback } from "react"
import type { VectorSummary } from "@/entities/vector/vector.types"
import { apiRequest, SHOULD_USE_MOCKS } from "@/services/apiClient"
import { getMockVectors } from "@/services/mockData"
import { useApiQuery } from "@/hooks/useApiQuery"

export function useVectors(enabled = true) {
  const fallbackData = useCallback(() => getMockVectors(), [])

  return useApiQuery<VectorSummary[]>(
    ["vectors"],
    () => {
      if (SHOULD_USE_MOCKS) return Promise.resolve(getMockVectors())
      return apiRequest<VectorSummary[]>("/vectors")
    },
    { enabled, fallbackData }
  )
}
