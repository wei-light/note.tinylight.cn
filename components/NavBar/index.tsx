import Link from 'next/link'
import MobileMenu from './MobileMenu'
import navLinks from '~/data/nav-links'

const NavBar = () => (
  <header className="overflow-hidden fixed top-0 left-0 right-0 h-[var(--nav-height)] bg-white/70 border-b border-gray-200 z-50 backdrop-blur-lg">
    <div className="flex justify-between items-center h-full px-6">
      <section className="text-zinc-700">
        <Link href="/">Tinylight</Link>
      </section>
      <section className="sm:hidden">
        <MobileMenu />
      </section>
      <nav className="hidden sm:block">
        <ul className="flex gap-x-4">
          {navLinks.map(nav => (
            <li key={nav.id}>
              <Link href={nav.path} className="text-black/30 transition-colors duration-300 hover:text-black/50">
                {nav.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </header>
)

export default NavBar
