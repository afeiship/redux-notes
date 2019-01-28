/**
 * headerUi组件
 */
import React from 'react';

class View extends React.Component {
  _onClick = ()=>{
    window.store.dispatch({ type: 'SET-TITLE', payload: Math.random() +'title' })
    // console.log('click in header ui', this.props, this.context);
  };

	render() {
		const { title,show } = this.props;
		return (<div
			style={{ height: '50px', display: 'flex', alignItems: 'center', background: 'green' }}>
			<button onClick={this._onClick}>{show?'隐藏':'显示'}菜单</button>
			<span style={{color:'#fff',marginLeft:'15px'}}>{title}</span>
      <h3> { this.props.header ? this.props.header.title : 'TITLE'}</h3>
		</div>);
	}
}

export default View;
