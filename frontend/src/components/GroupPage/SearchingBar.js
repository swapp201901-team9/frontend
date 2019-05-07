import React from 'react'
import connect from 'react-redux'

class SearchingBar extends React.Component {

	render() {
		return (
			<div className="SearchingBar" />
				<input
					type="text"
					className="searching_input"
					placeholder="Search"
				/>
				<button onClick={this.onSearchingSubmit}/>Search</button>
			</div>
		)
	}
}
