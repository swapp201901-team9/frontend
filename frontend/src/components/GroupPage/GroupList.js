import React from 'react';

const GroupList = ({ grouplist, onClickGroup, onClickJoinGroup }) => {
    return (
        <div>
            {grouplist.map(group => 
                <ul key={group.id}> 
                    <p onClick={() => onClickGroup(group.id)}>{group.id} {group.group_type} {group.group_name}</p>
                    <button onClick={() => onClickJoinGroup(group.id)}>JOIN GROUP</button>
                </ul> 
            )}
        </div>  
    )
}

export default GroupList