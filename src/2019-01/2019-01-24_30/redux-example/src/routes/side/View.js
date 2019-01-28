/**
 * Side UI组件
 */
import React from 'react';
import './View.css'


class View extends React.Component {

  _onClick = () =>{
    console.log('click', this.props);
  };

    render() {
      let { show } = this.props;
      if (this.props.side && this.props.side.show) {
    		return (
    			 <div onClick={this._onClick}>
                <h3>{ this.props.header.title }</h3>
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
