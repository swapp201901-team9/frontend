import React from 'react';
import {connect} from 'react-redux';

import NavBar from '../NavBar/NavBar';
import ChangeGroupInfo from './ChangeGroupInfo';
import GroupUserList from './GroupUserList';
import GroupDesignList from './GroupDesignList';
import { toDeleteGroupUser, toDeleteGroupDesign, toChangeGroupInfo } from '../../actions';

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
				<br/>
				<h2>ChageGroupInfo</h2>
				<ChangeGroupInfo 
					group={this.props.now_group[0]}
					onClickChangeSubmit={this.props.onChangeGroupInfo}
				/>
				<br/>
				<h2>GroupUserList</h2>
				<GroupUserList 
					groupid={this.props.now_group[0].id}
					userlist={this.props.group_users}
					onClickDeleteUser={this.props.onDeleteUser}
				/>
				<br/>
				<h2>GroupDesignList</h2>
				<GroupDesignList 
					groupid={this.props.now_group[0].id}
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
	onChangeGroupInfo: (groupid, grouptype, groupname) => dispatch(toChangeGroupInfo(groupid, grouptype, groupname)),
	onDeleteUser: (groupid, userid) => dispatch(toDeleteGroupUser(groupid, userid)),
	onDeleteDesign: (groupid, designid) => dispatch(toDeleteGroupDesign(groupid, designid))
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupAdminPage);

