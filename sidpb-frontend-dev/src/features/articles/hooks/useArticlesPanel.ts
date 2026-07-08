"use client"

import { useMemo, useState } from "react"
import type { Article } from "@/entities/article/article.types"
import { buildArticlePeriodDistribution } from "@/features/articles/utils/buildArticlePeriodDistribution"
import { filterArticles } from "@/features/articles/utils/filterArticles"

export function useArticlesPanel(articles: Article[], selectedTypes: string[] = []) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredArticles = useMemo(
    () => filterArticles(articles, { search: searchQuery, types: selectedTypes }),
    [articles, searchQuery, selectedTypes]
  )

  const chartData = useMemo(() => buildArticlePeriodDistribution(articles), [articles])

  return {
    searchQuery,
    setSearchQuery,
    filteredArticles,
    chartData,
  }
}
