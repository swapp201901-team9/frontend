import React from 'react';

const DesignTemp = ({ design, group, my_groups, onClickEdit, onClickPost, onClickLike, onClickUnlike, onClickDelete }) => {
    return (
        <div>
            <div>
                {console.log("design: ", design)}
                <img src={design.front_image_url} />
                <img src={design.back_image_url} />
            </div>
            {(group.group_type === "UR")
                ? (<div>
                        <select id="post_group">
                        {my_groups.filter(group => {
                            return group.group_type !== "UR"
                        }).map(option => {
                            return <option key={option.id} value={option.id}> {option.group_type} {option.group_name} </option>
                        })}
                        </select>
                        <button class="post_btn" type="button" 
                            onClick={onClickEdit}>
                            EDIT
                        </button>
                        <button class="post_btn" type="button" 
                            onClick={() => onClickPost(document.getElementById("post_group").value)}>
                            POST
                        </button>
                    </div>)
                : (design.liked 
                    ? (<button onClick={onClickUnlike}>UNLIKE</button>)
                    : (<button onClick={onClickLike}>LIKE</button>)
                    )
            }

            {design.auth && <button onClick={onClickDelete}>DELETE</button>}
            <br/>
        </div>
    )
}

export default DesignTemp
