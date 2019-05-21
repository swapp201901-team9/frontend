import React from 'react'
import { connect } from 'react-redux'

import GroupList from './GroupList'
import { toSearchGroup, toJoinGroup, gotoGroupDetail } from '../../actions/index.js';

class SearchingGroup extends React.Component {
	onSubmit = () => {
		console.log("search onSubmit", this.searchword.value)
		if(this.searchword.value !== undefined) {
			this.newList = this.props.all_groups.filter(group => {
				return group.group_name.includes(this.searchword.value)
			});
		}
		console.log("after: ", this.newList)
		this.props.onSearchGroup(this.newList)
	}

	render() {
		return(
			<div>
				<form onSubmit={e => {
					e.preventDefault()
					this.onSubmit()
				}}>
					<div className="SearchingBar">
						<input
							type="text"
							name="searchword"
							className="searching_input"
							ref={ node => {this.searchword=node;} }
							placeholder="Search"
						/>
						<button type="submit">SEARCH</button>
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
	onSearchGroup: (newList) => dispatch(toSearchGroup(newList)),
	onJoinGroup: (groupid) => dispatch(toJoinGroup(groupid)),
    onToGroupDetail: (groupid) => dispatch(gotoGroupDetail(groupid)),
})

export default connect (mapStateToProps, mapDispatchToProps)(SearchingGroup)
