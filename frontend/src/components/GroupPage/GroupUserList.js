import React from 'react';

const GroupUserList = ({ userlist, onClickDeleteUser }) => {
    return (
        <div>
            {userlist.map(user => 
                <ul key={user.id}> 
                    <p>{user.id} {user.username}</p>
                    <button onClick={() => onClickDeleteUser(user.id)}>DELETE</button>
                </ul> 
            )}
        </div>  
    )
}

export default GroupUserList