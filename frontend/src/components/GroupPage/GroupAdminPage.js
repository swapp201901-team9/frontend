import React from 'react';
import {connect} from 'react-redux';

import NavBar from '../NavBar/NavBar';

class GroupAdminPage extends React.Component {
	render() {
		if(!this.props.loading) {
			return (
				<p>loading...</p>
			)
		}

		return (
			<div className="GroupAdminPage">
				<NavBar />
				
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
    group_users: state.group_users,
    group_designs: state.group_designs,
	loading: state.loading
})

export default connect(mapStateToProps)(GroupAdminPage);

