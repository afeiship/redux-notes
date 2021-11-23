import compose from './compose'
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    // 这里感觉第三个参数 `enhancer` 好像没有用到
    const store = createStore(reducer, preloadedState, enhancer)
    let dispatch = store.dispatch
    let chain = []

    const middlewareAPI = {
      getState: store.getState,
      // 这里的 dispatch 是改造过的最新 dispatch
      dispatch: (action) => dispatch(action)
    }

    // 改造 dispatch 的核心代码，原理是得用 compose 实现
    chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}
