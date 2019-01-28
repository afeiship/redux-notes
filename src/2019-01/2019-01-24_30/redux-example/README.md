#### 用create-react-app创建一个项目
1. 执行 ```npm i create-react-app -g```
2. 执行 ```create-react-app redux-example```
3. 执行 ```cd redux-example```
4. 执行 ```npm start```
浏览器出现以下界面,说明项目创建好了并成功运行
![](https://upload-images.jianshu.io/upload_images/7177443-fd5f9d3d387e597a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/600)

#### 创建相关组件
1. 在根目录下创建routes文件夹
2. 在routes下创建header和side文件夹
3. 在header和side下创建header的容器组件和ui组件,代码见https://gitee.com/huruqing/redux-example

#### redux相关配置
1. 安装redux和react-redux
```npm i redux react-redux --save-dev```
2. 创建side的reducer
```js
// 创建action creator

export function showSideAction(payload) {
    return {
        type: 'SHOW-SIDE',
        payload,
    }
}

// 设置state初始值
const initState = {
    show: false
}

// reducer
export default (state=initState,action)=> {
    switch (action.type) {
        case 'SHOW-SIDE':
        return {
            ...state,
            show: action.payload
        }
       default:
          return state;
     }
}
```
## header的reducer
```js
// 创建action creator

export function setTitleAtion(payload) {
    return {
        type: 'SET-TITLE',
        payload,
    }
}

// 设置state初始值
const initState = {
    title: '卖座网'
}

// reducer 纯函数
export default (state=initState,action)=> {
    switch (action.type) {
        case 'SET-TITLE':
        return {
            ...state,
            title: action.payload
        }
       default:
        return state;
    }
}
```
#### 在目录的index.js配置prover和store
```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Privider } from 'react-redux';
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
```

#### 把side下面的index.js改造成容器组件
```js
/**
 * Side容器组件
 */
import React from 'react';
import View from './View'
import { connect } from 'react-redux';
import { showSideAction } from './reducer';
import { bindActionCreators } from 'redux';

class Side extends React.Component {

    render() {
        return <View {...this.props}/>
    }
}

function mapStateToProps(state) {
	return {
		show: state.side.show
	}
}
function mapDispatchToProps(dispatch) {
	return {
		showSide: bindActionCreators(showSideAction,dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Side);
```

修改side下的View.js,它的显示和隐藏使用state里的show来控制
```js
/**
 * Side UI组件
 */
import React from 'react';
import './View.css'


class View extends React.Component {

    render() {
    	let { show,showSide } = this.props;
    	if (show) {
    		return (
    			 <div onClick={()=>{showSide(false)}}>
                    <ul className="list">
                        <li className="item">首页</li>
                        <li className="item">影片</li>
                        <li className="item">影院</li>
                        <li className="item">E座卡</li>
                    </ul>
                </div>
    		)
    	} else {
    		return '';
    	}
        
    }
}


export default View;
```
#### 修改header容器组件和UI组件
```js
/**
 * header容器组件
 */
import React from 'react';
import View from './View';
import { connect } from 'react-redux';
import { showSideAction } from '../side/reducer';
import { bindActionCreators } from 'redux';

class Header extends React.Component {
	
	render(){
		return <View {...this.props}/>
	}
}

function mapStateToProps(state) {
	return {
		title: state.header.title,
		show: state.side.show
	}
}

function mapDispatchToProps(dispatch) {
	return {
		showSide: bindActionCreators(showSideAction, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);

```

```js
/**
 * headerUi组件
 */
import React from 'react';

class View extends React.Component {

	render() {
		let { title,showSide,show } = this.props;
		return (<div
			style={{ height: '50px', display: 'flex', alignItems: 'center', background: 'green' }}>
			<button onClick={()=>{showSide(!show)}}>{show?'隐藏':'显示'}菜单</button>
			<span style={{color:'#fff',marginLeft:'15px'}}>{title}</span>
		</div>);
	}
}

export default View;

```

此demo地址: [https://gitee.com/huruqing/redux-example](https://gitee.com/huruqing/redux-example)







