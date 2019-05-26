import React from 'react';

const GroupUserList = ({ groupid, userlist, onClickDeleteUser, onClickGiveAdmin }) => {
    console.log("GroupUserList groupid: ", groupid)
    return (
        <div>
            {userlist.map(user => 
                <ul key={user.id}> 
                    <p>{user.id} {user.username}</p>
                    <button className="Button button_small" onClick={() => onClickDeleteUser(groupid, user.id)}>DELETE</button>
                    <button className="Button button_small" onClick={() => onClickGiveAdmin(groupid, user.id)}>ADMIN</button>
                </ul> 
            )}
        </div>  
    )
}

export default GroupUserList