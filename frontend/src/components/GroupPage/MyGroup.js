import React from 'react';

const MyGroup = ({ group, onClickGroup, onClickAdminGroup }) => {
    return (
        <div>
          <div className = "Group-List-Field">
            <div onClick={onClickGroup}>
                {group.id} {group.group_type} {group.group_name}
            </div>
            {group.admin &&
              <div className="Group-Button-Field">
            <button onClick={onClickAdminGroup}>
                ADMIN
            </button></div>}
            </div>
        </div>
    )
}

export default MyGroup
