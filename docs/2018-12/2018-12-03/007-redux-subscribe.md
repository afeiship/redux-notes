# redux subscribe:
+ https://github.com/reduxjs/redux/releases/tag/v3.0.4
~~~
每次通过dispatch 修改数据的时候，其实只是数据发生了变化，如果不手动调用 render方法，页面上的内容是不会发生变化的。
但是每次dispatch之后都手动调用很麻烦啊，所以就使用了发布订阅模式，监听数据变化来自动渲染。

关于 subscribe 的BUG优化：
Unsubscribing a store listener is now a no-op when called twice instead of a bug
~~~

## subscribe 方法的变化(v3.0.0 -> v3.0.4 这里有些小变化)：
```js
// https://github.com/reduxjs/redux/blob/v3.0.3/src/createStore.js
  function subscribe(listener) {
      listeners.push(listener);
      return function unsubscribe() {
          var index = listeners.indexOf(listener);
          listeners.splice(index, 1)
      }
  }



  // https://github.com/reduxjs/redux/blob/v3.0.4/src/createStore.js
  // https://github.com/reduxjs/redux/commit/b7031ce3acb23b6ecadbd977b1cfa32486447904
  // Add protection against newer unsubscribe removing older listeners
  /*
  上面的方法有个漏洞：
  var destroy1 = subscribe(fn1);
  var destroy2 = subscribe(fn2);
  这个时候，unsubscribe 里面的逻辑永远是 splice(-1, 1)，这样就会不断的删除里面的数据
  如果这个时候： destroy1();  执行了多次，就会将 listners 里的的不应该他删除的东西也删除掉了
  */

  //实际上用这个版本应该也行?
  function subscribe(listener) {
    listeners.push(listener);
    return function unsubscribe() {
        var index = listeners.indexOf(listener);
        if(index!==-1){
          listeners.splice(index, 1);
        }
    }
  }
 
  // 这个版本的性能会更好一些，如果不符合条件的，根本不会走 unsubscribe，其它的优点倒是没有发现：
  // 上面的，只要调用 unsubscribe 就会走一次 indexOf，还是会有一些性能开销的

  function subscribe(listener) {
    listeners.push(listener);
    var isSubscribed = true;

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;
      var index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }
```
