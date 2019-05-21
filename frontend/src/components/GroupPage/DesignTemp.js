import React from 'react';

const DesignTemp = ({ design, onClickLike }) => {
    return (
        <div>
            <div>
                id: {design.id}
                owner: {design.owner}
                likes: {design.likes}
                body: {design.detail_body}
                sleeve: {design.detail_sleeve}
            </div>
            <button onClick={onClickLike}>
                LIKE
            </button>
        </div>
    )
}

export default DesignTemp
