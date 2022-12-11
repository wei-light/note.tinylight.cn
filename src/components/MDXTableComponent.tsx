import type { ComponentProps } from 'react'

const MDXTableComponent = ({ children }: ComponentProps<'table'>) => (
  <div className="overflow-x-auto">
    <table>
      {children}
    </table>
  </div>
)

export default MDXTableComponent
