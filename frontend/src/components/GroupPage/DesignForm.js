import React from 'react';
import CommentForm from '../Comment/CommentForm';
import CommentList from '../Comment/CommentList';

const DesignTemp = ({ design, group, my_groups, onClickEdit, onClickPost, onClickLike, onClickUnlike, onClickDelete }) => {
    let post_group

    return (
        <div>


            {(group.group_type === "UR")
                /* grouptype이 user 그룹일때 - edit 및 post 가능 */
                ? (<div>
                  <div className="DesignList-Button-Field">
                  <button className="button_edit" type="button"
                      onClick={onClickEdit}>
                      EDIT
                  </button>
                  {design.auth && <button className="button_edit" onClick={onClickDelete}>DELETE DESIGN</button>}
                  </div>
                  <div>
                      {console.log("design: ", design)}
                      <img src={design.front_image_url} />
                      <img src={design.back_image_url} />

                  </div>

                  <div className="Comment-Like-Field">
                  <span className="title5">{design.likes}명이 좋아합니다</span>
                  </div>
                  <div className="Comment-Write-Field">
                      <select id="post_group" ref={node=>{post_group=node;}}>
                            <option>그룹을 선택하세요</option>
                            {my_groups.filter(group => {
                                return group.group_type !== "UR"
                            }).map(option => {
                                console.log("option: ", option)
                                return <option key={option.id} value={option.id}> {option.group_type} {option.group_name} </option>
                            })}
                        </select>
                        <div className="Comment-Button-Field">
                        <button class="post_btn" type="button"
                            onClick={() => {
                                console.log("post_group: ", post_group)
                                if(post_group.value === undefined || post_group.value == "그룹을 선택하세요") {
                                    alert("그룹을 선택하세요")
                                }
                                else {
                                    onClickPost(post_group.value)
                                }
                                }}>
                            POST
                        </button>
                        </div>
                      </div>
                    </div>)

                /* grouptype이 user 그룹이 아닐 때 - like 및 댓글 가능 */
                : <div>
                    <div className="DesignList-Button-Field">
                    {design.auth && <button className="button_edit" onClick={onClickDelete}>DELETE</button>}
                    </div>
                <div>
                    {console.log("design: ", design)}
                    <img src={design.front_image_url} />
                    <img src={design.back_image_url} />

                </div>
                <div className="Comment-Like-Field">
                <span className="title5">{design.likes}명이 좋아합니다</span>
                    <div className="Group-Button-Field">
                        {design.liked
                        ? (<button className="button button_unlike" onClick={onClickUnlike}>좋아요 취소</button>)
                        : (<button className="button button_like" onClick={onClickLike}>좋아요</button>)
                        }
                    </div>
                  </div>

                    {/* design의 주인일 때 - 삭제 가능 */}

                        <CommentList designid={design.id} comments={design.comments}/>
                        <div className="Comment-Write-Field">

                            <span className="title5">댓글 쓰기..</span>
                            {console.log("DesignTemp design.comments: ", design.comments)}
                            <CommentForm designid={design.id}/>
                        </div>


                    </div>

            }

        </div>
    )
}

export default DesignTemp
