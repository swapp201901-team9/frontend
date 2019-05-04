import React from 'react';

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

export default AllGroup