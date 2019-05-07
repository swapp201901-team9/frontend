import React from 'react';

import CreateGroup from './CreateGroup'
import AllGroupList from './AllGroupList';
import MyGroupList from './MyGroupList';
import SearchingGroup from './SearchingGroup';

class GroupPage extends React.Component {
	render() {
		return (
			<div>
				<CreateGroup />
				<SearchingGroup />
				<MyGroupList />
			</div>
		)
	}
}

export default GroupPage;

