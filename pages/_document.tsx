import { Head, Html, Main, NextScript } from 'next/document'

function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        {/* Here we will mount our portal */}
        <div id="portal" />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
