# why middleware:
- https://zhuanlan.zhihu.com/p/20597452

## redux middleware 详解
~~~
It provides a third-party extension point between dispatching an
action, and the moment it reaches the reducer.

这是 redux 作者 Dan 对 middleware 的描述
1. middleware 提供了一个分类处理 action 的机会
2. 在 middleware 中你可以检阅每一个流过的 action
3. 挑选出特定类型的 action 进行相应操作
4. 给你一次改变 action 的机会。
~~~

## 为什么 dispatch 需要 middleware
![](https://ws2.sinaimg.cn/large/006tNbRwgy1fxzq1s6d08j30k003wjri.jpg)

上图表达的是 redux 中一个简单的同步数据流动的场景，点击 button 后，在回调中 dispatch 一个 action，reducer 收到 action 后，更新 state 并通知 view 重新渲染。单向数据流，看着没什么问题。但是，如果需要打印每一个 action 信息用来调试，就得去改 dispatch 或者 reducer 代码，使其具有打印日志的功能；又比如点击 button 后，需要先去服务器请求数据，只有等拿到数据后，才能重新渲染 view，此时我们又希望 dispatch 或者 reducer 拥有异步请求的功能；再比如需要异步请求完数据后，打印一条日志，再请求数据，再打印日志，再渲染...

面对多种多样的业务需求，单纯的修改 dispatch 或 reducer 的代码显然不具有普世性，我们需要的是可以组合的，自由插拔的插件机制，这一点 redux 借鉴了 koa 里中间件的思想，koa 是用于构建 web 应用的 NodeJS 框架。另外 reducer 更关心的是数据的转化逻辑，所以 redux 的 middleware 是为了增强 dispatch 而出现的。

![](https://ws1.sinaimg.cn/large/006tNbRwgy1fxzq36cxp1j30k004f0t1.jpg)


## 四步理解 middleware 机制
图下边是 logger，打印 action 的 middleware，图上边则是 applyMiddleware 的源码，applyMiddleware 代码虽然只有二十多行，却非常精炼，接下来我们就分四步来深入解析这张图。

redux 提供了 applyMiddleware 这个 api 来加载 middleware
![](https://pic1.zhimg.com/80/8fe84a1600b6b2d98dc69dc08f016e00_hd.png)



### Step. 1 函数式编程思想设计 middleware

middleware 的设计有点特殊，是一个层层包裹的匿名函数，这其实是函数式编程中的柯里化 curry，一种使用匿名单参数函数来实现多参数函数的方法。applyMiddleware 会对 logger 这个 middleware 进行层层调用，动态地对 store 和 next 参数赋值。

柯里化的 middleware 结构好处在于：

易串联，柯里化函数具有延迟执行的特性，通过不断柯里化形成的 middleware 可以累积参数，配合组合（ compose，函数式编程的概念，Step. 2 中会介绍）的方式，很容易形成 pipeline 来处理数据流。

共享store，在 applyMiddleware 执行过程中，store 还是旧的，但是因为闭包的存在，applyMiddleware 完成后，所有的 middlewares 内部拿到的 store 是最新且相同的。

另外，我们可以发现 applyMiddleware 的结构也是一个多层柯里化的函数，借助 compose ， applyMiddleware 可以用来和其他插件一起加强 createStore 函数。

```js
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

const finalCreateStore = compose(
  // Middleware you want to use in development:
  applyMiddleware(d1, d2, d3),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument()
)(createStore);
```

## Step. 2 给 middleware 分发 store


