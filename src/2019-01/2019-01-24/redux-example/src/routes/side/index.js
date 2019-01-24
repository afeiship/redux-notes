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