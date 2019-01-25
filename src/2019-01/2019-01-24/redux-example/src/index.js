import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import { Provider } from 'react-redux';
import Provider from './redux-mine/Provider'
import {createStore} from 'redux';
import { combineReducers } from 'redux';
import headerReducer from './routes/header/reducer';
import sideReducer from './routes/side/reducer';

const reducers = combineReducers({
    header: headerReducer,
    side: sideReducer
})
// 创建store
const store = createStore(reducers);


ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>,
 document.getElementById('root'));

serviceWorker.unregister();
