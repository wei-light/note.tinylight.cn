import PageSEO from '~/components/PageSEO'
import AppLink from '~/components/AppLink'
import bookList from '~/data/book-list'

import type { GetStaticPaths, InferGetStaticPropsType } from 'next'
import PageTitle from '~/components/PageTitle'

type Params = {
  params: {
    slug: string
  }
}

const Book = ({ bookData: { title, groups } }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <>
    <PageSEO title={`Books(${title}) - Tiny Light`} />
    <PageTitle title={title} sign="Book" />
    <ul className="flex flex-col gap-y-12">
      {groups.map(group => (
        <li key={group.groupId}>
          <h3 className="mb-3 text-xl text-neutral-500">{group.groupTitle}</h3>
          <section className="space-y-2 -mx-2">
            {group.list.map(item => (
              <AppLink className="block" href={item.url} key={item.url}>
                <article className="flex items-center h-9 px-2 text-neutral-400 rounded-md transition-colors duration-300 hover:bg-neutral-100 group">
                  <h4 className="flex-1 line-clamp-1">{item.title}</h4>
                  <span className="ml-12 group-hover:translate-x-1 transition-transform duration-300">{'->'}</span>
                </article>
              </AppLink>
            ))}
          </section>
        </li>
      ))}
    </ul>
  </>
)

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: bookList.map(book => ({
      params: {
        slug: book.slug,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: Params) => {
  const bookData = bookList.find(book => book.slug === params.slug)!

  return {
    props: {
      bookData,
    },
  }
}

export default Book
