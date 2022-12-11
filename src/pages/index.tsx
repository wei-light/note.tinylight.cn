import Image from 'next/image'
import { getMDXComponent } from 'mdx-bundler/client'
import { GithubOutlined, MailOutlined, ZhihuOutlined } from '@ant-design/icons'
import PageSEO from '~/components/PageSEO'
import { loadMDXFile } from '~/lib/mdx'

import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import AppLink from '~/components/AppLink'

const Home = ({ code }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const MDXContent = getMDXComponent(code)

  return (
    <>
      <PageSEO title="Tiny Light" />
      <section className="pt-12">
        <div className="flex flex-col items-center">
          <Image alt="avatar" src="/avatar.jpg" width={128} height={128} className="rounded-full" priority />
          <h4 className="text-xl text-neutral-600 font-bold">Tiny Light</h4>
          <p className="space-x-4 text-2xl text-neutral-500">
            <AppLink href="mailto:wei_light@qq.com">
              <MailOutlined className="transition-colors duration-300 hover:text-primary" />
            </AppLink>
            <AppLink href="https://github.com/wei-light">
              <GithubOutlined className="transition-colors duration-300 hover:text-primary" />
            </AppLink>
            <AppLink href="https://www.zhihu.com/people/wei-light">
              <ZhihuOutlined className="transition-colors duration-300 hover:text-primary" />
            </AppLink>
          </p>
        </div>
        <div className="prose mt-6">
          <MDXContent />
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps<{ code: string }> = async () => {
  const anthorData = await loadMDXFile('authors', 'default')

  return {
    props: {
      ...anthorData,
    },
  }
}

export default Home
