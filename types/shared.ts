export type ArticleFrontMatter = {
  slug: string
  title: string
  date: string | Date
  duration: string
  excerpt?: string
  cover?: string
}

export type PickFrontMatter = {
  articles: ArticleFrontMatter
}

export type ContentType = keyof PickFrontMatter

export type TOCItem = {
  value: string
  id: string
  level: number
  children?: TOCItem[]
}
