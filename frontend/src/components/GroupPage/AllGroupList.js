import React from 'react';
import { connect } from 'react-redux';

import { toJoinGroup, gotoGroupDetail } from '../../actions/index.js';

const AllGroup = ({ group, onClickGroup, onClickJoinGroup }) => {
    return (
        <div>
            <div onClick={onClickGroup}>
                {group.id} {group.grouptype} {group.groupname}
            </div>
            <button onClick={onClickJoinGroup}>
                JOIN GROUP
            </button>
        </div>
    )
}

const AllGroupList = ({ grouplist }) => {
   return (
       <div>
        <h1>All Group List</h1>
            <ul>
                {grouplist.map(group =>
                    <AllGroup 
                        key={group.id}
                        group={group}
                        onClickGroup={() => this.props.onToGroupDetail(group.id)}
                        onClickJoinGroup={() => this.props.onJoinGroup(group.id)}
                    />
                )}
            </ul>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    onJoinGroup: (groupid) => toJoinGroup(groupid),
    onToGroupDetail: (groupid) => gotoGroupDetail(groupid)
})

export default connect (null, mapDispatchToProps)(AllGroupList)