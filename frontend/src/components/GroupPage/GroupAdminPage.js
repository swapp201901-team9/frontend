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

				<section className="wrap clear col3">
					<div className="aside">
						<h2 className="h_white">GROUP INFO</h2>
							<div className="content">
							<ChangeGroupInfo
								group={this.props.now_group[0]}
								onClickChangeSubmit={this.props.onChangeGroupInfo}
							/>
							</div>
					</div>
					<div className="main">
						<h2 className="h_white">DESIGNS</h2>
							<div className="content">
							<GroupDesignList
								groupid={this.props.now_group[0].id}
								designlist={this.props.group_designs}
								onClickDeleteDesign={this.props.onDeleteDesign}
							/>

							</div>
					</div>
					<div className="aside">
						<h2 className="h_black">MEMBER LIST</h2>
							<div className="content">
							<GroupUserList
								groupid={this.props.now_group[0].id}
								userlist={this.props.group_users}
								onClickDeleteUser={this.props.onDeleteUser}
							/>
							</div>
					</div>
				</section>
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
