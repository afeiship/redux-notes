# an empty middleware:
> 一个什么都不做的中间件代码如下
- https://www.jb51.net/article/144558.htm
- https://www.cnblogs.com/JhoneLee/p/5771541.html

## 包含的功能有：

- 调用dispatch派发出一个新的action对象
- 调用getState获得当前Redux Store上的状态
- 调用next告诉Redux当前中间件工作完毕，让Redux调用下一个中间件
- 访问action对象action上的所有数据

```js
// 传入参数可以写成： store
function doNothingMiddleware({dispatch, getState}) {
  return function(next){

    /*中间件处理的逻辑 start*/
    /*
    next是封装后的dispatch，如果使用了不止一个中间件，这个next就是被前面的中间件修改过的dispatch函数。事实上，你可以把它单纯的理解为，通过前面的中间件增强了的dispatch，至于增强了什么功能，就要取决于它经历了那些中间件了。

    如果这个是第一层中间件，这个 next 就是原始 store 上的 store.dispatch
    */
    return function(action){
      return next(action);
    }
    /*中间件处理的逻辑 end*/

  }
}
// 除去中间件处理逻辑，其它部分都是模板代码
```


## 中间件的特点
- 中间件是独立的函数
- 中间件可以组合使用
- 中间件有一个统一的接口
- 中间件接口

每个中间件必须定义为一个函数，返回一个接受 `next` 参数的函数，而这个接受 `next` 参数的函数又返回一个接受 `action` 参数的函数。
`next` 参数本身也是一个函数，中间件调用这个 `next` 函数通知 `Redux` 自己的处理工作已经结束。

## redux 中间件的组成：

在一个Redux应用如果想要使用中间件，必须通过applyMiddleware来生成。
Redux的源码文件非常简单，由五个文件一起组成，分别是createStore.js，applyMiddlware.js，compose.js，bindActionCreator.js，combineReducers.js。
与createStore是用来创建一个状态树，并且暴露出几个方法，包括dispatch，subscribe，getState，replaceReducer和$$observable，给createStore传入的参数有reducer，preloadedState和enhancer，
其中enhancer就是一个store增强器，是一个函数，只能用applyMiddleware生成。
applyMiddleware函数是根据外部函数（中间件函数）包装原来的dispatch函数，然后将新的dispatch函数暴露出去。

## 中间件(middleware)与增强器(enhancer)的区别
> 中间件和增强器都是对Redux Store的增强，但是中间件仅仅是对Redux Store的dispatch方法进行了增强，也就是从dispatch函数调用到action对象被reducer处理这个过程中的操作，增强器是对Redux Store进行更深层次的增强定制，需要使用Store Enhancer，通过阅读增强器接口，一个增强器其实利用随给的参数创造出一个store对象，然后定制对象，最后把Store对象返回。总的对比如下：

中间件： 可以用来增强redux store的dispatch函数，也就是从dispatch函数调用到action对象被reducer处理这个过程中的操作
增强器： 对redux store进行更深层次的增强定制，可以增强redux store的各个方面。

## 异步访问服务器

### 异步action对象

在没有引入中间件时，社会治理子系统在开发时，`所有的action都是同步的，一个同步的action对象是一个包含type字段的简单对象`，但是我们需要实现一个异步action对象，是一个函数，在action触发之后，在reducer接收到执行命令之前可以进行一个异步操作。

### redux-thunk:
我们引入redux-thunk来实现异步访问服务器方法，一个访问服务器的action，至少要涉及三个action类型：

表示异步操作已经开始的action类型；
表示异步操作成功的action类型；
表示异步操作失败的action类型；

### 源代码解析
```js
function create ThunkMiddleware(extraArgument){
  return ({dispatch, getState}) => next => action => {
    if(typeof action === ‘function'){
     return action(dispatch, getState, extraArgument);
   }
   return next(action)
  }
}
const thunk = createThunkMiddleware();
export default thunk;

// FEI:可以简化为：
export default function ({ dispatch, getState }) => next => action =>{
  if(typeof action === ‘function'){
    return action(dispatch, getState);
  };
  return next(action);
};

```

### Redux-thunk的使用
```js
import {createStore, combineReducers, applyMiddleware} from ‘redux';
import {otherState, dataState} from ‘reducers';
import thunkMiddleware from ‘redux-thunk';
var reducers = combineReducers({
  otherState,
  dataState
});
var store = createStore(reducers, applyMiddleware(thunkMiddleware));
export default store;
```

### 实际的使用场景：
```js
function saveInfo(params){
  let url = “/api/device”;
  return function(dispatch, getState){
    dispatch(saveInfoRequest());
    return Http.get(url, {
      params: params
    }).then(res=>{
      if(res && res.type === 0){
        dispatch(saveInfoSuccess ());
        let dataState = getState().dataState;
        let newParams = {
          start: dataState.start,
          limit: dataState.limit,
          searchName: dataState.searchName
        };
        dispatch(getInfo(newParams))
      }
    }).catch(error=>{
       dispatch(saveInfoFailure (error));
    });
  }
}
```


## 也可以自己写一个日志输出中间件
```js
var logger = store => next => action => {
  console.log('[action]', action)
  console.log(`[action] type:${action.type} payload:${JSON.stringify(action.payload)}`)
  next(action)
  console.log('[store]', store.getState())
  console.log(`[store] ${JSON.stringify(store.getState())}`)
}
```
