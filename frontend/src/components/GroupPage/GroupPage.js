import React from 'react';
import { connect } from 'react-redux';

import CreateGroup from './CreateGroup'

class GroupPage extends React.Component {

	
	render() {
		return (
			<div>
				<CreateGroup />
				<SearchingGroup />
			</div>
		)
	}
}

const mapStateToProps = (state) => {

}

const mapDispatchToProps = (dispatch) => {

}

export default GroupPage = connect(mapStateToProps, mapDispatchToProps)(GroupPage);

