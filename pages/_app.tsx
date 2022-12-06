import '~/styles/globals.css'
import '~/styles/prose.css'
import '~/styles/typography.css'
import LayoutWrapper from '~/components/LayoutWrapper'

import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => (
  <LayoutWrapper>
    <Component {...pageProps} />
  </LayoutWrapper>
)

export default App
