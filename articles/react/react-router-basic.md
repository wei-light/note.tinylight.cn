---
title: React Router 入门
date: 2022-08-21
duration: 26min
---

正如 React 官网的自述，React 是用于构建用户界面的 JavaScript 库，它主要关注的视图的构建。所以，想要实现一个完整的应用还要依赖 React 的生态体系。而现在的 Web 应用大多是单页面应用（SPA），顾名思义只有一个页面，但用起来又好像有不同页面之间的切换。这实际上是通过前端路由完成的效果，不同框架都有各自的实现，在 React 中是通过 React Router 来实现的。

React Router 是一个用于 React 应用的轻量级、功能齐全的路由库。它可以运行在 React 支持的平台，Web、Server（Node.js）还有 React Native。

与 React 类似，React Router 也提供了不同的包以适应不同的平台：

- `react-router`：提供 React Router 的所有核心功能
- `react-router-dom`：主要用于 Web 应用
- `react-router-native`：与 React Native 结合使用

> 请注意，我们不应该直接导入 `react-router`，而是根据不同的平台选择 `react-router-dom` 或者 `react-router-native` 中的一个。实际上这两个包都重新导出了 `react-router` 的所有内容，可以理解为它们都是在核心库上进行扩展以适应不同平台的包。

## 安装

由于现在 React Router 6 已经成为默认版本，而我们是先从 v5 版本开始介绍的。因此，在安装时我们需要指定 `react-router-dom` 的版本号。
你可以通过目前流行的一些包管理器安装它：

```bash
npm install react-router-dom@5.3.3
# or
yarn add react-router-dom@5.3.3
# or
pnpm add react-router-dom@5.3.3
```

## 基础案例

通过 React，我们已经将应用拆分成一个一个的组件了。接下来，我们只需配合使用 React Router 将组件映射到路由上即可。下面是一个简单的案例。

_说明：本教程中并非所有案例都提供了完整可运行的代码，请注意区分。_

```jsx
import React from "react"
import { BrowserRouter, Route, Link } from "react-router-dom"

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          {/* 使用 Link 组件进行导航 */}
          {/* `to` 指定链接 */}
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* 使用 Route 生成映射关系 */}
        {/* `path` 匹配的路径 | `componet` 路径对应的组件 */}
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
      </div>
    </BrowserRouter>
  )
}

function Home() {
  return <h2>Home</h2>
}

function About() {
  return <h2>About</h2>
}

function Contact() {
  return <h2>Contact</h2>
}
```

### BrowserRouter

指定使用的路由模式为 History。当然，React Router 也支持 Hash 模式，只需将 `BrowserRouter` 替换为 `HashRouter` 即可。需要注意的是，作为路由的容器，它们需要在最外层。

### Link

这里我们并没有使用常规的 `a` 标签，而是使用了 React Router 中的一个自定义组件。该组件可以让应用在不重新加载页面的情况下更改 URL。

### Route

当 URL 和 `path` 相匹配时，就会渲染对应的组件到 `Route` 所放置的地方。这意味着你可以将 `Route` 放到你想要的位置以适应你的页面布局。

而对于 `Route` 属性 `component` 所指定的组件，我们称其为路由组件。与一般的组件不同，路由组件默认会接收到一些 props，分别是 `history`、`location`、`match`。后面的演示中会逐步使用到它们。

![](/images/articles/react/react-router-basic/1.png)

## 动态路由匹配

很多时候，我们需要将给定匹配模式的路由映射到同一个组件。例如，我们可能有一个 `User` 组件，它应该对所有用户进行渲染，但用户 ID 不同。在 React Router 中，我们可以在路径中使用一个动态字段来实现，我们称其为 _param_：

```jsx
import React from "react"
import { BrowserRouter, Route, Link } from "react-router-dom"

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/users/johnny">Johnny</Link>
          <Link to="/users/jolyne">Jolyne</Link>
        </nav>

        {/* 动态字段以 `:` 开始 */}
        {/* 如果你曾经使用过类似 Express 这样的框架，你会对这种方式很熟悉 */}
        <Route path="/users/:id" component={User} />
      </div>
    </BrowserRouter>
  )
}

function User() {
  return <h2>User</h2>
}
```

像上面案例中的 `/users/johnny` 和 `/users/jolyne` 这样的 URL 都会映射到同一个路由上。

当一个路由被匹配时，其渲染的组件就可以通过 props 下的 `match.params` 接收到相应的 params 值。因此，我们可以更新 `User` 组件来展示当前用户的 ID：

```jsx
function User(props) {
  return <h2>{ props.match.params.id }</h2>
}
```

