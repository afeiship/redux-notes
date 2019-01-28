/**
 * headerUi组件
 */
import React from 'react';

class View extends React.Component {

  _onClick = ()=>{
    console.log('click in header ui', this.props);
  };
	render() {
		let { title,show } = this.props;
		return (<div
			style={{ height: '50px', display: 'flex', alignItems: 'center', background: 'green' }}>
			<button onClick={this._onClick}>{show?'隐藏':'显示'}菜单</button>
			<span style={{color:'#fff',marginLeft:'15px'}}>{title}</span>
		</div>);
	}
}

export default View;
