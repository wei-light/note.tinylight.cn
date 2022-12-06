import { useEffect, useMemo, useRef } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import ArticleHeader from '~/components/ArticleHeader'
import { getAllFileSlugs, loadMDXFile } from '~/lib/mdx'
import { splitPath } from '~/lib/utils/file-utils'

import type { GetStaticPaths, InferGetServerSidePropsType } from 'next'
import { getElementTop } from '~/lib/utils/dom-utils'

type Params = {
  params: {
    slug: string[]
  }
}

const Article = (
  { code, frontmatter: { title, date, duration, cover } }:
  InferGetServerSidePropsType<typeof getStaticProps>,
) => {
  const MDXContent = useMemo(() => getMDXComponent(code), [code])
  const articleRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ref = articleRef.current!

    const navigate = () => {
      if (location.hash) {
        const el = document.querySelector(decodeURIComponent(location.hash))
        if (el) {
          const top = getElementTop(el)

          window.scrollTo({
            top: top - 48,
            left: 0,
            behavior: 'smooth',
          })
        }
      }
    }

    const handleAnchors = (
      e: MouseEvent,
    ) => {
      const link = (e.target as HTMLElement).closest('a.anchor')
        || (e.target as HTMLElement).closest('a[data-footnote-ref="true"]')
        || (e.target as HTMLElement).closest('a[data-footnote-backref="true"]')

      if (link) {
        e.preventDefault()
        const hash = link.getAttribute('href')
        history.replaceState({}, '', hash)
        navigate()
      }
    }

    window.addEventListener('hashchange', navigate)
    ref.addEventListener('click', handleAnchors)
    // run when page apper
    setTimeout(navigate, 500)

    return () => {
      window.removeEventListener('hashchange', navigate)
      ref.removeEventListener('click', handleAnchors)
    }
  }, [])

  return (
    <>
      <ArticleHeader title={title} date={date} duration={duration} cover={cover} />
      <article ref={articleRef} className="prose">
        <MDXContent />
      </article>
    </>
  )
}

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
