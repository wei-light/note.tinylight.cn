import { useEffect } from 'react'

function useLockBodyScroll(lock = true): void {
  useEffect(() => {
    document.body.style.overflow = lock ? 'hidden' : 'visible'
    return () => {
      document.body.style.overflow = 'visible'
    }
  }, [lock])
}

export {
  useLockBodyScroll,
}
