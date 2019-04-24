import React from 'react';
import { connect } from 'react-redux';

const GroupItem = ({ groupname, grouptype, onClick }) => {
	return (
		<ul>
			<div className="groupname">{groupname}</div>
		</ul>
	)
}

class GroupList extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {

		return (
			<ul>
			{groupliststate.map(group =>
				<Group key={group.id}
				{...group}
				onClick={() => onGroupClick(group.id)}
				/>
			)}
			</ul>
		)
	}
}

export default connect( mapStateToProps, mapDispatchToProps )( GroupList )
