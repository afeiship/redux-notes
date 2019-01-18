# wrapActionCreators
> Wrap acton creators

## code

```js
import { bindActionCreators } from 'redux';

export default function wrapActionCreators(actionCreators) {
  return dispatch => bindActionCreators(actionCreators, dispatch);
}

// actionCreators(类似这种)，第2个参数是外部从 store 上取到的 dispatch
module.exports = {
  setMemory: function(inData) {
    return {
      type: 'memory',
      data: inData
    };
  },
  setLocal: function(inData) {
    return {
      type: 'local',
      data: inData
    };
  }
};

```
