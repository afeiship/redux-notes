# redux-analysis
+ https://github.com/fi3ework/redux-analysis

## 终于搞明白了 为什么需要在 dispatch 的时候去 slice() 了

```js
  function dispatch (action) {
    // action必须是一个plain object，如果想要能处理传进来的函数的话必须使用中间件（redux-thunk等）
    if (!isPlainObject(action)) {
      throw new Error(
        'Actions must be plain objects. ' +
          'Use custom middleware for async actions.'
      )
    }
    // action必须定义type属性
    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
          'Have you misspelled a constant?'
      )
    }
    // 同上，保证纯函数不带来副作用
    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }
    // currentReducer不可预料是否会报错，所以try，但不catch
    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      // 必须在结束的时候将isDispatching归位
      isDispatching = false
    }

    // 在这里体现了currentListeners和nextListeners的作用
    // 我去翻了一下redux的commit message，找到了对listener做深拷贝的原因：https://github.com/reactjs/redux/issues/461
    // 简单来说就是在listener中可能有unsubscribe操作，比如有3个listener(下标0,1,2)，在第2个listener执行时unsubscribe了自己
    // 那么第3个listener的下标就变成了1，但是for循环下一轮的下标是2，第3个listener就被跳过了
    // 所以执行一次深拷贝，即使在listener过程中unsubscribe了也是更改的nextListeners（nextListeners会去深拷贝currentListeners）
    // 当前执行的currentListeners不会被修改，也就是所谓的快照

    // redux在执行subscribe和unsubscribe的时候都要执行ensureCanMutateNextListeners来确定是否要进行一次深拷贝
    // 只要进行了一次dispatch，那么currentListeners === nextListeners，之后的subscribe和unsubscribe就必须深拷贝一次（因为nextListeners和currentListeners此时===）
    // 否则可以一直对nextListeners操作而不需要为currentListeners深拷贝赋值，即只在必要时深拷贝
    const listeners = (currentListeners = nextListeners)
    // 这里使用for而不是forEach，是因为listeners是我们自己创造的，不存在稀疏组的情况，所有直接用for性能来得更好
    // 见 https://github.com/reactjs/redux/commit/5b586080b43ca233f78d56cbadf706c933fefd19
    // 附上Dan的原话：This is an optimization because forEach() has more complicated logic per spec to deal with sparse arrays. Also it's better to not allocate a function when we can easily avoid that.
    // 这里没有缓存listeners.length，Dan相信V8足够智能会自动缓存，相比手工缓存性能更好
    for (let i = 0; i < listeners.length; i++) {
      // 这里将listener单独新建一个变量而不是listener[i]()
      // 是因为直接listeners[i]()会把listeners作为this泄漏，而赋值为listener()后this指向全局变量
      // https://github.com/reactjs/redux/commit/8e82c15f1288a0a5c5c886ffd87e7e73dc0103e1
      const listener = listeners[i]
      listener()
    }

    return action
  }
```

## 为什么不需要每次 slice()
~~~
简单来说就是在listener中可能有unsubscribe操作，比如有3个listener(下标0,1,2)，在第2个listener执行时unsubscribe了自己
那么第3个listener的下标就变成了1，但是for循环下一轮的下标是2，第3个listener就被跳过了
所以执行一次深拷贝，即使在listener过程中unsubscribe了也是更改的nextListeners（nextListeners会去深拷贝currentListeners）
当前执行的currentListeners不会被修改，也就是所谓的快照
~~~

- 只有 subscribe
- 只有 unsbuscribe
- 这两个时间会对 listeners 的 length 进行改变，所以只要在这两个时机更新一下 listeners 的值就行了
- 然后 dispatch 的触发时机会比较多，但 sub/unsub 的时间会很少，这样就很大程度的提升了性能
