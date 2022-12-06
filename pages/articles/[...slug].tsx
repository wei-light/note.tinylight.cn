import Image from 'next/image'
import { useMemo } from 'react'
import dayjs from 'dayjs'
import { getMDXComponent } from 'mdx-bundler/client'
import { getAllFileSlugs, loadMDXFile } from '~/lib/mdx'
import { splitPath } from '~/lib/utils/file-utils'

import type { GetStaticPaths, InferGetServerSidePropsType } from 'next'

type Params = {
  params: {
    slug: string[]
  }
}

const Article = ({ code, frontmatter }: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const MDXContent = useMemo(() => getMDXComponent(code), [code])

  return (
    <>
      <section className="pt-8 pb-10">
        {frontmatter.cover && (
          <div className="relative overflow-hidden h-auto mb-9 aspect-[17/9] rounded-xl">
            <Image
              alt="cover"
              src={frontmatter.cover}
              fill
              className="object-cover"
            />
          </div>
        )}
        <h2 className="mt-6 mb-4 text-3xl font-bold sm:text-4xl">
          {frontmatter.title}
        </h2>
        <div className="flex items-center text-sm">
          <a href="https://github.com/wei-light">
            <Image
              alt="avatar"
              src="/avatar.jpg"
              width={24}
              height={24}
              quality={100}
              className="rounded-full"
            />
          </a>
          <p className="space-x-1 ml-4 opacity-40">
            <time dateTime={frontmatter.date}>
              {dayjs(frontmatter.date).format('MMMM DD, YYYY')}
            </time>
            <i>{'·'}</i>
            <span>{frontmatter.duration}</span>
          </p>
        </div>
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
