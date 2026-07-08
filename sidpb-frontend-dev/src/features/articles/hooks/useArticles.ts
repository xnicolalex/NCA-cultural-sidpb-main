"use client"

import { useCallback } from "react"
import type { Article } from "@/entities/article/article.types"
import { apiRequest, SHOULD_USE_MOCKS } from "@/services/apiClient"
import { getMockArticles } from "@/services/mockData"
import { useApiQuery } from "@/hooks/useApiQuery"

interface UseArticlesOptions {
  search?: string
  types?: string[]
  enabled?: boolean
}

export function useArticles(options: UseArticlesOptions = {}) {
  const fallbackData = useCallback(() => getMockArticles(), [])

  return useApiQuery<Article[]>(
    ["articles", options.search, options.types],
    () => {
      if (SHOULD_USE_MOCKS) return Promise.resolve(getMockArticles())

      return apiRequest<Article[]>("/articles", {
        params: {
          search: options.search,
          types: options.types,
        },
      })
    },
    {
      enabled: options.enabled ?? true,
      fallbackData,
    }
  )
}
