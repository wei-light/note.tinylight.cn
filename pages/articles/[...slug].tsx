import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import ArticleHeader from '~/components/ArticleHeader'
import { useHeadingAnchors } from '~/hooks/article'
import { getAllFileSlugs, loadMDXFile } from '~/lib/mdx'
import { splitPath } from '~/lib/utils/file-utils'

import type { GetStaticPaths, InferGetServerSidePropsType } from 'next'

type Params = {
  params: {
    slug: string[]
  }
}

const Article = (
  { code, frontmatter: { title, date, duration, cover } }:
  InferGetServerSidePropsType<typeof getStaticProps>,
) => {
  const MDXContent = useMemo(() => getMDXComponent(code), [code])

  useHeadingAnchors()

  return (
    <>
      <ArticleHeader title={title} date={date} duration={duration} cover={cover} />
      <article className="prose">
        <MDXContent />
      </article>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allSlugs = getAllFileSlugs('articles')

  return {
    paths: allSlugs.map(slug => ({
      params: {
        slug: splitPath(slug),
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: Params) => {
  const articleData = await loadMDXFile('articles', splitPath.reset(params.slug))

  return {
    props: {
      ...articleData,
    },
  }
}

export default Article
