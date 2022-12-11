import OutlineItem from './OutlineItem'
import { resolveToc } from '~/lib/utils/toc-utils'

import type { TOCItem } from '~/types/shared'

type Props = {
  toc: TOCItem[]
}

const Outline = ({ toc }: Props) => (
  <div className="h-full">
    <h5 className="text-center text-lg leading-10 border-b border-neutral-200">目录</h5>
    <div className="overflow-y-auto h-full px-6 py-4 leading-loose text-neutral-500">
      <OutlineItem headings={resolveToc(toc, [2, 4])} root />
    </div>
  </div>
)

export default Outline
