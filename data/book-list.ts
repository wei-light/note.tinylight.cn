type BookType = {
  slug: string
  title: string
  description: string
  groups: GroupItem[]
}

type GroupItem = {
  groupId: string | number
  groupTitle: string
  list: Item[]
}

type Item = {
  title: string
  url: string
}

const bookList: BookType[] = [
  {
    slug: 'react',
    title: 'React',
    description: '有关 React 知识的记录，或者说是备忘录',
    groups: [
      {
        groupId: 1,
        groupTitle: 'React Router',
        list: [
          { title: 'React Router 入门', url: '/articles/react/react-router-basic' },
          { title: 'react-router-config 集中式路由配置', url: '/articles/react/react-router-config' },
          { title: '迁移到 React Router 6', url: '/articles/react/migrate-to-react-router-v6' },
        ],
      },
    ],
  },
]

export default bookList
