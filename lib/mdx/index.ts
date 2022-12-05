import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import { root } from './config'
import { removeFileSuffix } from '~/lib/utils/file-utils'

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
  return JSON.parse(JSON.stringify(allFrontMatter)) as PickFrontMatter[T]
}

export {
  getAllFrontMatter,
}
