import React from 'react';

const MyGroup = ({ group, onClickGroup, onClickAdminGroup, onClickWithdrawGroup }) => {
    return (
        <div>
          <div className = "Group-List-Field">
            <div>
              <p onClick={onClickGroup}> {group.group_type} {group.group_name} </p>
                {group.admin 
                  ? (<div className="Group-Button-Field">
                      <button className="button button_small" onClick={onClickAdminGroup}>ADMIN</button>
                      </div>)
                  : (<div className="Group-Button-Field">
                      <button className="button button_small" onClick={onClickWithdrawGroup}>WITHDRAW</button>
                      </div>)}
            
            </div>
          </div>
        </div>
    )
}

export default MyGroup
