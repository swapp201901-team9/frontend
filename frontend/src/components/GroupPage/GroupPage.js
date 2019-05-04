import React from 'react';
import { connect } from 'react-redux';

import CreateGroup from './CreateGroup'
import AllGroupList from './AllGroupList';

class GroupPage extends React.Component {

	
	render() {
		return (
			<div>
				<CreateGroup />
				<AllGroupList />
			</div>
		)
	}
}

export default GroupPage;

