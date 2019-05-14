import React from 'react';

const GroupUserList = ({ groupid, userlist, onClickDeleteUser }) => {
    console.log("GroupUserList groupid: ", groupid)
    return (
        <div>
            {userlist.map(user => 
                <ul key={user.id}> 
                    <p>{user.id} {user.username}</p>
                    <button onClick={() => onClickDeleteUser(groupid, user.id)}>DELETE</button>
                </ul> 
            )}
        </div>  
    )
}

export default GroupUserList