export type ArticleFrontMatter = {
  slug: string
  title: string
  date: string
  duration: string
  excerpt?: string
  cover?: string
}

export type PickFrontMatter = {
  articles: ArticleFrontMatter[]
}

export type ContentType = keyof PickFrontMatter
