type Props = {
  title: string
  sign?: string
}

const PageTitle = ({ title, sign }: Props) => (
  <section className="relative flex items-center justify-center h-48">
    <h2 className="text-center text-3xl text-neutral-600 sm:text-4xl">
      {title}
    </h2>
    {
      sign &&
      <span className="absolute top-4 right-0 px-1 border border-neutral-200 text-xs text-neutral-400 rounded">
        {sign}
      </span>
    }
  </section>
)

export default PageTitle
