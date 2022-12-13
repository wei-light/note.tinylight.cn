import type { TOCItem } from '~/types/shared'

/**
 * Reference: https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/composables/outline.ts
 */

function resolveToc(
  headers: TOCItem[],
  levelsRange: number | [number, number] | 'deep' = 2,
) {
  const levels: [number, number] =
    typeof levelsRange === 'number'
      ? [levelsRange, levelsRange]
      : levelsRange === 'deep'
        ? [2, 6]
        : levelsRange

  return groupHeaders(headers, levels)
}

function groupHeaders(headers: TOCItem[], levelsRange: [number, number]) {
  const result: TOCItem[] = []

  headers = headers.map(h => ({ ...h }))
  headers.forEach((h, index) => {
    if (h.level >= levelsRange[0] && h.level <= levelsRange[1]) {
      if (addToParent(index, headers, levelsRange)) {
        result.push(h)
      }
    }
  })

  return result
}

function addToParent(
  currIndex: number,
  headers: TOCItem[],
  levelsRange: [number, number],
) {
  if (currIndex === 0) {
    return true
  }

  const currentHeader = headers[currIndex]
  for (let index = currIndex - 1; index >= 0; index--) {
    const header = headers[index]

    if (
      header.level < currentHeader.level
      && header.level >= levelsRange[0]
      && header.level <= levelsRange[1]
    ) {
      if (header.children == null) {
        header.children = []
      }
      header.children.push(currentHeader)
      return false
    }
  }

  return true
}

export {
  resolveToc,
}
