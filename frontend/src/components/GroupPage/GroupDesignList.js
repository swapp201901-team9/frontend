import React from 'react';

const GroupDesignList = ({ groupid, designlist, onClickDeleteDesign }) => {
    return (
        <div>
            {designlist.map(design => 
                <ul key={design.id}> 
                    <div>
                        id: {design.id}<br/>
                        owner: {design.owner}<br/>
                        likes: {design.likes}<br/>
                        body: {design.detail_body}<br/>
                        sleeve: {design.detail_sleeve}
                    </div>
                    <button onClick={() => onClickDeleteDesign(groupid, design.id)}>DELETE</button>
                </ul> 
            )}
        </div>  
    )
}

export default GroupDesignList