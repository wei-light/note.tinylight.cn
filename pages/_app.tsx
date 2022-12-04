import 'uno.css'
import '@unocss/reset/tailwind.css'
import '~/styles/globals.css'
import LayoutWrapper from '~/components/LayoutWrapper'

import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="font-sans bg-white text-zinc-900 antialiased text-base">
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </div>
  )
}

export default App
