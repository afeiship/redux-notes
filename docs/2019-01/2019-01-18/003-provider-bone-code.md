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

    /*
    当 provider 上 store 有新的更新的时候(是否出现在 hot reload 的场景)
    如果确实用户用了新的 store，这里就会用 replaceReducer 方法，重新初始化 store 里的  reducer
    这里有问题：为什么不直接替换掉 store？
    */
    componentWillReceiveProps(nextProps) {
      const { store } = this.state;
      const { store: nextStore } = nextProps;

      if (store !== nextStore) {
        const nextReducer = nextStore.getReducer();
        store.replaceReducer(nextReducer);
      }
    }

    /*
    这里的 children 的处理是历史问题
    暂时可以略过，晚点补充具体的问题所在

    关于 Children.only:
    验证 `this.props.children` 只包含一个 `React element` , 所以只有当 `this.props.children` 是个 `React element` 而不是数组/单个字符串/单个函数才能返回正确的值。
    */
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
