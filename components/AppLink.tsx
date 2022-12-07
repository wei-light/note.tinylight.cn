import Link from 'next/link'

import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type Props = {
  href: string
  children: ReactNode
  className?: string
} & ComponentPropsWithoutRef<'a'>

const AppLink = (props: Props) => {
  const isInternalLink = props.href && props.href.startsWith('/')

  if (isInternalLink) {
    return <Link {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

export default AppLink
