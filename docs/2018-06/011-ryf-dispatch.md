# store.dispatch()
> store.dispatch()是 View 发出 Action 的唯一方法。

> 此处用的是 action:
```js
import { createStore } from 'redux';
const store = createStore(fn);

store.dispatch({
  type: 'ADD_TODO',
  payload: 'Learn Redux'
});
```
```conf
上面代码中，store.dispatch接受一个 Action 对象作为参数，将它发送出去。
结合 Action Creator，这段代码可以改写如下。
```

> 此处用的是 actionCreator:
```js
store.dispatch(addTodo('Learn Redux'));
```
