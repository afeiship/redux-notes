# provider bone code:
> createProvider.js


## code:
```js
export default function createProvider(React) {
  return class Provider extends Component {
    /* === react 共享 store 的精华所在 conext */
    static childContextTypes = {
      store: storeShape.isRequired
    };

    /*
    这里的 store 就是前面定义的 storeShape 的类型
    children: 可以是 element/func 二者之一
    */

    static propTypes = {
      store: storeShape.isRequired,
      children: (requireFunctionChild ?
        PropTypes.func :
        PropTypes.element
      ).isRequired
    };

    /*
    这里定义的 key 为 store
    */
    getChildContext() {
      return { store: this.state.store };
    }

    /*
    React 构造参数为： inProps/inContext
    在 props 上取到 store 这个属性，放在 provider 的 state 上

    this.state = {
      store: props.store
    }
    */
    constructor(props, context) {
      super(props, context);
      this.state = { store: props.store };
    }

    componentWillReceiveProps(nextProps) {
      const { store } = this.state;
      const { store: nextStore } = nextProps;

      if (store !== nextStore) {
        const nextReducer = nextStore.getReducer();
        store.replaceReducer(nextReducer);
      }
    }

    render() {
      let { children } = this.props;

      if (typeof children === 'function') {
        // warnAboutFunction();
        children = children();
      } else {
        // warnAboutElement();
      }

      return Children.only(children);
    }
  };
}
```
