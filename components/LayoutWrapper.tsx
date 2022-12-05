import NavBar from './NavBar'
import Footer from './Footer'

import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const LayoutWrapper = ({ children }: Props) => (
  <div className="flex flex-col min-h-screen">
    <NavBar />
    <main className="flex-1 mt-12 px-6 w-full max-w-2xl mx-auto">
      {children}
    </main>
    <Footer />
  </div>
)

export default LayoutWrapper
