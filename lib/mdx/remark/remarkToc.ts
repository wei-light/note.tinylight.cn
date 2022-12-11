import { visit } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'
import { name as isValidIdentifierName } from 'estree-util-is-identifier-name'
import { valueToEstree } from 'estree-util-value-to-estree'

import type { Root } from 'mdast'
import type { Plugin } from 'unified'
import type { MdxjsEsm } from 'mdast-util-mdx'
import type { TOCItem } from '~/types/shared'

function createExport(object: object): MdxjsEsm {
  return {
    type: 'mdxjsEsm',
    value: '',
    data: {
      estree: {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            specifiers: [],
            declaration: {
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: Object.entries(object).map(([identifier, val]) => {
                if (!isValidIdentifierName(identifier)) {
                  throw new Error(
                    `Frontmatter keys should be valid identifiers, got: ${JSON.stringify(
                      identifier,
                    )}`,
                  )
                }
                return {
                  type: 'VariableDeclarator',
                  id: { type: 'Identifier', name: identifier },
                  init: valueToEstree(val),
                }
              }),
            },
          },
        ],
      },
    },
  }
}

/**
 * A remark plugin to expose table of content by named export
 *
 * Reference: https://github.com/remcohaszing/remark-mdx-frontmatter/blob/main/index.ts
 */
const remarkToc: Plugin<[], Root> = () => {
  return (root) => {
    const headings: TOCItem[] = []

    visit(root, 'heading', (node, index, parent) => {
      const value = toString(node)
      // depth: 1 headings are titles and not included in the TOC
      if (parent !== root || !value || node.depth < 2) {
        return
      }

      headings.push({
        value,
        id: node.data!.id as string,
        level: node.depth,
      })
    })

    root.children.push(createExport({ toc: headings }))
  }
}

export default remarkToc
