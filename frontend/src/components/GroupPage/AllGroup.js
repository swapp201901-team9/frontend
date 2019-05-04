import React from 'react';
import { connect } from 'react-redux';
import { toGroupDetail } from '../../actions';

const AllGroup = ({ group, onClickJoinGroup }) => {
    return (
        <div>
            {group.grouptype} {group.groupname}
            <button onClick={onClickJoinGroup}>
                JOIN GROUP
            </button>
        </div>
    )
}

export default AllGroup