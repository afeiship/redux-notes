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