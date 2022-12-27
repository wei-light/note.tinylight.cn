import Image from 'next/image'
import dayjs from 'dayjs'

type Porps = {
  title: string
  date: string | Date
  duration: string
  cover?: string
}

const ArticleHeader = ({ title, date, duration, cover }: Porps) => (
  <section className="pt-8 pb-10">
    {cover && (
      <div className="relative overflow-hidden h-auto mb-9 aspect-[17/9] rounded-xl">
        <Image
          alt="cover"
          src={cover}
          fill
          className="object-cover"
        />
      </div>
    )}
    <h2 className="mt-6 mb-4 text-3xl font-bold sm:text-4xl">
      {title}
    </h2>
    <div className="space-x-1 text-sm opacity-40">
      <time dateTime={String(date)}>
        {dayjs(date).format('MMMM DD, YYYY')}
      </time>
      <i>{'·'}</i>
      <span>{duration}</span>
    </div>
  </section>
)

export default ArticleHeader
