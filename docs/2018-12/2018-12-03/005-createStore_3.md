# createStore 继续解读

```js
 /**
   * 保存一份订阅快照
   * @return {void}
   */
  function ensureCanMutateNextListeners() {
    //判断 nextListeners 和 currentListeners 是同一个引用
    if (nextListeners === currentListeners) {
      
      //通过数组的 slice 方法,复制出一个 listeners ,赋值给 nextListeners
      nextListeners = currentListeners.slice()
    }
  }

```
