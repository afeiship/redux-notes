# Provider v4.0.0
> Simply provider.

```js

export default class Provider extends Component {
  getChildContext() {
    return { store: this.store };
  }

  constructor(props, context) {
    super(props, context);
    this.store = props.store;
  }

  /*
  这里可以直接忽略了
  */
  componentWillReceiveProps(nextProps) {
    // 这里的代码意思是：不再支持 HMR 的时候传入新的 store,暂时没有深入研究其原因
  }

  render() {
    let { children } = this.props;
    return Children.only(children);
  }
}

Provider.propTypes = {
  store: storeShape.isRequired,
  children: PropTypes.element.isRequired
};
Provider.childContextTypes = {
  store: storeShape.isRequired
};

```
