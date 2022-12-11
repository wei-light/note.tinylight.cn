import PageSEO from '~/components/PageSEO'
import AppLink from '~/components/AppLink'
import { getAllFrontMatter } from '~/lib/mdx'
import { sortDesc } from '~/lib/utils/business-utils'

import type { GetStaticProps, InferGetServerSidePropsType } from 'next'
import type { ArticleFrontMatter } from '~/types/shared'

const PostsPage = ({ postsList }: InferGetServerSidePropsType<typeof getStaticProps>) => {
  return (
    <>
      <PageSEO title="Posts - Tiny Light" />
      <section className="relative flex items-center justify-center h-48">
        <h2 className="text-center text-3xl text-neutral-600 sm:text-4xl">
          Posts
        </h2>
      </section>
      <section className="flex flex-col gap-y-16">
        {postsList.map(({ slug, title, excerpt }) => (
          <article key={slug}>
            <AppLink href={`/articles/${slug}`}>
              <h3 className="text-xl text-neutral-500 transition-colors duration-300 hover:text-primary">
                {title}
              </h3>
            </AppLink>
            {excerpt
              && <p className="mt-2 opacity-[0.35]">{excerpt}</p>
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
