import AppLink from '~/components/AppLink'
import { useState } from 'react'
import { Transition } from '@headlessui/react'
import ClientOnlyPortal from '../ClientOnlyPortal'
import MobileMenuButton from './MobileMenuButton'
import navLinks from '~/data/nav-links'

const MobileMenu = () => {
  const [navShown, setNavShown] = useState(false)

  const onToggleNav = () => setNavShown(!navShown)

  return (
    <>
      <MobileMenuButton active={navShown} click={onToggleNav} />
      <ClientOnlyPortal selector="#portal">
        <Transition
          show={navShown}
          className="fixed top-[var(--nav-height)] left-0 right-0 bottom-0 "
        >
          <Transition.Child
            as="nav"
            className="px-6 py-2 bg-neutral-100"
            enter="transition-transform ease-in-out duration-300 transform"
            enterFrom="-translate-y-full"
            enterTo="translate-y-0"
            leave="transition-transform ease-in-out duration-300 transform"
            leaveFrom="translate-y-0"
            leaveTo="-translate-y-full"
          >
            <ul className="flex flex-col divide-y divide-neutral-200 opacity-50">
              {navLinks.map(nav => (
                <li key={nav.id}>
                  <AppLink href={nav.path} onClick={onToggleNav} className="flex items-center h-12">
                    {nav.title}
                  </AppLink>
                </li>
              ))}
            </ul>
          </Transition.Child>
          <Transition.Child
            onClick={onToggleNav}
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

export default MobileMenu
