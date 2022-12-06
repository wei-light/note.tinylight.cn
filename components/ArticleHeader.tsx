import Image from 'next/image'
import dayjs from 'dayjs'

type Porps = {
  title: string
  date: string
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
        <time dateTime={date}>
          {dayjs(date).format('MMMM DD, YYYY')}
        </time>
        <i>{'·'}</i>
        <span>{duration}</span>
      </p>
    </div>
  </section>
)

export default ArticleHeader
