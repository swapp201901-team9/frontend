import React from 'react';

const GroupList = ({ grouplist, onClickGroup, onClickJoinGroup, onClickWithdrawGroup }) => {
  
  return (
    <div>
      <div className = "Group-List-Field">
        {grouplist.map(group =>
          <ul key={group.id}>
            <p onClick={() => onClickGroup(group.id)}>{group.group_type} {group.group_name}</p>
            {group.member
              ? ( <button className="button button_small" onClick={() => onClickWithdrawGroup(group.id)}>WITHDRAW</button> )
              : ( <button className="button button_small" onClick={() => onClickJoinGroup(group.id)}>JOIN</button>) 
            }
          </ul>
        )}
      </div>
    </div>
  )
}

export default GroupList