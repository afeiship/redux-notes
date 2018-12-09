# applyMiddleware es5

```js
module.exports = function applyMiddleware() {
  var middlewares = [].slice.call(arguments);
  return function(createStore){
    return function(reducer, preloadedState, enhancer){
      var store = createStore(reducer, preloadedState, enhancer);
      
      // 根据后面 compose 的实现，这里的初始化可以直接放在后面，或者不要
      var _dispatch = store.dispatch;
      var chain = [];

      /*
      在实际写中间件的过程中，需要用到这两个方法
      这里，真正使用的时候，利用闭包，能保证，最终用户调用的 dispath 是我们层层包装过的 _dispatch。
      这里不能用： store.dispatch 代替
      */
      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };

      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });

      // 第一个传给 middleware 的next 实际上是 store.dispatch 函数 
      _dispatch = compose.apply(null, chain)(store.dispatch);

      /*
        实际中使用的 dispatch 会被 compose 包装过的 _dispatch 给替换掉
        这样就可以保证，我们在项目中使用 dispatch 的时候，我们的 dispatch 里面的内容都是经过 中间件处理过的
      */
      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
};
```
