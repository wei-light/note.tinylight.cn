import '~/styles/tailwind.css'
import '~/styles/globals.css'
import LayoutWrapper from '~/components/LayoutWrapper'

import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return (
    <LayoutWrapper>
      <Component {...pageProps} />
    </LayoutWrapper>
  )
}

export default App
