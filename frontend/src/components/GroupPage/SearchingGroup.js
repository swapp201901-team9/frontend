import React from 'react'
import connect from 'react-redux'

class SearchingGroup extends React.Component {
<<<<<<< HEAD
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
=======
	constructor(props) {
		super(props)

>>>>>>> 6d725871358dd7d6de8904157b9d3ce52da3d9ba
	}

	render() {
		return (
		)
	}
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect (mapStateToProps, mapDispatchToProps)(SearchingGroup)
