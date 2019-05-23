import React from 'react';

const DesignTemp = ({ design, onClickLike }) => {
    return (
        <div>
            <div>
                id: {design.id}<br/>
                owner: {design.owner}<br/>
                likes: {design.likes}<br/>
                body: {design.detail_body}<br/>
                sleeve: {design.detail_sleeve}
            </div>
            <button onClick={onClickLike}>
                LIKE
            </button>
            <br/>
        </div>
    )
}

export default DesignTemp
