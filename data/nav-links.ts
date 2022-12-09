type LinkType = {
  id: number
  title: string
  path: string
}

const navLinks: LinkType[] = [
  { id: 1, title: 'Posts', path: '/posts' },
  { id: 2, title: 'Books', path: '/books' },
]

export default navLinks
