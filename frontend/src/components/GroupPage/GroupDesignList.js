import React from 'react';

const GroupDesignList = ({ designlist, onClickDeleteDesign }) => {
    return (
        <div>
            {designlist.map(design => 
                <ul key={design.id}> 
                    <p>{design.id} {design.owner} {design.likes} {design.detail_body} {design.detail_sleeve}</p>
                    <button onClick={() => onClickDeleteDesign(design.id)}>DELETE</button>
                </ul> 
            )}
        </div>  
    )
}

export default GroupDesignList