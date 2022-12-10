---
title: 迁移到 React Router v6
date: 2022-09-03
duration: 20min
---

React Router 6 正式版发布已经有一段时间了，v6 现在也是 React Router 的默认版本。尝试过 React Router 6 的小伙伴应该发现，和 v5 相比，v6 是有较大的升级和改动的。不可否认的是，v6 版本提供了更多好用的 API、新特性，同时也改进了 v5 中一些设计不太合理的地方。接下来，我会尽可能通过一些例子来介绍 v5 和 v6 版本之间的差别，希望能帮你尽快熟悉新版的 React Router。

首先，还是要安装一下 React Router 6：

```bash
npm install react-router-dom
# or
yarn add react-router-dom
# or
pnpm add react-router-dom
```

## `<Routes>` 替代 `<Switch>`

React Router 6 引入了一个新组件 `Routes`，它的作用与 `Switch` 类似，但它更为强大。主要区别如下：

- `<Routes>` 内所有 `<Route>` 和 `<Link>` 都是相对的。这使得 `<Route path>` 和 `<Link to>` 中的代码更精简、更可预测。
- 路由的选择是基于最佳匹配而不是[按顺序遍历](/articles/react/react-router-basic#精确匹配)。
- 路由可以嵌套在同一个地方而不必分散声明在不同的组件。

_在 v5 中 `<Switch>` 是可选的，而在 v6 中 `<Routes>` 是不可缺少的。_

接下来，我们将会分别用 v5 和 v6 版本的 React Router 表示下面的路由关系。

![](/images/articles/react/migrate-to-react-router-v6/1.png)

```jsx
// React Router v5 app
import {
  BrowserRouter,
  Switch,
  Link,
  Route,
  useRouteMatch,
} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/children" component={Children} />
      </Switch>
    </BrowserRouter>
  )
}

function Children() {
  const match = useRouteMatch()

  return (
    <div>
      <nav>
        <Link to={`${match.url}/child1`}>Child1</Link>
        <Link to={`${match.url}/child2`}>Child2</Link>
      </nav>

      <Switch>
        <Route path={`${match.path}/child1`} component={Child1} />
        <Route path={`${match.path}/child2`} component={Child2} />
      </Switch>
    </div>
  )
}
```

在 v6 版本中，我们可以通过两种方式实现，之所以都在这里说明，是为了让大家对比一下它们之间的区别。

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="children/*" element={<Children />} />
      </Routes>
    </BrowserRouter>
  )
}

