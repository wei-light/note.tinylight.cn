const Footer = () => (
  <footer className="pb-8 pt-12 text-center opacity-[0.25]">
    <div className="text-neutral-500">
      <span>{'tiny-light'}</span>
      <span>{' · '}</span>
      <span>{`© ${new Date().getFullYear()}`}</span>
    </div>
    <div className="text-xs text-neutral-400">
      Built with Next.js
      <span className="mx-2">&</span>
      Powered by Vercel
    </div>
  </footer>
)

export default Footer
