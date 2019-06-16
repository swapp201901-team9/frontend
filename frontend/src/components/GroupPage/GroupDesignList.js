import React from 'react';

const GroupDesignList = ({ groupid, designlist, onClickDeleteDesign }) => {    
    return (
        <div>
            {designlist.map(design => 
                <ul key={design.id}> 
                    <div>
                        <img src={design.front_image_url} />
                        <img src={design.back_image_url} /> 
                    </div>
                    <button onClick={() => onClickDeleteDesign(groupid, design.id)}>삭제</button>
                </ul> 
            )}
        </div>  
    )
}

export default GroupDesignList