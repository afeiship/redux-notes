# beforeMutatingListeners
+ https://github.com/reduxjs/redux/commit/c031c0a8d900e0e95a4915ecc0f96c6fe2d6e92b

## 又是一处性能优化：
Delay copying listeners until is necessary
We can avoid `excessive(过多的; 过分的; 过度的，极度的; 过逾;) slice()` calls by `only copying the listeners if they are modified` during dispatch()


## Why?
这次性能优化不是很理解, 原因是 dispatch 这里的的 listeners 为什么需要 slice()?

## 前面的 beforeMutatinListeners() 这个有点搞明白了
1. 在 subscribe 的时候，push listener 到数组中
2. 在 unsubscribe 的时候，splice 从数组中
3. 只有上面这两个时机会导致 listners 数组发生变化
4. 所以最后只需要取最新的 listeners 就行了这里永远需要取最新的
5. 但还是不明白，这里为什么需要 slice()?
6. 难道是：
```js
let nextListeners = currentListeners
//而：
const listners?
```
