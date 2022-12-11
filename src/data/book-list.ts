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
          { title: '迁移到 React Router v6', url: '/articles/react/migrate-to-react-router-v6' },
        ],
      },
    ],
  },
  {
    slug: 'css',
    title: 'CSS',
    description: 'CSS 知识点记录，主要收集一些比较比较细节的点',
    groups: [
      {
        groupId: 1,
        groupTitle: 'Flex 布局',
        list: [
          { title: 'Flex 布局：语法篇', url: '/articles/css/flexbox-syntax' },
          { title: 'Align Items 和 Align Content', url: '/articles/css/align-items-and-align-content' },
          { title: 'Flex 布局中的计算', url: '/articles/css/flexbox-calc' },
        ],
      },
    ],
  },
]

export default bookList
