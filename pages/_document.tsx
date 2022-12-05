import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => (
  <Html>
    <Head />
    <body className="bg-white text-zinc-900 antialiased text-base">
      <Main />
      {/* Here we will mount our portal */}
      <div id="portal" />
      <NextScript />
    </body>
  </Html>
)

export default Document
