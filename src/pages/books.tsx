import PageSEO from '~/components/PageSEO'
import PageTitle from '~/components/PageTitle'
import PageList from '~/components/PageList'
import bookList from '~/data/book-list'

const BooksPage = () => (
  <>
    <PageSEO title="Books - Tiny Light" />
    <PageTitle title="Books" />
    <PageList listData={bookList} type="books" />
  </>
)

export default BooksPage
