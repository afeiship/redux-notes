import React from 'react';
import PropTypes from 'prop-types';

export default function connect(){
  return function wrapWithConnect(WrappedComponent) {
    class Connect extends React.Component {

      static contextTypes = {
        store: PropTypes.object
      };

      constructor(props, context) {
        super(props, context);
        this.store = context.store;
        this.state = { storeState: null };
      }

      componentDidMount() {
        this.trySubscribe();
      }

      componentWillUnmount() {
        this.tryUnsubscribe();
      }

      trySubscribe() {
        this.unsubscribe = this.store.subscribe(() => {
          this.handleChange();
        });
        this.handleChange();
      }

      tryUnsubscribe() {
        if (this.unsubscribe) {
          this.unsubscribe();
          this.unsubscribe = null;
        }
      }

      handleChange() {
        if (!this.unsubscribe) {
          return;
        }

        this.setState({
          storeState: this.store.getState()
        });
      }
      render() {
        return (
          <WrappedComponent {...this.state.storeState} />
        );
      }
    }
    return Connect;
  }
}
