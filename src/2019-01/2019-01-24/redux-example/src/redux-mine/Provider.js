export default class extends React.Component{
  getChildContext() {
    return { store: this.store };
  }

  constructor(props, context) {
    super(props, context);
    this.store = props.store;
  }

  render() {
    const { children } = this.props;
    return React.Children.only(children);
  }
}
