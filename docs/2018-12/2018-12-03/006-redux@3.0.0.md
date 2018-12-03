# redux 3.0.0


## 源码太简洁了(才50多行代码)：
```js
import isPlainObject from './utils/isPlainObject';
export var ActionTypes = {
    INIT: '@@redux/INIT'
};
export default function createStore(reducer, initialState) {
  /*
  1. reducer 为必须的参数
  2. reducer 必须为 function
  */
    if (typeof reducer !== 'function') {
        throw new Error('Expected the reducer to be a function.');
    }
    var currentReducer = reducer;
    var currentState = initialState;
    var listeners = [];
    var isDispatching = false;

    function getState() {
        return currentState
    }

    /*
    1. 添加 listener
    2. 返回 unsubscribe 可随时取消监听
    */
    function subscribe(listener) {
        listeners.push(listener);
        return function unsubscribe() {
            var index = listeners.indexOf(listener);
            listeners.splice(index, 1)
        }
    }

    function subscribeCore(){
      listeners.push(listener);
      return {
        destory:function() {
          var index = listeners.indexOf(listener);
          listeners.splice(index, 1)
        }
      };
    }

    function dispatch(action) {
      // 这里要求 action 必须为纯 object，而不能是什么 fuction 之类的
        if (!isPlainObject(action)) {
            throw new Error('Actions must be plain objects. Use custom middleware for async actions.');
        }
        if (typeof action.type === 'undefined') {
            throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');
        }
        if (isDispatching) {
            throw new Error('Reducers may not dispatch actions.');
        }
        try {
          /*
            1. 根据传入的 action 来 执行对应的 currentReducer 更新 state
            2. reducer 是一个 fucntion 里面会根据 action.type 来执行更新 state 的逻辑，返回一个新的 state
          */
            isDispatching = true;
            currentState = currentReducer(currentState, action)
        } finally {
            isDispatching = false
        }
        // emit/fire: 通知所有的 listeners 
        listeners.slice().forEach(listener => listener());
        return action
    }

    function dispatchCore(action){
      // 其实就这两句核心代码：
      currentState = currentReducer(currentState, action);
      listeners.slice().forEach(listener => listener());
    }

  /*
  1. replace reducer
  2. 执行新的 dispitch init
  */
    function replaceReducer(nextReducer) {
        currentReducer = nextReducer;
        dispatch({
            type: ActionTypes.INIT
        })
    }

    /*
    1. 默认执行一次 INIT 的逻辑
    */
    dispatch({
        type: ActionTypes.INIT
    });
    
    return {
        dispatch, subscribe, getState, replaceReducer
    }
}
```


## bindActionCreator:
```js
function bindActionCreator(actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args));
}
```
