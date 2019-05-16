import React from 'react';

const GroupList = ({ grouplist, onClickGroup, onClickJoinGroup }) => {
    return (
        <div>
        <div className = "Group-List-Field">
            {grouplist.map(group =>
                <ul key={group.id}>
                    <p onClick={() => onClickGroup(group.id)}>{group.id} {group.group_type} {group.group_name}
                      <button className="button button_small" onClick={() => onClickJoinGroup(group.id)}>JOIN GROUP</button>
                    </p>
                </ul>
            )}
        </div>
        </div>
    )
}

export default GroupList
