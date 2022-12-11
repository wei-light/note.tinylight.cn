import Head from 'next/head'

type Props = {
  title: string
}

const PageSEO = ({ title }: Props) => (
  <Head>
    <title>{title}</title>
  </Head>
)

export default PageSEO
