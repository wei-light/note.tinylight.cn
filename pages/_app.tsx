import 'uno.css'
import '@unocss/reset/tailwind.css'
import '../styles/globals.css'
import NavBar from '../components/NavBar'

import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="font-sans bg-white text-zinc-900 antialiased text-base">
      <NavBar />
      <Component {...pageProps} />
    </div>
  )
}

export default App