你可以在同一个路由中设置多个 _param_，它们都会映射到 `props.match.params` 的相应字段上。如：

| **匹配模式**                   | **匹配路径**         | **match.params**                     |
| ------------------------------ | -------------------- | ------------------------------------ |
| /users/:username               | /users/amy           | `{ username: 'amy' }`                |
| /users/:username/:postId       | /users/amy/123       | `{ username: 'amy', postId: '123' }` |
| /users/:username/posts/:postId | /users/amy/posts/123 | `{ username: 'amy', postId: '123' }` |

## 单一匹配

有了上面的知识作铺垫，我们来考虑下面的案例：

```jsx
import { Route } from "react-router-dom"

const routes = (
  <div>
    <Route path="/about" component={About} />
    <Route path="/:user" component={User} />
    {/* 没有 `path`，表示始终与当前 URL 匹配，一般用于捕获 404 Not Found */}
    <Route component={NoMatch} />
  </div>
)
```

首先要说明一点，**每个 `Route` 之间各自是独立的**，也就是说，只要路径相匹配，就会渲染对应的组件。如果当前 URL 是 `/about`，那么 `About`，`User` 和 `NoMatch` 组件都会渲染，因为它们都匹配上了。

然而，我们并不想要这样的效果，我们更希望只有一个 `Route` 被渲染。当 URL为 `/about` 时，不应该匹配上 `:/user`（或者是 "404" 页面）。这时，`Switch` 就派上用场了：

```jsx
import { Route, Switch } from "react-router-dom"

const routes = (
  <div>
    <Switch>
      <Route path="/about" component={About} />
      <Route path="/:user" component={User} />
      <Route component={NoMatch} />
    </Switch>
  </div>
)
```

现在，如果我们访问 `/about`，`Switch` 就会开始逐个匹配 `Route`，而它发现第一个 `Route` 已经匹配上了，就会停止继续匹配，渲染 `About` 组件。类似的，如果 URL 为 `/michael`，渲染的就是 `User` 组件。

_一般情况下，我们都会在 `Route` 的外侧包裹 `Switch`_

## 精确匹配

再来考虑一个实际的案例：

```jsx
import { Route, Switch } from "react-router";

const routes = (
  <Switch>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
  </Switch>
)
```

上面的需求是常见的，我一般会让根路径对应网站的首页。结果也确实是如此，当我们访问 `/` 时展示的是 `Home` 组件。但我们访问 `/about` 或 `/contact` 时展示的依然是 `Home` 组件，这就不是我们期望的效果了。

由于 `Route` 中 `path` 的匹配默认是模糊匹配，因此，URL 为 `/about` 是可以匹配上 `/` 路径的。要解决上面的问题其实很简单，只需要为 `<Route path="/" ... />` 设置属性 `exact` 为 `true`，开启精确匹配即可。

为了方便理解匹配的机制，请看以下表格：

| **path** | **location.pathname** | **exact** | **matches?** |
| -------- | --------------------- | --------- | ------------ |
| /        | /one/two              | false     | yes          |
| /one     | /one/two              | false     | yes          |
| /one     | /one/two              | true      | no           |

_请注意，我们一般选择默认的模糊匹配即可，因为它是后面要讲到的嵌套路由实现的基石，随意开启精确匹配可能会导致嵌套路由失效。_

## 嵌套路由

前面我们讲的所有案例都只是一级路由，但大多数应用的 UI 都是由多层嵌套的组件构成的。在 React Router 中我们需要通过嵌套路由来表示这种关系。请看下面结构：

```jsx
import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom"

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

function Home() {
  return <h2>Home</h2>
}

function About() {
  return (
    <div>
      <nav>
        <Link to="/about/company">Company</Link>
        <Link to="/about/team">Team</Link>
      </nav>

      <Switch>
        {/* `render` 方便地通过内联函数渲染结构  */}
        <Route path="/about/company" render={() => <h2>Company</h2>} />
        <Route path="/about/team" render={() => <h2>Team</h2>} />
      </Switch>
    </div>
  )
}

function Contact() {
  return <h2>Contact</h2>
}
```

`<Route path="/" ... />` 和 `<Route path="/contact" ... />` 就不再介绍了，它们都只有一级路由，访问相应路径最后分别渲染 `Home` 和 `Contact` 组件。

现在，我们根据已有的知识来逐步了解嵌套路由的工作过程：

1. 当访问 `/about` 路径时，自然是匹配到 `About` 组件，渲染组件的内容。`Link` 组件默认就会被转为 `a` 标签展示到页面，但不要忘记 `Switch` 组件也已经渲染了，它会开始工作，只是没有找到匹配项，不能展示到页面而已。
2. 访问 `/about/company` 时，还是先匹配到 `About` 组件，进而渲染其内容。然后里面的 `Switch` 开始工作，这次 `<Route path="/about/company" ...>` 是可以匹配到当前访问的路径的，所以 `Company` 组件也会被渲染。

