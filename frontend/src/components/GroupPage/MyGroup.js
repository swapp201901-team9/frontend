import React from 'react';

const MyGroup = ({ group, onClickGroup, onClickAdminGroup }) => {
    return (
        <div>
            <div onClick={onClickGroup}>
                {group.id} {group.group_type} {group.group_name}
            </div>
            <button onClick={onClickAdminGroup}>
                ADMIN
            </button>
        </div>
    )
}

export default MyGroup