import React from 'react'
import { connect } from 'react-redux'

import GroupList from './GroupList'
import { toSearchGroup, toJoinGroup, gotoGroupDetail } from '../../actions/index.js';

class SearchingGroup extends React.Component {
	onSubmit = () => {
		console.log("search onSubmit")
		if(this.searchword !== undefined) {
			this.newList = this.props.all_groups.filter(group => {
				return group.groupname.includes(this.searchword)
			});
		}
		console.log("after: ", this.newList)
		this.props.onSearchGroup(this.newList)
	}

	render() {
		return(
			<div>
				<h1>Search Group</h1>
				<form onSubmit={e => {
					e.preventDefault()
					this.onSubmit()
				}}>
					<div className="SearchingBar">
						<input
							type="text"
							name="searchword"
							ref={ node => {this.searchword=node;} }
							className="searching_input"
							placeholder="Search"
						/>
						<button type="submit">Search</button>
					</div>
				</form>
				<GroupList 
					grouplist={this.props.filtered_groups}
					onClickGroup={this.props.onToGroupDetail}
					onClickJoinGroup={this.props.onJoinGroup}
				/>
			</div>
			
		)
	}
}

const mapStateToProps = (state) => ({
	all_groups: state.all_groups,
	filtered_groups: state.filtered_groups
})

const mapDispatchToProps = (dispatch) => ({
	onSearchGroup: (newList) => toSearchGroup(newList),
	onJoinGroup: (groupid) => toJoinGroup(groupid),
    onToGroupDetail: (groupid) => gotoGroupDetail(groupid),
})

export default connect (mapStateToProps, mapDispatchToProps)(SearchingGroup)
