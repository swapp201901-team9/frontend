import React from 'react'
import { connect } from 'react-redux'

import { createGroup } from '../../actions/index.js'

class CreateGroup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			grouptype: 'Select an Option',
			groupname: ''
		}
	}

	type_options = [
		'Select an Option',
		'Club',
		'Department',
		'Else'
		]

	onChange = (e) => {
		this.setState({
			grouptype: e.target.grouptype,
			groupname: e.target.groupname
		})
	}
	
	onSubmit = () => {
		//SA TODO 기존에 있는 이름과 같은 이름일 경우 경고
		this.props.onCreateGroup(this.state.grouptype, this.state.groupname)
	}
	
	render() {
		return(
			<div className="CreateGroup">
				<label htmlFor="group type">Group Type</label>
				<select 
					value={this.state.grouptype}
					onChange={this.onChange.bind(this)}
					className="type-select"
				> 
					{this.type_options.map(option => {
						return <option value={option} key={option} >{option}</option>
					})}
				</select>
				<label htmlFor="group name">Group Name</label>
				<input 
					type="text"
					value={this.state.groupname}
					onChange={this.onChange.bind(this)}
					className="name-input"
				/>
				<button onClick={this.onSubmit.bind(this)}>CREATE GROUP</button>
			</div>

		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	onCreateGroup: (grouptype, groupname) => dispatch(createGroup(grouptype, groupname))
})

export default connect(null, mapDispatchToProps)(CreateGroup)


