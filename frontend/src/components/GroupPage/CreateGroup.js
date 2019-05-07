import React from 'react'
import { connect } from 'react-redux'

import { toCreateGroup } from '../../actions/index.js'

class CreateGroup extends React.Component {
	type_options = [
		'Select an Option',
		'Club',
		'Department',
		'Else'
		]

	onSubmit = () => {
		//SA TODO groupname 겹치는 경우 경고
		console.log("create onSubmit")
		if(this.grouptype !== undefined && this.grouptype.value !== 'Select an Option' && this.groupname !== undefined) {
			this.props.onCreateGroup(this.grouptype, this.groupname)
		}	
	}
	
	render() {
		return(
			<div>
				<h1>Create Group</h1>
				<form onSubmit={e => { 
					e.preventDefault() 
					this.onSubmit() 
				}}>
					<div className="CreateGroup">
						<label htmlFor="group type">Group Type</label>
						<select 
							name="grouptype"
							ref={ node => {this.grouptype=node;} }
							className="type-select"
						> 
							{this.type_options.map(option => {
								return <option value={option} key={option} >{option}</option>
							})}
						</select>
						<br />
						<label htmlFor="group name">Group Name</label>
						<input 
							type="text"
							name="groupname"
							ref={ node => {this.groupname=node;} }
							//value={this.groupname}
							className="name-input"
						/>
						<button type="submit">CREATE GROUP</button>
					</div>
				</form>>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	all_groups: state.all_group,
})


const mapDispatchToProps = (dispatch) => ({
	onCreateGroup: (grouptype, groupname) => dispatch(toCreateGroup(grouptype, groupname))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup)


