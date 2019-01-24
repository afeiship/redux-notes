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
