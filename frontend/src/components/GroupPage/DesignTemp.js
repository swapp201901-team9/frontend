import React from 'react';

const DesignTemp = ({ design, onClickLike, onClickUnlike, onClickDelete }) => {
    return (
        <div>
            <div>
                id: {design.id}<br/>
                owner: {design.owner}<br/>
                likes: {design.likes}<br/>
                body: {design.detail_body}<br/>
                sleeve: {design.detail_sleeve}
                {console.log(design)}
            </div>
            <button onClick={onClickLike}>LIKE</button>
            {design.auth && <button onClick={onClickDelete}>DELETE</button>}
            <br/>
        </div>
    )
}

export default DesignTemp
