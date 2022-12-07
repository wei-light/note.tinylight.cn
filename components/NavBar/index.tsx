import classNames from 'classnames'
import AppLink from '~/components/AppLink'
import MobileMenu from './MobileMenu'
import navLinks from '~/data/nav-links'

import type { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  showPageNavBar?: boolean
}

const NavBar = ({ children, showPageNavBar }: Props) => (
  <header className="overflow-hidden fixed top-0 left-0 right-0 h-[var(--nav-height)] bg-white/70 border-b border-neutral-200 z-50 backdrop-blur-lg">
    {/* App NavBar */}
    <div
      className={classNames(
        { ' -translate-y-full': showPageNavBar },
        'flex justify-between items-center h-full px-6 transition-transform duration-500',
      )}
    >
      <section className="text-neutral-600">
        <AppLink href="/">Tinylight</AppLink>
      </section>
      <section className="sm:hidden">
        <MobileMenu />
      </section>
      <nav className="hidden sm:block">
        <ul className="flex gap-x-4">
          {navLinks.map(nav => (
            <li key={nav.id}>
              <AppLink href={nav.path} className="opacity-60 transition-opacity duration-300 hover:opacity-80">
                {nav.title}
              </AppLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
    {/* Customize the navbar of different pages */}
    <div
      className={classNames(
        { ' -translate-y-full': showPageNavBar },
        'h-full transition-transform duration-500',
      )}
    >
      {children}
    </div>
  </header>
)

export default NavBar
