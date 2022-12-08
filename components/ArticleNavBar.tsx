import { useState } from 'react'
import {
  AlignRightOutlined,
  CommentOutlined,
  UpOutlined,
} from '@ant-design/icons'
import { Transition } from '@headlessui/react'
import ClientOnlyPortal from './ClientOnlyPortal'
import Outline from './Outline'

import type { TOCItem } from '~/types/common'
import { useLockBodyScroll } from '~/hooks/common'

type Props = {
  title: string
  toc: TOCItem[]
}

const ArticleNavBar = ({ title, toc }: Props) => {
  const [showToc, setShowToc] = useState(false)
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
  const onToggleToc = () => setShowToc(!showToc)

  useLockBodyScroll(showToc)

  return (
    <>
      <div className="flex items-center justify-between h-full w-full max-w-2xl px-6 mx-auto">
        <h4 className="mr-4 text-sm text-neutral-400 line-clamp-1">
          {title}
        </h4>
        <div className="flex items-center gap-x-4 text-neutral-400">
          <AlignRightOutlined
            onClick={onToggleToc}
            className="cursor-pointer transition-colors duration-300 hover:text-neutral-500"
          />
          <CommentOutlined className="hidden cursor-pointer transition-colors duration-300 hover:text-neutral-500 sm:block" />
          <UpOutlined
            onClick={scrollToTop}
            className="hidden cursor-pointer transition-colors duration-300 hover:text-neutral-500 sm:block"
          />
        </div>
      </div>
      <ClientOnlyPortal selector="#portal">
        <Transition
          show={showToc}
          className="fixed top-0 left-0 right-0 bottom-0 z-[99]"
        >
          <Transition.Child
            className="absolute bottom-0 left-0 right-0 h-80 bg-neutral-100 rounded-t-lg sm:left-auto sm:top-0 sm:w-80 sm:h-auto sm:rounded-none"
            enter="transition-transform ease-in-out duration-300 transform"
            enterFrom="max-sm:translate-y-full sm:translate-x-full"
            enterTo="max-sm:-translate-y-0 sm:-translate-x-0"
            leave="transition-transform ease-in-out duration-300 transform"
            leaveFrom="max-sm:-translate-y-0 sm:-translate-x-0"
            leaveTo="max-sm:translate-y-full sm:translate-x-full"
          >
            <Outline toc={toc} />
          </Transition.Child>
          <Transition.Child
            onClick={onToggleToc}
            className="absolute top-0 left-0 right-0 bottom-0 bg-black/30 -z-10"
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          />
        </Transition>
      </ClientOnlyPortal>
    </>
  )
}

export default ArticleNavBar
