import React from 'react'
import connect from 'react-redux'

class SearchingGroup extends React.Component {
	constructor(props) {
		super(props)

	}

	render() {
		return(
			<div className="SearchingBar">
				<input
					type="text"
					className="searching_input"
					placeholder="Search"
				/>
				<button onClick={this.onSearchingSubmit}>Search</button>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	all_groups: state.all_groups,
	my_groups: state.my_groups,
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect (mapStateToProps, mapDispatchToProps)(SearchingGroup)
