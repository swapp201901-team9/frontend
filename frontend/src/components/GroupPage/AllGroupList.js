import React from 'react';
import { connect } from 'react-redux';

import { toJoinGroup, gotoGroupDetail } from '../../actions/index.js';

const AllGroup = ({ group, onClickGroup, onClickJoinGroup }) => {
    return (
        <div>
            <div onClick={onClickGroup}>
                {group.id} {group.group_type} {group.group_name}
            </div>
            <button onClick={onClickJoinGroup}>
                JOIN GROUP
            </button>
        </div>
    )
}

class AllGroupList extends React.Component {
    render() {
        return (
            <div>
                <h1>All Group List</h1>
                <ul>
                    {this.props.all_groups.map(group => 
                        <AllGroup 
                            key={group.group_name}
                            group={group}
                            onClickGroup={() => this.props.onToGroupDetail(group.id)}
                            onClickJoinGroup={() => this.props.onJoinGroup(group.id)}
                        />
                    )}  
                </ul>
            </div>
         )
    } 
}

const mapStateToProps = (state) => ({
    all_groups: state.all_groups,
})

const mapDispatchToProps = (dispatch) => ({
    onJoinGroup: (groupid) => toJoinGroup(groupid),
    onToGroupDetail: (groupid) => gotoGroupDetail(groupid)
})

export default connect (mapStateToProps, mapDispatchToProps)(AllGroupList)