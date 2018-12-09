# bindActionCreators
> 下面的过程是理解： bindActionCreator 的，理解了单数，复数就不难理解了

## 这个函数的作用：
我在 next-react-redux 中有用到这个，大概用法如下：

```js
// ActionCreators:
var Actions = {
  memory: function(inData){
    return {
      type:'memory',
      data:inData
    }
  }
};

// 调用 bindActionCreators 的地方：
this._$actions = bindActionCreators(Actions, this._store.dispatch);

// 实际中，我调用 dispatch 的时候，我不需要关心底层走的是 dispatch 了
this._$actions.memory(inValue);
```


## 别人对这个方法的解释：
```js
function bindActionCreator(actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args))
}

/* babel 在线转的结果 如下：=============*/
"use strict";
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}
/* babel 在线转的结果 如下：=============*/
```

## 最新版 redux 里的写法 v4.0.0-beta里更新的：
```js
// 添加 this 之后，才能让你的 action 更加的灵活， boundActionCreator.apply(uniqueThis,argArray) 
// apply 不同的 context，得到不同的结果
// 因为你的 action 行为确实是相同的
// 不过，这种真的好吗？
function bindActionCreator(actionCreator, dispatch) {
  return function() {
    return dispatch(actionCreator.apply(this, arguments))
  }
}

// 为什么需要 this， actionCreator 不是纯函数吗？ 为什么会与 this  有关呢？
// 发现了这个 issue: https://github.com/reduxjs/redux/pull/2641

it('wraps action creators transparently', () => {
  const uniqueThis = {}
  const argArray = [1, 2, 3]
  function actionCreator() {
    return { type: 'UNKNOWN_ACTION', this: this, args: [...arguments] }
  }
  const boundActionCreator = bindActionCreators(actionCreator, store.dispatch)
    const boundAction = boundActionCreator.apply(uniqueThis,argArray)
  const action = actionCreator.apply(uniqueThis,argArray)
  expect(boundAction).toEqual(action)
  expect(boundAction.this).toBe(uniqueThis)
  expect(action.this).toBe(uniqueThis)
})

```
