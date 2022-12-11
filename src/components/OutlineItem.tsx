import classNames from 'classnames'

import type { TOCItem } from '~/types/shared'

type Props = {
  root?: boolean
  headings: TOCItem[]
}

const OutlineItem = ({ headings, root }: Props) => (
  <ul className={classNames({ 'pl-6': !root })}>
    {headings.map(({ children, value, id }) => (
      <li key={id}>
        <a className="block" href={`#${id}`}>
          {value}
        </a>
        {children?.length && <OutlineItem headings={children} />}
      </li>
    ))}
  </ul>
)

export default OutlineItem
