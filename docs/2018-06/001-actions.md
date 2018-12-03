# Actions:
> Actions are payloads of information that send data from your application to your store. They are the only source of information for the store. You send them to the store using store.dispatch().
+ https://redux.js.org/basics/actions


## action Types:
```js
const ADD_TODO = 'ADD_TODO'
```

## actions:
Actions are `plain JavaScript objects`. Actions must have a type property that indicates the type of action being performed. Types should typically be defined as string constants. Once your app is large enough, you may want to move them into a separate module.
```js
// add:
{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
//toggle:
{
  type: TOGGLE_TODO,
  index: 5
}
```


## action creators:
Action creators are exactly `that—functions that create actions`. It's easy to conflate the terms “action” and “action creator”, so do your best to use the proper term.
```js
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
```

## Flux actions VS redux actions:
```js
// ===================  Flux ===================
// Flux: action creators often trigger a dispatch when invoked
function addTodoWithDispatch(text) {
  const action = {
    type: ADD_TODO,
    text
  }
  dispatch(action)
}

// ===================  Redux ===================
// In Redux this is not the case.
// Instead, to actually initiate a dispatch, pass the result to the 

dispatch(addTodo(text))
dispatch(completeTodo(index))

// you can create a bound action creator that automatically dispatches:
const boundAddTodo = text => dispatch(addTodo(text))
const boundCompleteTodo = index => dispatch(completeTodo(index))
// Now you'll be able to call them directly:
boundAddTodo(text)
boundCompleteTodo(index)
```


## full codes:(actions.js)
```js
/*
 * action types
 */
​
export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
​
/*
 * other constants
 */
​
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}
​
/*
 * action creators
 */
​
export function addTodo(text) {
  return { type: ADD_TODO, text }
}
​
export function toggleTodo(index) {
  return { type: TOGGLE_TODO, index }
}
​
export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}
```

