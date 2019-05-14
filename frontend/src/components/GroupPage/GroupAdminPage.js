import React from 'react';
import {connect} from 'react-redux';

import NavBar from '../NavBar/NavBar';
import ChangeGroupInfo from './ChangeGroupInfo';
import GroupUserList from './GroupUserList';
import GroupDesignList from './GroupDesignList';
import { toDeleteGroupUser, toDeleteGroupDesign } from '../../actions';

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
				<ChangeGroupInfo />
				{/* <GroupUserList 
					userlist={this.props.group_users}
					onClickDeleteUser={this.props.onDeleteUser}
				/> */}
				<GroupDesignList 
					designlist={this.props.group_designs}
					onClickDeleteDesign={this.props.onDeleteDesign}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	now_group: state.now_group,
    group_users: state.group_users,
    group_designs: state.group_designs,
	loading: state.loading
})

const mapDispatchToProps = (dispatch) => ({
	onDeleteUser: (userid) => dispatch(toDeleteGroupUser(userid)),
	onDeleteDesign: (designid) => dispatch(toDeleteGroupDesign(designid))
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupAdminPage);

