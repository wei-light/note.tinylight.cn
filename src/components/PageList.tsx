import AppLink from './AppLink'

type Props = {
  listData: {
    slug: string
    title: string
    description: string
  }[]
  type: 'articles' | 'books'
}

const PageList = ({ listData, type }: Props) => {
  const getUrl = (slug: string) => type === 'articles' ? `/articles/${slug}` : `/books/${slug}`

  return (
    <section className="flex flex-col gap-y-16">
      {listData.map(({ slug, title, description }) => (
        <div key={slug}>
          <AppLink href={getUrl(slug)}>
            <h3 className="text-xl text-neutral-500 transition-colors duration-300 hover:text-primary">
              {title}
            </h3>
          </AppLink>
          {
            description && <p className="mt-2 opacity-[0.35]">{description}</p>
          }
        </div>
      ))}
    </section>
  )
}

export default PageList
