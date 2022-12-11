import PageSEO from '~/components/PageSEO'
import AppLink from '~/components/AppLink'
import bookList from '~/data/book-list'

const BooksPage = () => (
  <>
    <PageSEO title="Books - Tiny Light" />
    <section className="relative flex items-center justify-center h-48">
      <h2 className="text-center text-3xl text-neutral-600 sm:text-4xl">
        Books
      </h2>
    </section>
    <section className="flex flex-col gap-y-16">
      {bookList.map(({ slug, title, description }) => (
        <article key={slug}>
          <AppLink href={`/books/${slug}`}>
            <h3 className="text-xl text-neutral-500 transition-colors duration-300 hover:text-primary">
              {title}
            </h3>
          </AppLink>
          <p className="mt-2 opacity-[0.35]">{description}</p>
        </article>
      ))}
    </section>
  </>
)

export default BooksPage
