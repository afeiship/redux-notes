# why dispatch slice:
+ https://github.com/reduxjs/redux/blob/v1.0.0-rc/src/Store.js
+ https://github.com/reduxjs/redux/blob/v1.0.0/src/createStore.js


## rc 中并没有 slice / v1.0.0 中已经 slice() 了
```js
// v1.0.0-rc 中的做法：
dispatch(action) {
  invariant(
    isPlainObject(action),
    'Actions must be plain objects. Use custom middleware for async actions.'
  );

  const { reducer } = this;
  this.state = reducer(this.state, action);
  this.listeners.forEach(listener => listener());
  return action;
}

// v1.0.0 就变成这样了：
 listeners.slice().forEach(listener => listener());

```
