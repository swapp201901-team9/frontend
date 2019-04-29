import React from 'react'
import { connect } from 'react-redux'

class CreateGroupPage extends React.Component {
	render() {
		return(
			<div className="CreateGroup">
				<form>
					<input
						type="radio"
						name="grouptype"
						placeholder={this.props.grouptype}
						value="club"
					/> 동아리
					<input
						type="radio"
						name="grouptype"
						placeholder={this.props.grouptype}
						value="department"
					/> 학과
				</form>
				<input 
					type="text"
					name="groupname"
					placeholder={this.props.groupname}
				/>
			</div>

		)
	}
}

const mapStateToProps = (state) => ({
	groupname: state.groupname,
	grouptype: state.grouptype,
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect( mapStateToProps, mapDispatchToProps )(CreateGroupPage)


