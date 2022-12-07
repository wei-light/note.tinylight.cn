import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { bundleMDX } from 'mdx-bundler'
// remark package
import remarkGfm from 'remark-gfm'
import remarkSlug from 'remark-slug'
import remarkAutoLinkHeadings from 'remark-autolink-headings'
import remarkToc from './remark/remarkToc'
// rehype package
import rehypeExternalLinks from 'rehype-external-links'
import rehypePrismPlus from 'rehype-prism-plus'

import { root } from './config'
import { serialize } from '~/lib/utils/business-utils'
import { getAllFilePathsDepth, removeFileSuffix } from '~/lib/utils/file-utils'

import type { ContentType, PickFrontMatter } from './types'

function getAllFrontMatter<T extends ContentType>(type: T) {
  const baseDirectory = path.join(root, type)
  const fileNames = fs.readdirSync(baseDirectory)
  const allFrontMatter = []

  for (const fileName of fileNames) {
    // Remove Unexpected File
    if (!/\.mdx?$/.test(path.extname(fileName))) {
      continue
    }

    const slug = removeFileSuffix(fileName)

    const fullPath = path.join(baseDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    allFrontMatter.push({
      slug,
      ...matterResult.data,
    })
  }

  /**
   * Error: Error serializing `.postsList[0].date` returned from `getStaticProps` in "/posts".
   * Reason: `object` ("[object Date]") cannot be serialized as JSON. Please only return JSON serializable data types.
   * https://github.com/vercel/next.js/issues/11993
   */
  return serialize(allFrontMatter as Array<PickFrontMatter[T]>)
}

function getAllFileSlugs(type: ContentType) {
  const baseDirectory = path.join(root, type)
  const allPaths = getAllFilePathsDepth(baseDirectory, { relative: true })

  // Remove Unexpected File
  return allPaths
    .filter(item => /\.mdx?$/.test(item))
    .map(item => removeFileSuffix(item))
}

async function loadMDXFile<T extends ContentType>(type: T, slug: string) {
  const mdxPath = path.join(root, type, `${slug}.mdx`)
  const mdPath = path.join(root, type, `${slug}.md`)
  const fileContents = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, 'utf8')
    : fs.readFileSync(mdPath, 'utf8')

  const { code, frontmatter } = await bundleMDX<PickFrontMatter[T]>({
    source: fileContents,
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
        remarkSlug,
        remarkToc,
        [
          remarkAutoLinkHeadings,
          {
            behavior: 'wrap',
            linkProperties: { ariaHidden: true, class: 'anchor' },
          },
        ],
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        [rehypeExternalLinks, { target: '_blank', rel: 'noopener' }],
        [rehypePrismPlus, { ignoreMissing: true }],
      ]

      return options
    },
  })

  return {
    code,
    frontmatter: serialize(frontmatter),
  }
}

export {
  getAllFrontMatter,
  getAllFileSlugs,
  loadMDXFile,
}
