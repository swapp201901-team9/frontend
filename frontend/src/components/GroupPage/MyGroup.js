import React from 'react';

const MyGroup = ({ group, onClickGroup, onClickAdminGroup }) => {
    return (
        <div>
          <div className = "Group-List-Field">
            <div>
              <p onClick={onClickGroup}> {group.group_type} {group.group_name} </p>
                {group.admin &&
                  <div className="Group-Button-Field">
                <button className="button button_small" onClick={onClickAdminGroup}>
                    ADMIN
                </button></div>}
            
            </div>


            </div>
        </div>
    )
}

export default MyGroup