_上面已经比较详细描述过嵌套路由的渲染过程了，总而言之就是先匹配一级路由，再到二级路由...，以此类推。匹配的过程是层层递进的，并非一下就能确定最终要渲染的结构。_

到这里其实嵌套路由的使用已经介绍得差不多了，更多级的路由实现的过程也是类似的。但细心的你可能会发现，子路由路径的前面部分始终是跟父路由的路径保持一致的（对 URL 来说也是类似的），因此，我们还能作以下优化。

```jsx
function About(props) {
  const { url, path } = props.match
  return (
    <div>
      <nav>
        <Link to={`${url}/company`}>Company</Link>
        <Link to={`${url}/team`}>Team</Link>
      </nav>

      <Switch>
        <Route path={`${path}/company`} render={() => <h2>Company</h2>} />
        <Route path={`${path}/team`} render={() => <h2>Team</h2>} />
      </Switch>
    </div>
  )
}
```

## 重定向

重定向在实际开发中是存在很多应用场景的，了解和知道它的使用也是必要的。在 React Router 中重定向是通过 `Redirect` 组件实现的，**该组件一旦渲染，就会进行重定向**。

下面通过两个小示例来了解 `Redirect` 组件的基本使用。

1. 访问 `/` 重定向到 `/about`

```jsx
import { Route, Switch, Redirect } from "react-router";

const routes = (
  <Switch>
    {/* Redirect 在这里是作为 `children` props 传递的 */}
    <Route exact path="/">
      {/* `to` 重定向的 URL */}
      <Redirect to="/about" />
    </Route>
    <Route path="/home" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
  </Switch>
)

/* --------------- another method ------------------- */

const routes = (
  <Switch>
    {/* `from` 从哪里进行重定向 */}
    {/* Redirect 只有作为 Switch 的直接子元素时才能使用 `from`，`exact` 才有意义 */}
    <Redirect exact from="/" to="/about" />
    <Route path="/home" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
  </Switch>
)
```

2. 权限验证

```jsx
import { Redirect } from "react-router-dom"

function Profile() {
  const isLogin = false

  return isLogin ? (
    <div>
      <h2>User</h2>
      <h3>Alice</h3>
    </div>
  ) : <Redirect to="/login" />
}
```

## 参数传递

React Router 中有三种方式可以向路由组件传递参数，分别是 params 参数、search 参数、state 参数，其中 params 参数已经在前面有所提及了，但在这里依然会作统一的介绍。

### params 参数

```jsx
import { Link, BrowserRouter, Route } from "react-router-dom"

const messages = [
  { id: 1, title: 'message1' },
  { id: 2, title: 'message2' },
  { id: 3, title: 'message3' },
]

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        {messages.map(m => (
          <Link to={`/message/${m.id}/${m.title}`} key={m.id} >{m.title}</Link>
        ))}
      </nav>

      <Route path="/message/:id/:title" component={Message} />
    </BrowserRouter>
  )
}

function Message(props) {
  // params 得到的是对象，直接解构赋值即可
  const { id, title } = props.match.params

  return (
    <div>
      <h3>id: {id}</h3>
      <h3>title: {title}</h3>
    </div>
  )
}
```

### search 参数

```jsx
import { Link, BrowserRouter, Route } from "react-router-dom"

const messages = [
  { id: 1, title: 'message1' },
  { id: 2, title: 'message2' },
  { id: 3, title: 'message3' },
]

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        {messages.map(m => (
          // search 参数的传递 `?key1=value1&key2=value2`
          <Link to={`/message?id=${m.id}&title=${m.title}`} key={m.id}>{m.title}</Link>
        ))}
      </nav>

      <Route path="/message" component={Message} />
    </BrowserRouter>
  )
}

function Message(props) {
  const search = {}

  // React Router 是没有对 search 参数进行处理的，它直接返回类似
  // `?id=3&title=message3` 的字符串，你要自己处理
  props.location.search.slice(1).split('&').forEach(item => {
    const [key, val] = item.split('=')
    search[key] = val
  })

  return (
    <div>
      <h3>id: {search.id}</h3>
      <h3>title: {search.title}</h3>
    </div>
  )
}
```

这里需要注意 React Router 不会帮助我们处理 search 参数，我们可以采用自己喜欢的方式处理，如：

1. 结合字符串和数组上的方法进行处理（即上面的方式）
2. 采用 `URLSearchParams` 处理
3. 使用一些第三方工具库处理，等等

