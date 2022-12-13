import '~/styles/globals.css'
import '~/styles/prose.css'
import '~/styles/typography.css'
import '~/styles/prism-theme.css'
import LayoutWrapper from '~/components/LayoutWrapper'

import type { CustomAppProps } from '~/types/next'

const App = ({ Component, pageProps }: CustomAppProps) => {
  /**
   * Allows you to define different layouts for different pages by `getLayout` method
   *
   * const Example = () => <h2>Hello</h2>
   * Example.getLayout = (page) => <div>{page}</div>
   */
  const getLayout = (
    Component.getLayout ||
    (page => <LayoutWrapper>{page}</LayoutWrapper>)
  )

  return getLayout(<Component {...pageProps} />)
}

export default App
