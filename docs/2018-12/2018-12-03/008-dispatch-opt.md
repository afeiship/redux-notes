# dispatch opmtize;
+ https://github.com/reduxjs/redux/commit/5b586080b43ca233f78d56cbadf706c933fefd19
+ http://jsfiddle.net/ssSt5/2/

## optmize:
Use a for loop instead of forEach() in dispatch()
We don't care about holey array semantics because we manage the array ourselves


This is an optimization because forEach() has `more complicated logic ` per spec to deal with sparse arrays. Also it's better to not allocate a function when we can easily avoid that.
No, we can't just limit ourselves to the last index because subscriptions can also be removed. However we do have an optimization to avoid `cloning the array on every dispatch`: see the next few commits.

```js
// OLD:
function dispatch(action) {
    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }
    listeners.slice().forEach(listener => listener())
    return action
  }
// NEW:
function dispatch(action) {
    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }

    var currentListeners = listeners.slice()
    for (var i = 0; i < currentListeners.length; i++) {
      currentListeners[i]()
    }
    return action
  }
```