### state 参数

与前面两种参数传递的方式相比，state 参数具有以下特点：

1. 你并不会直接在地址栏中看到传递的参数
2. 参数的类型不再是固定的，我们可以传递 Number、String、Boolean，或者是 Object、Array 等类型

```jsx
import { Link, BrowserRouter, Route } from "react-router-dom"

const messages = [
  { id: 1, title: 'message1' },
  { id: 2, title: 'message2' },
  { id: 3, title: 'message3' },
]

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        {messages.map(m => (
          // `to` 除了可以传递字符串，其实还支持对象的形式
          <Link to={{ pathname: '/message', state: m }} key={m.id}>{m.title}</Link>
        ))}
      </nav>

      <Route path="/message" component={Message} />
    </BrowserRouter>
  )
}

function Message(props) {
  // state 传的是什么类型的数据，这里就怎么接收
  const { id, title } = props.location.state || {}

  return (
    <div>
      <h3>id: {id}</h3>
      <h3>title: {title}</h3>
    </div>
  )
}
```

现在，state 参数的传递也已经实现了，看起来也挺简单的。但是，我们需要注意一个前面提到的特点，在地址栏中是没有任何参数信息的，如果我们刷新页面，传递的数据会丢失吗？

这与你采用的路由模式有关，对于 History 模式，刷新页面依然能获取到数据，但如果使用的是 Hash 模式，刷新页面后数据就丢失了。如果不是出于兼容性的考虑，你最好使用 `BrowserRouter`。

![](/images/articles/react/react-router-basic/2.png)

## 编程式导航

在前面我们都是通过 `Link` 组件来完成页面的导航的，我们称这种形式的导航为声明式导航。但在实际开发中，我们可能有这样的需要，在一个组件挂载后 2s，跳转到另外的 URL。对于这样的需求，我们就可以通过下面讲到的编程式导航实现。

前面我们已经提到过路由组件会接收到三个 props，其中一个就是 `history`，编程式导航的实现主要也是依靠它。它内部包含下面一些方法：

- `push(path, [state])`：压入一条新记录到历史记录栈中
- `replace(path, [state])`：替换当前记录
- `go(n)`：前进/后退 `n` 条记录，正数表示前进，负数表示后退
- `goBack()`：等同于 `go(-1)`
- `goForward()`：等同于 `go(1)`

_如果你使用过 H5 中原生 History API，你会对这些方法感到很熟悉，并且能快速上手。_

下面就简单演示一下它的使用。

```jsx
function Welcome(props) {
  // 该组件必须作为路由组件才能接收到 history
  const { history } = props

  return (
    <div>
      <h2>Welcome</h2>
      <button onClick={() => history.push('/home')}>push</button>
    </div>
  )
}
```

## withRouter

我们已经反复强调过只有路由组件才能收到 `history`、`location`、`match` 这三个 props。但有时候我们确实需要让非路由组件也具有这些 props，那么就要使用到 `withRouter` 了。`withRouter` 是一个高阶组件，当你传入一个非路由组件时，它会返回一个具有以上 props 的新组件。

```jsx
import { withRouter } from "react-router-dom"

export default function App() {
  return (
    <div>
      <AppHeader />
    </div>
  )
}

const AppHeader = withRouter(
  function Header(props) {
    return <h2>Header</h2>
  }
)
```

## 不同的路由模式

通过在最外侧包裹不同的路由容器，最终决定应用采用的路由模式，`BrowserRouter` 对应 History 模式，`HashRouter` 对应 Hash 模式。它们主要有以下区别：

1. `BrowserRouter` 本质上使用的是 H5 的 History API，而 `HashRouter` 使用的是 URL 的 hash（哈希值）。
2. `BrowserRouter` 的 URL 是不带 `#` 的，看起来更美观，更像是路径。但 `HashRouter` 的 URL 是带有 `#` 的。
3. 页面刷新会导致 `HashRouter` 的 state 参数丢失，而 `BrowserRouter` 是不受影响的。

> 还有其它一些不同点和注意点，可以参考一下 Vue Router 对此的描述：[不同的历史模式 | Vue Router](https://router.vuejs.org/zh/guide/essentials/history-mode.html)

## 写在最后

浏览完本教程，相信你已经对 React Router 有了初步的了解，文章中的内容也只是简单介绍了一些 React Router 的基本使用，篇幅有限，不可能把所有知识点都全部覆盖。如果在阅读教程的过程中遇到一些不太理解的地方或者阅读完后想继续深入了解 React Router，都推荐去看[官方文档](https://v5.reactrouter.com/)。文中若出现描述不恰当或错误的地方，欢迎大家友好地指出。