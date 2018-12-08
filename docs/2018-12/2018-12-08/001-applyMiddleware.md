# applyMiddleware:
+ https://zhuanlan.zhihu.com/p/20597452

```js
// redux@1.0.0 源码：
export default function applyMiddleware(...middlewares) {
  return (next) => (reducer, initialState) => {
    var store = next(reducer, initialState);
    var dispatch = store.dispatch;
    var chain = [];

    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    };
    chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain, store.dispatch);

    return {
      ...store,
      dispatch
    };
  };
}

// 用 es5 转化源码：
module.exports = function applyMiddleware(){
  var middlewares = [].slice.call(arguments);
  return function(next){
    return function(reducer, initialState){
      //....
    };
  };
};

```



