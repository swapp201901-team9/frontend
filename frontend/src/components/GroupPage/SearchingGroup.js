import React from 'react'
import { connect } from 'react-redux'

import AllGroupList from './AllGroupList';
import { toSearchGroup } from '../../actions/index.js';

class SearchingGroup extends React.Component {
	onSubmit = () => {
		console.log("search onSubmit")
		if(this.searchword !== undefined) {
			console.log("searchword !== undefined")
			this.newList = this.props.all_groups.filter(group => {
				return group.groupname.includes(this.searchword)
			});
		}
		this.props.onSearchGroup(this.newList)
		console.log("after onSearchGroup")
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
				<AllGroupList 
					grouplist={this.props.filtered_groups}
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
	onSearchGroup: (newList) => toSearchGroup(newList)
})

export default connect (mapStateToProps, mapDispatchToProps)(SearchingGroup)
