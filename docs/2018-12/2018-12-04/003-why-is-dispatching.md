# why isDispatching:
~~~
https://github.com/reduxjs/redux/pull/1569

Maybe change it to something a little more helpful? I’m up for more descriptive error messages. e.g. You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument, so pass it down from the top reducer instead of reading it from the store.
~~~
