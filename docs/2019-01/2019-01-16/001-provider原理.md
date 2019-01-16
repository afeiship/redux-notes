# provider 原理
- http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html

## <Provider> 组件
`connect` 方法生成容器组件以后，需要让容器组件拿到 `state` 对象，才能生成 UI 组件的参数。
一种解决方法是将 `state` 对象作为参数，传入容器组件。
但是，这样做比较麻烦，尤其是容器组件可能在很深的层级，一级级将 `state` 传下去就很麻烦。
`React-Redux` 提供 `Provider` 组件，可以让容器组件拿到state。

```js
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

let store = createStore(todoApp);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

## 它的原理是React组件的context属性，请看源码。
```js
class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store
    };
  }
  render() {
    return this.props.children;
  }
}

Provider.childContextTypes = {
  store: React.PropTypes.object
}
```

## 上面代码中，store放在了上下文对象context上面。然后，子组件就可以从context拿到store，代码大致如下。
```js
class VisibleTodoList extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  render() {
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();
    // ...
  }
}

VisibleTodoList.contextTypes = {
  store: React.PropTypes.object
}
```
