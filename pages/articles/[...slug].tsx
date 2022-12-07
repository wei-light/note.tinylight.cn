import { useEffect, useMemo, useRef, useState } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import LayoutWrapper from '~/components/LayoutWrapper'
import ArticleHeader from '~/components/ArticleHeader'
import ArticleNavBar from '~/components/ArticleNavBar'
import NavBar from '~/components/NavBar'
import { useHeadingAnchors } from '~/hooks/article'
import { getAllFileSlugs, loadMDXFile } from '~/lib/mdx'
import { splitPath } from '~/lib/utils/file-utils'
import { getElementTop } from '~/lib/utils/dom-utils'

import type { GetStaticPaths, InferGetServerSidePropsType } from 'next'
import type { CustomNextPage } from 'types/next'

type Params = {
  params: {
    slug: string[]
  }
}

const Article: CustomNextPage<InferGetServerSidePropsType<typeof getStaticProps>> = (
  { code, frontmatter: { title, date, duration, cover } },
) => {
  const MDXContent = useMemo(() => getMDXComponent(code), [code])
  const articleRef = useRef<HTMLElement>(null)
  const [showArticleNav, setShowArticleNav] = useState(false)

  useHeadingAnchors()

  useEffect(() => {
    const handleScroll = () => {
      const triggerHeight = getElementTop(articleRef.current!)
      if (window.scrollY >= triggerHeight) {
        setShowArticleNav(true)
      } else {
        setShowArticleNav(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <LayoutWrapper
      navBar={<NavBar showPageNavBar={showArticleNav}><ArticleNavBar title={title} /></NavBar>}
    >
      <ArticleHeader title={title} date={date} duration={duration} cover={cover} />
      <article ref={articleRef} className="prose">
        <MDXContent />
      </article>
    </LayoutWrapper>
  )
}

Article.getLayout = page => page

export const getStaticPaths: GetStaticPaths = async () => {
  const allSlugs = getAllFileSlugs('articles')

  return {
    paths: allSlugs.map(slug => ({
      params: {
        slug: splitPath(slug),
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: Params) => {
  const articleData = await loadMDXFile('articles', splitPath.reset(params.slug))

  return {
    props: {
      ...articleData,
    },
  }
}

export default Article
