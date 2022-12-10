import { visit } from 'unist-util-visit'
import { h } from 'hastscript'

import type { Plugin } from 'unified'
import type { Element, Root } from 'hast'

type RehypeImageFigureOptions = {
  className: string
}

const rehypeImageFigure: Plugin<[RehypeImageFigureOptions?], Root> = (options) => {
  const className = (options && options.className) || 'rehype-figure'

  function buildFigure({ properties }: Element) {
    const figure = h('figure', { class: className }, [
      h('img', { ...properties }),
      properties?.alt && (properties.alt as string).trim().length > 0
        ? h('figcaption', (properties.alt as string))
        : '',
    ])
    return figure
  }

  return (tree) => {
    visit(tree, { tagName: 'p' }, (node) => {
      node.children.forEach((child, index) => {
        if (child.type === 'element' && child.tagName === 'img') {
          node.children[index] = buildFigure(child)
        }
      })
    })
  }
}

export default rehypeImageFigure
