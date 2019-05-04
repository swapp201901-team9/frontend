import React from 'react';
import { connect } from 'react-redux';

import CreateGroup from './CreateGroup'

class GroupPage extends React.Component {

	
	render() {
		return (
			<div>
				<CreateGroup />
			</div>
		)
	}
}

export default GroupPage;

