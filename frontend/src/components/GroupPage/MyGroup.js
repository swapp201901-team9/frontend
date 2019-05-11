import React from 'react';

const MyGroup = ({ group, onClickGroup, onClickAdminGroup }) => {
    return (
        <div>
            <div onClick={onClickGroup}>
                {group.id} {group.grouptype} {group.groupname}
            </div>
            <button onClick={onClickAdminGroup}>
                ADMIN
            </button>
        </div>
    )
}

export default MyGroup