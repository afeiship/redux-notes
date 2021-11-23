import compose from './compose';

/**
 * 这种改造方式失去了 enhancer 的 compose 增强机制
 * @param middlewares
 * @returns {function(*): *&{dispatch: *}}
 */
export default function applyMiddleware(...middlewares) {
  return (store) => {
    let dispatch = store.dispatch;
    let chain = [];

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action),
    };

    chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    return {
      ...store,
      dispatch,
    };
  };
}
