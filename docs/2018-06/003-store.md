# store:
In the previous sections, we defined the actions that represent the facts about “what happened” and the reducers that update the state according to those actions.

The Store is the object that brings them together. The store has the following responsibilities:

Holds application state;

Allows access to state via `getState()`;

Allows state to be updated via `dispatch(action)`;

Registers listeners via `subscribe(listener)`;

Handles unregistering of listeners via the function returned by subscribe(listener).

+ https://redux.js.org/basics/store


## basic:
```js
import { createStore } from 'redux'
import todoApp from './reducers'
const store = createStore(todoApp);
```

## codes:
```js
import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} from './actions'
​
// Log the initial state
console.log(store.getState())
​
// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)
​
// Dispatch some actions
store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))
store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))
​
// Stop listening to state updates
unsubscribe()
```
