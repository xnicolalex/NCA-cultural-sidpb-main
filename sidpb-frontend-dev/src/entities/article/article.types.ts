export type ArticleType = "revisao" | "caso clinico" | "anais de congresso" | "outro" | string

export interface Article {
  id: string
  title: string
  authors: string[]
  year: number
  journal?: string
  url?: string
  type: ArticleType
}
