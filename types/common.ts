export type TOCItem = {
  value: string
  id: string
  level: number
  children?: TOCItem[]
}
