# redux真的不复杂——源码解读
> https://blog.csdn.net/zr15829039341/article/details/82627840
> https://juejin.im/post/5b9617835188255c781c9e2f
> 阅读对象：使用过redux，对redux实现原理不是很理解的开发者

## redux本身的功能是什么
在项目中，我们往往不会纯粹的使用redux，而是会配合其他的一些工具库提升效率，比如react-redux，让react应用使用redux更容易，类似的也有wepy-redux，提供给小程序框架wepy的工具库。

## redux 本身：
redux本身有哪些作用？我们先来快速的过一下redux的核心思想（工作流程）：

- 将状态统一放在一个state中，由store来管理这个state (store tree)
- 这个store由reducer创建，reducer的作用是接受之前的状态，返回一个新的状态。
- 外部改变state的唯一方法是通过调用store的dispatch方法，触发一个action，这个action被对应的reducer处理，于是state完成更新。
- 可以通过subscribe在store上添加一个监听函数，store中dispatch方法被调用时，会执行这个监听函数。
- 可以添加中间件（中间件是干什么的我们后面讲）


## 在这个工作流程中，redux需要提供的功能是：

- 创建store，即：createStore()
- 将多个reducer合并为一个reducer，即：combineReducers()
- 创建出来的store提供subscribe，dispatch，getState这些方法。
- 应用中间件，即applyMiddleware()
- 没错，就这么多方法，我们看下redux的源码目录：

### createStore的实现

```js
// 获取state
// 简单到发指，其实这很像面向对象编程中封装只读属性的方法，只提供数据的getter方法，而不直接提供setter。

    function getState() {
        //...
    }
    
    // 添加一个监听函数，每当dispatch被调用的时候都会执行这个监听函数
    function subscribe() {
        //...
    }
    
    // 触发了一个action，因此我们调用reducer，得到的新的state，并且执行所有添加到store中的监听函数。
    function dispatch() {
        //...
    }
   
    //...
    
    //dispatch一个用于初始化的action，相当于调用一次reducer
    //然后将reducer中的子reducer的初始值也获取到
    //详见下面reducer的实现。
    
    
    return {
        dispatch,
        subscribe,
        getState,
        //下面两个是主要面向库开发者的方法，暂时先忽略
        //replaceReducer,
        //observable
    }

```

### subscribe

```js

function subscribe(listener) {
    // 添加到监听函数数组
    nextListeners.push(listener)
    
    let isSubscribe = true //设置一个标志，标志该监听器已经订阅了
    // 返回取消订阅的函数，即从数组中删除该监听函数
    return function unsubscribe() {
        if(!isSubscribe) {
            return // 如果已经取消订阅过了，直接返回
        }
        
        isSubscribe = false
        // 从下一轮的监听函数数组（用于下一次dispatch）中删除这个监听器。
        const index = nextListeners.indexOf(listener)
        nextListeners.splice(index, 1)
    }
}
```

## dispatch
```js
function dispatch(action) {
    //调用reducer，得到新state
    currentState = currentReducer(currentState, action);
    
    //更新监听数组
    currentListener = nextListener;
    //调用监听数组中的所有监听函数
    for(let i = 0; i < currentListener.length; i++) {
        const listener = currentListener[i];
        listener();
    }
}
```
