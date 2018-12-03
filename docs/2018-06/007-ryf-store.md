# Store:
> Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。Redux 提供 `createStore` 这个函数，用来生成 Store。

```js
import { createStore } from 'redux';
const store = createStore(fn);
```
```conf
上面代码中，createStore函数接受另一个函数作为参数，返回新生成的 Store 对象。
```
