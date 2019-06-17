import React from 'react'
import { connect } from 'react-redux'

import { toCreateGroup } from '../../actions/index.js'

class CreateGroup extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const type_options= [
			'Club',
			'Department',
			'Else'
			]

		let onSubmit = (e) => {
			console.log("create onSubmit")
			e.preventDefault()
			if(this.grouptype !== undefined && this.groupname !== undefined) {
				this.props.onCreateGroup(this.grouptype, this.groupname)
			}
		}

		return(
			<div>
				<form onSubmit={onSubmit}>
					<div className="CreateGroup">
						<label htmlFor="group type">Group Type </label>
						<select
							name="grouptype"
							ref={ node => {this.grouptype=node;} }
							className="type-select"
							defaultValue="Club"
						>
							{type_options.map(option => {
								return <option value={option} key={option} >{option}</option>
							})}
						</select>
						<br />
						<br />
						<label htmlFor="group name">Group Name</label>
						<input
							type="text"
							name="groupname"
							ref={ node => {this.groupname=node;} }
							//value={this.groupname}
							className="name-input"
						/>
						<br/>
						<div className="Group-Button-Field">
						<button type="submit">CREATE GROUP</button>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	all_groups: state.all_groups,
})


const mapDispatchToProps = (dispatch) => ({
	onCreateGroup: (grouptype, groupname) => dispatch(toCreateGroup(grouptype, groupname))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup)
