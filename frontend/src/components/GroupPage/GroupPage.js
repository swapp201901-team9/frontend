import React from 'react';
import { connect } from 'react-redux';

import CreateGroup from './CreateGroup'
import AllGroupList from './AllGroupList';
import MyGroupList from './MyGroupList';

class GroupPage extends React.Component {

	
	render() {
		return (
			<div>
				<CreateGroup />
				<AllGroupList />
				<MyGroupList />
			</div>
		)
	}
}

export default GroupPage;

