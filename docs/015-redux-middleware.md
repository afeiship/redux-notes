# redux-middlewale:
+ http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html


## 中间件的概念
> 为了理解中间件，让我们站在框架作者的角度思考问题：如果要添加功能，你会在哪个环节添加？

1. Reducer：纯函数，只承担计算 State 的功能，不合适承担其他功能，也承担不了，因为理论上，纯函数不能进行读写操作。
2. View：与 State 一一对应，可以看作 State 的视觉层，也不合适承担其他功能。
3. Action：存放数据的对象，即消息的载体，只能被别人操作，自己不能进行任何操作。

想来想去，只有发送 Action 的这个步骤，即 `store.dispatch()` 方法，可以添加功能。举例来说，要添加日志功能，把 Action 和 State 打印出来，可以对 `store.dispatch` 进行如下改造。

```js
let next = store.dispatch;
store.dispatch = function dispatchAndLog(action) {
  console.log('dispatching', action);
  next(action);
  console.log('next state', store.getState());
}
```
