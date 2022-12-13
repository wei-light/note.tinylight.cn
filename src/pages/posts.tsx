import PageSEO from '~/components/PageSEO'
import PageTitle from '~/components/PageTitle'
import { getAllFrontMatter } from '~/lib/mdx'
import { sortDesc } from '~/lib/utils/business-utils'

import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import type { ArticleFrontMatter } from '~/types/shared'
import PageList from '~/components/PageList'

const PostsPage = ({ postsList }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const mapPostsList = postsList.map(post => ({
    slug: post.slug,
    title: post.title,
    description: post.excerpt || '',
  }))

  return (
    <>
      <PageSEO title="Posts - Tiny Light" />
      <PageTitle title="Posts" />
      <PageList listData={mapPostsList} type="articles" />
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
