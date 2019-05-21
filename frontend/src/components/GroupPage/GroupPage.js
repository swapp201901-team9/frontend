import React from 'react';
import {connect} from 'react-redux';

import NavBar from '../NavBar/NavBar';
import CreateGroup from './CreateGroup';
import MyGroupList from './MyGroupList';
import SearchingGroup from './SearchingGroup';

class GroupPage extends React.Component {
	render() {
		if(!this.props.loading) {
			return (
				<p>loading...</p>
			)
		}

		return (
			<div className="GroupPage">
				<NavBar />
				<section className="wrap clear col3">
					<div className="aside">
						<h2 className="h_white">CREATE GROUP</h2>
							<div className="content">
							<CreateGroup />
							</div>
					</div>
					<div className="main">
						<h2 className="h_white">SEARCHING GROUP</h2>
							<div className="content">
							<SearchingGroup />
							</div>
					</div>
					<div className="aside">
						<h2 className="h_black">MY GROUP</h2>
							<div className="content">
							<MyGroupList />
							</div>
					</div>
				</section>



				<svg viewBox="0 0 1000 1000">
    <path id="curve" d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97" />
    <text width="500" fill="red">
      <textPath>
        Dangerous Curves Ahead
      </textPath>
    </text>
  </svg>
			</div>

			
		)
	}
}

const mapStateToProps = (state) => ({
	loading: state.loading
})

export default connect(mapStateToProps)(GroupPage);
