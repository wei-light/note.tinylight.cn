import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  selector: string
}

function ClientOnlyPortal({ children, selector }: Props) {
  const ref = useRef<Element | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector(selector)
    setMounted(true)
  }, [selector])

  return mounted ? createPortal(children, ref.current!) : null
}

export default ClientOnlyPortal
