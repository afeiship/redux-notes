# connect:
> Create a wrapper content.


## core code:
```js
// 最外层的闭包：
/*
此处会创建好 Provider/connect:
export default function createAll(React) {
  const Provider = createProvider(React);
  const connect = createConnect(React);
  return { Provider, connect };
}
*/

/*
这里之所以要用 createConnect 是因为
这个 React 需要传入 React/ReactNative 或者其它 第三方的 react
*/

export default function createConnect(React) {
  /*
  PropTypes: 这个包成了一个独立的包了
  createStoreShape:

  //这里其实就是做一个 shap 结构体：
  PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired
  })
  */
  const { Component, PropTypes } = React;
  const storeShape = createStoreShape(PropTypes);

  return function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
    return function wrapWithConnect(WrappedComponent) {
      class Connect extends Component {
        /*
        传入组件有一个 displayName，这里会加一个 `Connect 连起来`
        */
        static displayName = `Connect(${getDisplayName(WrappedComponent)})`;
        static WrappedComponent = WrappedComponent;

        /*
        props/context: 都可以接受一个名为  store 的参数
        */
        static contextTypes = { store: storeShape };
        static propTypes = { store: storeShape };

        /*
        1. lifeCycle: shouldComponentUpdate
        2. shalloEqual不相等则 Update
        */
        shouldComponentUpdate(nextProps, nextState) {
          return !shallowEqual(this.state.props, nextState.props);
        }

        constructor(props, context) {
          /*
          props/context 可以作为 constructor 构造参数
          */
          super(props, context);
          /*
          hot reloader for react: version === nextVersion
          */
          this.version = version;
          /*
          从 props/context 中取得 store
          */
          this.store = props.store || context.store;

          invariant(this.store,
            `Could not find "store" in either the context or ` +
            `props of "${this.constructor.displayName}". ` +
            `Either wrap the root component in a <Provider>, ` +
            `or explicitly pass "store" as a prop to "${this.constructor.displayName}".`
          );

          this.stateProps = computeStateProps(this.store, props);
          this.dispatchProps = computeDispatchProps(this.store, props);
          this.state = {
            props: this.computeNextState()
          };
        }

        updateState(props = this.props) {
          const nextState = this.computeNextState(props);
          if (!shallowEqual(nextState, this.state.props)) {
            this.setState({
              props: nextState
            });
          }
        }

        trySubscribe() {
          if (shouldSubscribe && !this.unsubscribe) {
            this.unsubscribe = this.store.subscribe(::this.handleChange);
            this.handleChange();
          }
        }

        tryUnsubscribe() {
          if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
          }
        }


        handleChange() {
          if (this.updateStateProps()) {
            this.updateState();
          }
        }

        updateState(props = this.props) {
          const nextState = this.computeNextState(props);
          if (!shallowEqual(nextState, this.state.props)) {
            /*
            如果有变化，更新 nextState
            setState 通知变化
            */
            this.setState({
              props: nextState
            });
          }
        }


        /*
        1. lifeCycle: componentDidMount
        2. 在 didMount 阶段, subscribe store
        */
        componentDidMount() {
          this.trySubscribe();
        }

        /*
        1. lifeCycle: componentWillReceiveProps
        2. 有新的 props 过来，updateState
        */
        componentWillReceiveProps(nextProps) {
          if (!shallowEqual(nextProps, this.props)) {
            this.updateState(nextProps);
          }
        }

       /*
       unsubstribe ，否则会有问题（和事件一样的问题）
        */
        componentWillUnmount() {
          this.tryUnsubscribe();
        }

        render() {
          return ( <WrappedComponent ref='wrappedInstance' {...this.state.props} /> );
        }
      }

      if ( __DEV__ ) {
        Connect.prototype.componentWillUpdate = function componentWillUpdate() {
          if (this.version === version) {
            return;
          }

          // We are hot reloading!
          this.version = version;
          // Update the state and bindings.
          // this.trySubscribe();
          // this.updateStateProps();
          // this.updateDispatchProps();
          // this.updateState();
        };
      }

      return Connect;
    }
  }
}
```
