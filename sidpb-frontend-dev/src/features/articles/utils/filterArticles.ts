import type { Article } from "@/entities/article/article.types"

interface ArticleFilters {
  search?: string
  types?: string[]
}

export function filterArticles(articles: Article[], filters: ArticleFilters = {}) {
  const query = filters.search?.trim().toLowerCase()

  return articles.filter((article) => {
    const matchesSearch =
      !query ||
      article.title.toLowerCase().includes(query) ||
      article.authors.some((author) => author.toLowerCase().includes(query)) ||
      article.year.toString().includes(query)

    const matchesType = !filters.types?.length || filters.types.includes(article.type)

    return matchesSearch && matchesType
  })
}
