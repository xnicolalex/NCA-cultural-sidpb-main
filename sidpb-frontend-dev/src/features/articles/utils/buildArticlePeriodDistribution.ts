import type { Article } from "@/entities/article/article.types"

const PERIODS = [
  { name: "Antes de 1999", min: 0, max: 1999 },
  { name: "2000-2008", min: 2000, max: 2008 },
  { name: "2009-2020", min: 2009, max: 2020 },
]

export function buildArticlePeriodDistribution(articles: Article[]) {
  return PERIODS.map((period) => ({
    name: period.name,
    quantidade: articles.filter((article) => article.year >= period.min && article.year <= period.max).length,
  }))
}
