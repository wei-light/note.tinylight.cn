import Link from 'next/link'
import { getAllFrontMatter } from '~/lib/mdx'

import type { GetStaticProps, InferGetServerSidePropsType } from 'next'
import type { ArticleFrontMatter } from '~/lib/mdx/types'
import { sortDesc } from '~/lib/utils/business-utils'

const PostsPage = ({ postsList }: InferGetServerSidePropsType<typeof getStaticProps>) => {
  return (
    <>
      <section className="relative flex items-center justify-center h-48">
        <h2 className="text-center text-3xl text-zinc-900 sm:text-4xl">
          Posts
        </h2>
      </section>
      <section className="flex flex-col gap-y-16">
        {postsList.map(({ slug, title, excerpt }) => (
          <article key={slug}>
            <Link href={`/article/${slug}`}>
              <h3 className="text-xl text-zinc-700 transition-colors duration-300">
                {title}
              </h3>
            </Link>
            {excerpt
              && <p className="mt-2 text-zinc-300 line-clamp-3">{excerpt}</p>
            }
          </article>
        ))}
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps<{ postsList: ArticleFrontMatter[] }> = async () => {
  const postsList = getAllFrontMatter('articles')

  return {
    props: {
      postsList: postsList.sort(({ date: a }, { date: b }) => sortDesc(a, b)),
    },
  }
}

export default PostsPage
