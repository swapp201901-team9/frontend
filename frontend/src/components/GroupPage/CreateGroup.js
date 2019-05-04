import React from 'react'
import { connect } from 'react-redux'

import { createGroup } from '../../actions/index.js'

class CreateGroup extends React.Component {
	type_options = [
		'Select an Option',
		'Club',
		'Department',
		'Else'
		]
	
	render() {
		const onSubmit = () => {
			//SA TODO groupname 겹치는 경우 경고
			if(this.grouptype !== undefined && this.groupname !== undefined) {
				console.log("createGroup")
				console.log(this.grouptype, " ", this.groupname)
				this.props.onCreateGroup(this.grouptype, this.groupname)
			}
		}

		return(
			<div className="CreateGroup">
				<label htmlFor="group type">Group Type</label>
				<select 
					value={this.grouptype}
					className="type-select"
				> 
					{this.type_options.map(option => {
						return <option value={option} key={option} >{option}</option>
					})}
				</select>
				<label htmlFor="group name">Group Name</label>
				<input 
					type="text"
					value={this.groupname}
					className="name-input"
				/>
				<button onClick={onSubmit()}>CREATE GROUP</button>
			</div>

		)
	}
}

const mapStateToProps = (state) => ({
	all_groups: state.all_group,
})


const mapDispatchToProps = (dispatch) => ({
	onCreateGroup: (grouptype, groupname) => dispatch(createGroup(grouptype, groupname))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup)


