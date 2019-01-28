import React from 'react';
import PropTypes from 'prop-types';

export default class extends React.Component{
  static childContextTypes ={
    store: PropTypes.object
  };
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
