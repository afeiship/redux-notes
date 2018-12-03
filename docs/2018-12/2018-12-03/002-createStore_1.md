# createStore_1
> 这个是核心文件，从这个入手

1. 导出工具包：
```js
import isPlainObject from 'lodash/isPlainObject'
import $$observable from 'symbol-observable'

```

## 具体分析：
- `isPlainObject` 这个比较很简单，是判断是否为纯 Object， 而不是那种 function/Class 创建出来的 Object
- `$$observable` 导入 symbol 类型的 observable (symbol类型的属性，是对象的私有属性)

## symbol-observable
- https://github.com/benlesh/symbol-observable
- Symbol.observable ponyfill (所以要搞清楚： Symbol.observable 的用法)


### Making an object "observable":
You can do something like what you see below to make any object "observable" by libraries like RxJS, XStream and Most.js.

Things to know:

It's best if you just use one of the above libraries.
If you're not, but sure you never next, error or complete on your observer after error or complete was called.
Likewise, make sure you don't next, error or complete after unsubscribe is called on the returned object.
```js
import Symbol_observable from 'symbol-observable';

someObject[Symbol_observable] = () => {
  return {
    subscribe(observer) {
      const handler = e => observer.next(e);
      someObject.addEventListener('data', handler);
      return {
        unsubscribe() {
          someObject.removeEventListener('data', handler);
        }
      }
    },
    [Symbol_observable]() { return this }
  }
}
```

Often, it's not very hard, but it can get tricky in some cases.