function Children() {
  return (
    <div>
      <nav>
        <Link to="child1">Child1</Link>
        <Link to="child2">Child2</Link>
      </nav>

      <Routes>
        <Route path="child1" element={<Child1 />} />
        <Route path="child2" element={<Child2 />} />
      </Routes>
    </div>
  )
}
```

第一种写法和 v5 版本的写法在结构上大致类似，在这个例子中我们需要注意以下一些点：

- `<Route path>` 和 `<Link to>` 是相对的。这意味着你无需手动插入 `match.url` 或 `match.path`，它们会基于父路由的 path 和 URL 自动生成。
- `<Route exact>` 已经废弃了。前面提到过现在路由总是选择**最佳匹配**，因此 `<Route exact>` 也没有存在的必要。现在，我们需要为具有后代路由（在其它组件中定义）的路由的路径中追加 `*` 表示深度匹配。

```jsx
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="children" element={<Children />}>
          <Route path="child1" element={<Child1 />} />
          <Route path="child2" element={<Child2 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function Children() {
  return (
    <div>
      <nav>
        <Link to="child1">Child1</Link>
        <Link to="child2">Child2</Link>
      </nav>

      <Outlet />
    </div>
  )
}
```

第二种方式和第一种方式略有不同，体现在以下几点：

- 路由以嵌套的方式写在了同一个地方，更加直观、清晰。在后面，我们也可以借助 `useRoutes` 这个 Hook，让你以配置对象的形式生成路由。
- 这里还使用了一个 v6 版本新增的组件 `<Outlet>`，主要用于在父路由中渲染子路由。

你可能已经注意到了，v5 中的 `<Route component>` 在 v6 中全都改为了 `<Route element>`。

## `<Route element>` 的优点

在 React Router 6 中，我们会用 `<Route element>` 代替 `<Route component>` 和 `<Route render>`。为什么？

与前面类似，我们通过一些案例来进行说明。

```jsx
// React Router v5 app

// 我们可以方便地传递组件
<Route path=":userId" component={Profile} />

// 但我们该如何给 <Profile> element 传递自定义属性呢??
// 在这种情况下我们可能需要 render props?
<Route
  path=":userId"
  render={routeProps => (
    <Profile routeProps={routeProps} animate={true} />
  )}
/>
```

在 v6 中处理上面的场景。

```jsx
// React Router v6 app

// 实现起来也是方便的，有点类似于 <Suspense>
<Route path=":userId" element={<Profile />} />

// 而这时我们要传递自定义属性就简单了
<Route path=":userId" element={<Profile animate={true} />} />

// 现在，我们该如何访问路由信息数据呢？如 URL params
// 或者 current location？
function Profile({ animate }) {
  let params = useParams();
  let location = useLocation();
}
```

通过对比上面的案例，我们可以看到 `<Route element>` 的优势所在：

- 可以方便地传递自定义的 props
- 而且随着 Hooks 的出现和广泛应用，`component`，render props 等设计也可以被替代，使用 `useParams`、`useLocation` 等 Hooks 可以轻松获取路由信息

还有一点要注意的是，在 v6 中，`<Route children>` 的作用是实现嵌套路由，这在前面已经提到过了。

```jsx
// React Router v6 app
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users" element={<Users />}>
          <Route path="me" element={<OwnUserProfile />} />
          <Route path=":id" element={<UserProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
```

## `<Route path>` 匹配模式

React Router 6 简化了路径格式。在 v6 中的 `<Route path>` 只支持 2 种类型的占位符：**类似 `:id` 的动态字段**和 **`*` 通配符**。`*` 通配符只能用于路径末尾，不可以在中间使用。

以下都是 v6 种有效的路由路径：

```
/groups
/groups/admin
/users/:id
/users/:id/messages
/files/*
/files/:id/*
```

以下 RegExp 样式的路由路径在 v6 中无效：

```
/users/:id?
/tweets/:id(\d+)
/files/*/cat.jpg
/files-*
```

在 v4/v5 中，路由的匹配模式是依赖于 `path-to-regexp` 这个包的。在 v6 中使用了更简化的语法，你不再需要依赖 `path-to-regexp`，这也有助于减少最后打包的体积。

## `<Link to>` 的值

在 v5 中，`<Link to>` 的值不以 `/` 开头是让人感到迷惑的，因为它取决于当前的 URL 是什么。如果当前的 URL 是 `/users`，v5 中的 `<Link to="me">` 会渲染为 `<a href="/me"`。但如果当前 URL 里有斜杠，如 `/users/`，相同的 `<Link to="me">` 会渲染为 `<a href="/users/me"`。这使得我们难以预测链接的行为，因此在 v5 中更推荐使用绝对的 `<Link to>` 值（借助 `match.url`），而不是相对的值。

React Router 6 修复了这一令人迷惑的行为。在 v6 中，`<Link to="me">` 总是会渲染相同的 `<a href>`。例如，在 `<Route path="users">` 内的 `<Link to="me">` 总是渲染 `/users/me` 链接，不管当前 URL 是否有斜杠。

或者说，现在的 `<Link to>` 更像我们常用的 `cd` 命令，将两者进行类比可以让你快速熟悉它。

```
// 假设路由的大致结构如下
<Route path="app">
  <Route path="dashboard">
    <Route path="stats" />
  </Route>
</Route>

// 并且当前的 URL 是 /app/dashboard (不管是否有斜杠）
<Link to="stats">               => <a href="/app/dashboard/stats">
<Link to="../stats">            => <a href="/app/stats">
<Link to="../../stats">         => <a href="/stats">
<Link to="../../../stats">      => <a href="/stats">

// 在命令行中，假设当前目录为 /app/dashboard
cd stats                        # pwd is /app/dashboard/stats
cd ../stats                     # pwd is /app/stats
cd ../../stats                  # pwd is /stats
cd ../../../stats               # pwd is /stats
```

还有一点需要注意的是，`<Link to="..">` 的行为不总是和 `<a href="..">` 一致的。当 `<Route path>` 匹配多个 URL 片段时，`to=".."` 是基于父路由路径的。可以借助下面的例子进行理解：

```jsx
function App() {
  return (
    <Routes>
      <Route path="users">
        <Route
          path=":id/messages"
          element={
            // 链接到 /users，不是 /users/:id
            // `path` 为 ':id/messages/test' 也是同样的
            <Link to=".." />
          }
        />
      </Route>
    </Routes>
  );
}
```

如果还是难以理解，可以看一下通配符 `*` 这个案例，`*` 是可以匹配多个 URL 片段的。

```jsx
function App() {
  return (
    <Routes>
      <Route path=":userId">
        <Route path="messages" element={<UserMessages />} />
        <Route
          path="files/*"
          element={
            // 链接到 /:userId/messages，不管 `*` 匹配到多少个 URL 片段
            <Link to="../messages" />
          }
        />
      </Route>
    </Routes>
  );
}
```

这个例子充分展示了当匹配到多个 URL 片段时，`<Link to="..">` 是基于父路由路径的。

## 用 `useRoutes` 替代 `react-router-config`

在 v5 中，如果我们想要以对象的形式定义路由，需要依赖 `react-router-config`。React Router 6 中引入了 `useRoutes` 这个 Hook 帮助我们实现同样的功能。大致结构如下：

```jsx
function App() {
  let element = useRoutes([
    // 和 `<Route>` 的属性是保持一致的
    { path: "/", element: <Home /> },
    { path: "dashboard", element: <Dashboard /> },
    {
      path: "invoices",
      element: <Invoices />,
      // 嵌套路由使用 `children` 属性，和 `<Route>` 是一样的
      children: [
        { path: ":id", element: <Invoice /> },
        { path: "sent", element: <SentInvoices /> },
      ],
    },
    // 捕获 404 Not Found
    { path: "*", element: <NotFound /> },
  ]);

  return element;
}
```

使用 `<Routes>` 以声明式的方式编写路由或借助 `useRoutes` 来生成路由都是可以的，选择你喜欢的方式就好。

## 用 `useNavigate`代替 `useHistory`

使用方法如下：

```jsx
// React Router v6 app
import { useNavigate } from "react-router-dom";

function App() {
  let navigate = useNavigate();
  function handleClick() {
    navigate("/home");
  }
  return (
    <div>
      <button onClick={handleClick}>go home</button>
    </div>
  );
}
```

更多写法上的改变可以参考以下描述。

```diff
// history.push => navigate(to)
- history.push('/home')
+ navigate('/home')

// history.replace => navigate(to, { replace: true })
- history.replace('/home')
+ navigate('/home', { replace: true })

// history.go => navigate(to: number)
// `useNavigate` 中并没有 goBack goForward 这类方法
- history.go(-2)
+ navigate(-2)
- history.goForward()
+ navigate(1)
- history.goBack()
+ navigate(-1)

// 传递 state：navigate(to, { state })
- history.push('/home', { subject: 'math', score: 95 })
+ navigate('/home', { state: { subject: 'math', score: 95 } })
```

## 重定向的处理

在 v5 中，我们实现重定向需要依赖 `<Redirect>` 组件，请看下面代码：

```jsx
import { Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route path="/home">
        <HomePage />
      </Route>
      <Redirect from="/" to="/home" />
    </Switch>
  );
}
```

当访问 `/` URL 时，会自动重定向到 `/home`。

但在 v6 中，你需要这样做：

```jsx
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Navigate replace to="/home" />} />
    </Routes>
  );
}
```

`<Navigate>` 一旦被渲染，就会改变当前 URL，所以它所实现的效果和上面是类似的。

_需要注意的是，`<Redirect>` 默认使用的是 `replace`（替换历史记录）逻辑，而 `<Navigate>` 默认使用的是 `push` 逻辑。_

## 其它变化

- 移除了 `<Link>` 的 `component` 属性
- `<Link>` 新增 `state` 属性用于传递 state 参数，而不再是传递对象给 `to` 属性
- 将 `<NavLink exact>` 替换为 `<NavLink end>`
- 移除了 `<NavLink>` 的 `activeClassName` 和 `activeStyle` 属性

## 结语

到这里，我们已经大致上介绍完 React Router 6 的新变化了。当然，还有很多细节上的变化我们没有罗列，我们只是挑了一些相对重要的点来展开描述。如果你想要迁移到 React Router 6，可以结合该升级指引和官方文档进行参考。欢迎大家友好地指出文章中错误或描述不恰当的地方，也欢迎大家讨论。

## 参考资料

- [Upgrading from v5 | React Router](https://reactrouter.com/en/main/upgrading/v5)
- [FAQs | React Router](https://reactrouter.com/en/main/getting-started/faq)
- [React Router v6 | Remix](https://remix.run/blog/react-router-v6)
- [Does v6 drop support for class components? | GitHub](https://github.com/remix-run/react-router/issues/8146)