import React from 'react';

const MyGroup = ({ group, onClickGroup, onClickAdminGroup }) => {
    return (
        <div>
          <div className = "Group-List-Field">
          <ul>
            <div onClick={onClickGroup}>


                {group.id}{group.group_type} {group.group_name}
                  </div>

                {group.admin &&

                <button className="button button_admin" onClick={onClickAdminGroup}>
                    ADMIN
                </button>}

                  </ul>
            </div>
        </div>
    )
}

export default MyGroup
