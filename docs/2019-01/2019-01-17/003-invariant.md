# invariant
> 这个是一个友好的报错 lib

## desc:
> A way to provide descriptive errors in development but generic errors in production.

## usage:
```js
var invariant = require('invariant');
invariant(someTruthyVal, 'This will not throw');
// No errors
invariant(someFalseyVal, 'This will throw an error with this message');
// Error: Invariant Violation: This will throw an error with this message
```

## 在 react-redux 源码中的实际应用：
```js
// 还支持传参数进来：
invariant(
  isPlainObject(stateProps),
  '`mapStateToProps` must return an object. Instead received %s.',
  stateProps
);
```
