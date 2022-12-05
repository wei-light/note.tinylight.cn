const Footer = () => (
  <footer className="pb-8 pt-12 text-center">
    <div className="text-gray-400">
      <span>{'tiny-light'}</span>
      <span>{' · '}</span>
      <span>{`© ${new Date().getFullYear()}`}</span>
    </div>
    <div className="text-xs text-gray-300">
      Built with Next.js
      <span className="mx-2">&</span>
      Powered by Vercel
    </div>
  </footer>
)

export default Footer
