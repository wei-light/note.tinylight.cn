---
title: 解析 BFC
date: 2022-10-16
duration: 15min
---

在 CSS 中，存在大量与布局相关的概念，虽说我们并不一定要了解，但能熟悉这些概念的话，确实可以在一定程度上提高我们的 CSS 能力。本文主要介绍的是块格式化上下文（Block Formatting Context），也就是我们常说的 BFC。

## 什么是 BFC

在开始解释 BFC 之前，我们先来了解一下在 CSS 2 中的几种[布局模式](https://w3c.github.io/csswg-drafts/css2/#positioning-scheme)。它们分别是：普通流（Normal flow），浮动（Float），绝对定位（Absolute positioning）。默认我们不对布局进行任何控制时，元素是处于普通流中的。而处于普通流中的元素将会从属于一种格式化上下文（Formatting context）。块级元素会参与块格式化上下文（BFC），行内元素会参与行内格式化上下文（IFC）。格式化上下文，可以简单理解为一块渲染区域，它内部有一套自己的渲染规则，而不同类型的格式化上下文会采用不同的渲染规则。

块格式化上下文（Block formatting context，简称 BFC），格式化上下文的一种。它也是一块独立的渲染区域，同时它有自己的规则来限制其内部元素如何进行布局。

## BFC 的特性

BFC具体有以下约束规则：

- 从包含块（Containing block）的顶部开始，垂直地一个接一个排列盒子[^1]
- 同级盒子之间的距离由 `margin` 属性决定，属于同一个 BFC 的两个相邻盒子会产生外边距折叠
- 每个元素的左外边距与包含块的左边界相接触，即使浮动元素也是如此
- BFC 的区域不会与浮动元素区域重叠[^2]
- 计算 BFC 的高度时，浮动的子元素也参与计算[^3]

## BFC 的应用

根据上面的 BFC 的约束规则，我们可以总结出其应用场景：阻止外边距折叠，包含内部浮动，排除外部浮动。

### 阻止外边距折叠

```html
<style>
  p {
    width: 150px;
    height: 100px;
    background-color: pink;
    margin: 50px;
  }
</style>

<body>
  <p></p>
  <p></p>
</body>
```

![](/images/articles/depth-in-bfc/1.png)

虽然两个 `p` 元素都设置了 `50px` 的外边距，但由于折叠的原因，它们之间的距离最终只有 `50px`。

前面我们说到：

> 属于同一个 BFC 的两个相邻盒子会产生外边距折叠

我们可以给第一个 `p` 元素包裹一个 `div` 元素，并让其建立新的 BFC。这样，两个 `p` 元素就不属于同一个 BFC，自然就不会产生外边距折叠的问题。如何触发 BFC 呢？只需要设置 `overflow: hidden` 即可。

```html
<style>
  .wrapper {
    overflow: hidden;
  }

  p {
    width: 150px;
    height: 100px;
    background-color: pink;
    margin: 50px;
  }
</style>

<body>
  <div class="wrapper">
    <p></p>
  </div>
  <p></p>
</body>
```

![](/images/articles/depth-in-bfc/2.png)

对于同级的元素来说，通过建立 BFC 去解决外边距折叠的问题是没有什么意义的，因为我们往往要在外层包裹一个元素。这种方式更适合解决父子元素之间的外边距折叠。

_如果你想更深入地了解外边距折叠，不妨看看我的另一篇文章：_[_CSS 中的外边距合并_](/articles/margin-collapse)

### 清除浮动

```html
<style>
  .parent {
    width: 300px;
    border: 4px solid #92adfe;
  }

  .child {
    float: left;
    width: 100px;
    border: 4px solid #5370c6;
    height: 100px;
  }
</style>

<body>
  <div class="parent">
    <div class="child"></div>
    <div class="child"></div>
  </div>
</body>
```

![](/images/articles/depth-in-bfc/3.png)

默认情况下，浮动会造成父容器高度塌陷，这不是我们想要的。通常，我们会使用 `clearfix` 清除浮动来避免这种现象。实际上，触发 BFC 也可以解决这个问题。

根据 BFC 特性的：

> 计算 BFC 的高度时，浮动的子元素也参与计算

我们可以通过为父元素建立 BFC，以此来达到清除浮动的效果。

```html
<style>
  .parent {
    overflow: hidden;
    width: 300px;
    border: 4px solid #92adfe;
  }

  .child {
    float: left;
    width: 100px;
    border: 4px solid #5370c6;
    height: 100px;
  }
</style>

<body>
  <div class="parent">
    <div class="child"></div>
    <div class="child"></div>
  </div>
</body>
```

![](/images/articles/depth-in-bfc/4.png)

### 排除外部浮动

先来看看下面的结构：

```html
<style>
  .container {
    width: 350px;
  }

  .fl {
    float: left;
    width: 150px;
    height: 200px;
    background-color: #bfdbfe;
  }

  .box {
    width: 200px;
    height: 300px;
    background-color: #ddd6fe;
  }
</style>
<body>
  <div class="container">
    <div class="fl"></div>
    <div class="box"></div>
  </div>
</body>
```

![](/images/articles/depth-in-bfc/5.png)

它最终展现出来的效果是浮动元素叠加在了普通的元素上方，这也很好理解，因为浮动元素会脱离普通流。

现在我们尝试为普通元素触发 BFC。

```html
<style>
  .container {
    width: 350px;
  }

  .fl {
    float: left;
    width: 150px;
    height: 200px;
    background-color: #bfdbfe;
  }

  .box {
    overflow: hidden;
    width: 200px;
    height: 300px;
    background-color: #ddd6fe;
  }
</style>
<body>
  <div class="container">
    <div class="fl"></div>
    <div class="box"></div>
  </div>
</body>
```

![](/images/articles/depth-in-bfc/6.png)

可以看到，BFC 的区域并不会与浮动元素的区域重叠。

这同样是我们说到的 BFC 特性之一：

> BFC 的区域不会与浮动元素区域重叠

通过该特性，我们就能实现一些布局效果了，如两栏布局，右侧自适应：

```html
<style>
  body {
    width: 100vw;
    height: 100vh;
  }

  .aside {
    float: left;
    width: 200px;
    height: 100%;
    background-color: #bfdbfe;
  }

  .main {
    overflow: hidden;
    height: 100%;
    background-color: #ddd6fe;
  }
</style>
<body>
  <div class="aside"></div>
  <div class="main"></div>
</body>
```

甚至是三栏布局，中间自适应：

```html
<style>
  body {
    width: 100vw;
    height: 100vh;
  }

  .left {
    float: left;
    width: 200px;
    height: 100%;
    background-color: #bfdbfe;
  }

  .center {
    overflow: hidden;
    height: 100%;
    background-color: #ddd6fe;
  }

  .right {
    float: right;
    width: 300px;
    height: 100%;
    background-color: #99f6e4;
  }
</style>
<body>
  <div class="left"></div>
  <div class="right"></div>
  <div class="center"></div>
</body>
```

## 创建 BFC 常用的方式

通常来说，我们会采用下面一些方式来创建 BFC。

- `float` 值不为 `none`
- `position` 值为 `absolute` 或 `fixed`
- `overflow` 值不为 `visible`、`clip`
- `display` 值为 `inline-block`、`table`、`table-cell` 等

而对于根元素来说，即 `html` 标签，它本身就一个 BFC。

## 创建 BFC 的新方式

你可以通过设置 `overflow` 的值为 `hidden`、`auto`，甚至是 `scroll` 来创建一个新的 BFC，但这会存在两个问题。首先，它可能会带来副作用，因为 `overflow` 属性本来就是控制元素溢出后的状态的。
即使它没有产生副作用，他人都难以揣摩你的意图，你的本意究竟是想裁剪溢出的内容还是溢出后显示滚动条。但实际上都不是，你只想创建一个新的 BFC，仅此而已。

所以说，我们需要一种无副作用，同时又能令开发者理解其意图的方式来创建 BFC。CSS 工作组非常认同这种想法，为此他们制定了一个新的属性值：`display: flow-root`。

你可以使用 `display: flow-root` 安全地创建 BFC 来解决上面提到的各种问题：阻止外边距折叠、包含浮动元素、排除外部浮动。

![Compatibility Reference](/images/articles/depth-in-bfc/7.png)

但该属性值的兼容性不是那么好，仅支持一些现代浏览器。

## 写在最后

到这里，相信你已经对 BFC 有了初步的了解，也知道它的一些应用场景了。虽然本文参考了不少文章，但为了确保文章的准确性，所有内容我都逐一查阅了 W3C 规范中的相关描述。如有错误或描述不恰当的地方，请大家友好地提出。

## 参考资料

- [Block formatting context - CSS 2](https://w3c.github.io/csswg-drafts/css2/#block-formatting)
- [CSS 布局中的术语](https://drafts.csswg.org/css-display/#glossary)
- [史上最全面、最透彻的 BFC 原理剖析](https://juejin.cn/post/6844903496970420237)
- [Understanding CSS Layout And The Block Formatting Context](https://www.smashingmagazine.com/2017/12/understanding-css-layout-block-formatting-context/)

[^1]: https://w3c.github.io/csswg-drafts/css2/#block-formatting
[^2]: https://w3c.github.io/csswg-drafts/css2/#bfc-next-to-float
[^3]: https://w3c.github.io/csswg-drafts/css2/#root-height