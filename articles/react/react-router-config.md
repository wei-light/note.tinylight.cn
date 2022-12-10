---
title: react-router-config 集中式路由配置
date: 2022-08-27
duration: 8min
---

在使用 React Router 的过程中，我们很多时候都会遇到大量重复地编写路由映射关系的场景，如下所示：

```jsx
import { Route, Switch } from "react-router-dom"

const routes = (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/hello" component={Hello} />
    <Route path="/welcome" component={Welcome} />
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
  </Switch>
)
```

而且随着路由的不断增多，这项工作会越来越繁琐。

如果你曾经使用过 Vue Router，你可能更习惯它那配置式的路由管理，而难以适应 React Router 的写法。在 React Router 5 中。我们依赖 `react-router-config` 即可实现集中式路由配置。

_PS：在这里我们强调的是 React Router 5 版本，因为在 React Router 6 无需依赖任何包即可实现该功能。_

## 基本使用

下面，我们就通过配置对象的形式生成路由映射关系，它和 `<Route>` 组件的属性是类似的，但有以下的区别：

- 引入了 `routes` 作为子路由
- 通过 `react-router-config` 渲染的路由组件，会额外接收到 `props.route`

```javascript
// import ...

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/about',
    component: About,
    // 子路由
    routes: [
      {
        path: '/about/team',
        component: Team
      },
      {
        path: '/about/company',
        component: Company
      }
    ]
  },
  {
    path: 'contact',
    component: Contact
  }
]

export default routes
```

_注意：`react-router-config` 本质上使用的还是 `<Route>` 组件，而 `<Route>` 并不支持相对路径，因此这里还是需要写绝对路径。_

下面，我们需要将配置文件转换为 React Router 可以识别的路由映射关系才能使其正常工作。在 `react-router-config` 中提供了一个 `renderRoutes()` 方法来帮助我们完成这件事，我们只需向其传递配置信息，它就可以生成相应的结构。

```jsx
import { renderRoutes } from 'react-router-config'
import routes from './router'
// import ...

export default function App() {
  return (
    <div>
      <AppHeader />
      {renderRoutes(routes)}
      {/* Convert to ->

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
      </Switch>
      */}
      <AppFooter />
    </div>
  )
}
```

现在，我们已经完成了一级路由的渲染了，而对于 `About` 组件下的二级路由，我们仍然是采用 `renderRoutes()` 方法进行渲染。

渲染二级路由时，我们应该如何传递配置信息呢？通过数组的下标 `routes[1]` 去访问，这当然可以实现，但显然不是我们想要的效果。还记得前面提到过的 `props.route` 吗，利用它就可以实现该效果。

```jsx
import { renderRoutes } from 'react-router-config'

export default function About(props) {
  return (
    <div>
      <h2>About</h2>
      {renderRoutes(props.route.routes)}
      {/* Convert to ->

      <Switch>
        <Route path="/about/team" component={Team} />
        <Route path="/about/company" component={Company} />
      </Switch>
      */}
    </div>
  )
}
```

通过上面的学习，你已经了解到了 `react-router-config` 的基本使用了，对于更多级路由的配置和渲染也是类似的。其实 `react-router-config` 下还有一个 `matchRoutes()` 方法，但它只是一个工具函数，我们就不介绍了，感兴趣的可以自己了解。

## 实现原理

`react-router-config` 的源代码很简单，我们主要来看一下 `renderRoutes()` 的实现：

![Source Code](/images/articles/react/react-router-config/source-code.png)

## 写在最后

是否采用 `react-router-config` 进行集中式的路由管理取决于你的个人习惯，你也可以结合你的业务场景手动封装自己的工具函数来实现类似的效果。再次提醒，`react-router-config` 是配合 React Router 5 使用的。在 React Router 6 中，我们使用 `useRoutes` 这个 Hook 来代替 `react-router-config`。