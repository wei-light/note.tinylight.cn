import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import { getAllFileSlugs, loadMDXFile } from '~/lib/mdx'
import { removeFileSuffix } from '~/lib/utils/file-utils'

import type { GetStaticPaths, InferGetServerSidePropsType } from 'next'

type Params = {
  params: {
    slug: string
  }
}

const Article = ({ code, frontmatter }: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const MDXContent = useMemo(() => getMDXComponent(code), [code])

  return (
    <>
      <section className="pt-8 pb-10">
        <h2 className="mt-6 mb-4 text-3xl font-bold sm:text-4xl">
          {frontmatter.title}
        </h2>
      </section>
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
        slug: removeFileSuffix(slug),
      },
    })),
    fallback: true,
  }
}

export const getStaticProps = async ({ params }: Params) => {
  const articleData = await loadMDXFile('articles', params.slug)

  return {
    props: {
      ...articleData,
    },
  }
}

export default Article
