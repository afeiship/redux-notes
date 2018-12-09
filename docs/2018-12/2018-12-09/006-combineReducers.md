# combineReducers
> 这个对于我暂时没有必要，过段时间再看吧.

- http://cn.redux.js.org/docs/api/combineReducers.html

## rootReducers:
```js
// 如果不用 combineReducers:
module.exports = function(state, action){
  return {
    moduleA: moduleAReducer( state.moduleA, action),
    moduleB: moduleAReducer( state.moduleB, action),
    moduleC: moduleAReducer( state.moduleC, action)
  }
}

// 用官方的写法如下：
module.exports = combineReducers({
  moduleA: moduleAReducer,
  moduleB: moduleBReducer,
  moduleC: moduleCReducer
});
```

## 产生的背景：

随着应用变得越来越复杂，可以考虑将 reducer 函数 拆分成多个单独的函数，拆分后的每个函数负责独立管理 state 的一部分。

combineReducers 辅助函数的作用是，把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore 方法。

## 关于此方法的运用：
- https://www.jianshu.com/p/6a041ad8abdb

本函数设计的时候有点偏主观，就是为了避免新手犯一些常见错误。也因些我们故意设定一些规则，但如果你自己手动编写根 redcuer 时并不需要遵守这些规则。
每个传入 combineReducers 的 reducer 都需满足以下规则：

- 所有未匹配到的 action，必须把它接收到的第一个参数也就是那个 state 原封不动返回。
- 永远不能返回 undefined。当过早 return 时非常容易犯这个错误，为了避免错误扩散，遇到这种情况时 combineReducers 会抛异常。
- 如果传入的 state 就是 undefined，一定要返回对应 reducer 的初始 state。根据上一条规则，初始 state 禁止使用 undefined。使用 ES6 的默认参数值语法来设- 置初始 state 很容易，但你也可以手动检查第一个参数是否为 undefined。
- 虽然 combineReducers 自动帮你检查 reducer 是否符合以上规则，但你也应该牢记，并尽量遵守。


```js
export default function todo(state = [], action){
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text]);
    default:
      return state;
  }
}
```

