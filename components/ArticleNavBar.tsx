import {
  AlignRightOutlined,
  CommentOutlined,
  UpOutlined,
} from '@ant-design/icons'

type Props = {
  title: string
}

const ArticleNavBar = ({ title }: Props) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex items-center justify-between h-full w-full max-w-2xl px-6 mx-auto">
      <h4 className="text-sm text-neutral-400 line-clamp-1">
        {title}
      </h4>
      <div className="flex items-center gap-x-4 text-neutral-400">
        <AlignRightOutlined className="cursor-pointer transition-colors duration-300 hover:text-neutral-500" />
        <CommentOutlined className="hidden cursor-pointer transition-colors duration-300 hover:text-neutral-500 sm:block" />
        <UpOutlined
          onClick={scrollToTop}
          className="hidden cursor-pointer transition-colors duration-300 hover:text-neutral-500 sm:block"
        />
      </div>
    </div>
  )
}

export default ArticleNavBar
