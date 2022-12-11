import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getElementTop } from '~/lib/utils/dom-utils'

function useHeadingAnchors() {
  const router = useRouter()

  useEffect(() => {
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
      const link = (e.target as HTMLElement).closest('a')

      if (link && !link.closest('nav') && !link.download) {
        const { origin, pathname, hash, target } = link

        // only intercept internal links
        if (
          !e.ctrlKey
          && !e.shiftKey
          && !e.altKey
          && !e.metaKey
          && target !== '_blank'
          && origin === window.location.origin
        ) {
          e.preventDefault()
          // TODO: Handle internal links that jump to different pages
          if (pathname === window.location.pathname) {
            // scroll between hash anchors in the same page
            if (hash && hash !== window.location.hash) {
              window.history.replaceState({}, '', hash)
              navigate()
            }
          } else {
            router.push(pathname)
          }
        }
      }
    }

    window.addEventListener('hashchange', navigate)
    window.addEventListener('click', handleAnchors)
    // run when page apper
    setTimeout(navigate, 500)

    return () => {
      window.removeEventListener('hashchange', navigate)
      window.removeEventListener('click', handleAnchors)
    }
  }, [])
}

export {
  useHeadingAnchors,
}
