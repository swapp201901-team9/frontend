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

	onSubmit = () => {
		//SA TODO groupname 겹치는 경우 경고
		console.log("onSubmit")
		if(this.grouptype !== undefined && this.groupname !== undefined) {
			console.log("createGroup")
			console.log(this.grouptype, " ", this.groupname)
			this.props.onCreateGroup(this.grouptype, this.groupname)
		}	
	}
	
	render() {
		return(
			<div>
			<form onSubmit={e => {
				e.preventDefault()
				this.onSubmit()
			}}
			/>
			<div className="CreateGroup">
				<label htmlFor="group type">Group Type</label>
				<select 
					name="grouptype"
					//value={this.grouptype}
					ref={ node => {this.grouptype=node; } }
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
					ref={ node => {this.groupname=node; }}
					//value={this.groupname}
					className="name-input"
				/>
				<button type="submit">CREATE GROUP</button>
			</div>
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


