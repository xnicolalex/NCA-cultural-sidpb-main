"use client"

import { useCallback } from "react"
import type { HostSummary } from "@/entities/host/host.types"
import { apiRequest, SHOULD_USE_MOCKS } from "@/services/apiClient"
import { getMockHosts } from "@/services/mockData"
import { useApiQuery } from "@/hooks/useApiQuery"

interface UseHostsOptions {
  search?: string
  categories?: string[]
  enabled?: boolean
}

export function useHosts(options: UseHostsOptions = {}) {
  const fallbackData = useCallback(() => getMockHosts(), [])

  return useApiQuery<HostSummary[]>(
    ["hosts", options.search, options.categories],
    () => {
      if (SHOULD_USE_MOCKS) return Promise.resolve(getMockHosts())

      return apiRequest<HostSummary[]>("/hosts", {
        params: {
          search: options.search,
          categories: options.categories,
        },
      })
    },
    {
      enabled: options.enabled ?? true,
      fallbackData,
    }
  )
}
