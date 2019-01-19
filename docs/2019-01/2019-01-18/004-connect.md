# connect:
> Create a wrapper content.


## core code:
```js
export default function createConnect(React) {
  const { Component, PropTypes } = React;
  const storeShape = createStoreShape(PropTypes);

  return function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
    return function wrapWithConnect(WrappedComponent) {
      class Connect extends Component {
        static displayName = `Connect(${getDisplayName(WrappedComponent)})`;
        static WrappedComponent = WrappedComponent;

        static contextTypes = {
          store: storeShape
        };

        static propTypes = {
          store: storeShape
        };

        shouldComponentUpdate(nextProps, nextState) {
          return !shallowEqual(this.state.props, nextState.props);
        }

        constructor(props, context) {
          super(props, context);
          this.version = version;
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

        componentDidMount() {
          this.trySubscribe();
        }

        componentWillReceiveProps(nextProps) {
          if (!shallowEqual(nextProps, this.props)) {
            this.updateState(nextProps);
          }
        }

        componentWillUnmount() {
          this.tryUnsubscribe();
        }

        render() {
          return (
            <WrappedComponent ref='wrappedInstance'
                              {...this.state.props} />
          );
        }
      }

      return Connect;
    }
  }
}
```
