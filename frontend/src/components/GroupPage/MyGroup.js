import React from 'react';

const MyGroup = ({ group, onClickGroup, onClickAdminGroup, onClickWithdrawGroup }) => {
    return (
        <div>
          <div className = "Group-List-Field">
            <div>
              <p onClick={onClickGroup}> {group.group_type} {group.group_name} </p>
              <div className="Group-Button-Field">
                      <button className="button button_small" onClick={onClickWithdrawGroup}>탈퇴</button>
              </div>
          
              <div>
                {group.admin && (group.group_type !== "UR") && 
                  (<div className="Group-Button-Field">
                    <button className="button button_small" onClick={onClickAdminGroup}>관리자</button>
                  </div>)
                }
              </div>
            </div>
          </div>
        </div>
    )
}

export default MyGroup
