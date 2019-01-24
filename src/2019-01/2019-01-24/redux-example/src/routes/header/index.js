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

// properties:
function mapStateToProps(state) {
	return {
		title: state.header.title,
		show: state.side.show
	}
}

// methods:( dispatch actions )
function mapDispatchToProps(dispatch) {
	return {
		showSide: bindActionCreators(showSideAction, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
