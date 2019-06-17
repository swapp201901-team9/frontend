import React from "react";
import { connect } from 'react-redux';
import { defaultCipherList } from "constants";
import { toEditComment, toLikeComment, toUnlikeComment, toDeleteComment } from "../../actions";

class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.new_name;
    this.new_message;

    console.log("Comment comment: ", props.comment)
    // console.log("c c: ", comment.comment)

    this.state = {
      editMode: false
    }

    this.deleteCommentCheck = this.deleteCommentCheck.bind(this)
    this.onClickEditComment = this.onClickEditComment.bind(this)
    this.onClickCompleteEditComment = this.onClickCompleteEditComment.bind(this)
    this.editModeRender = this.editModeRender.bind(this)
    this.readModeRender = this.readModeRender.bind(this)
  }

  deleteCommentCheck() {
		if(confirm("정말 삭제하시겠습니까?") == true)
			return toDeleteComment(this.props.comment.id)
		else
			return false;
    }

  onClickEditComment() {
    this.setState({
      editMode: true
    })
  }

  onClickCompleteEditComment() {
    this.setState({
      editMode: false
    })
    toEditComment(this.props.comment.id, this.new_name.value, this.new_message.value)
  }

  editModeRender() {
    return (
      <form onSubmit={this.onClickCompleteEditComment}>
        <div className="form-group">
          <input
            ref={ node => {this.new_name=node;} }
            className="form-control"
            defaultValue={this.props.comment.name}
            name="name"
            type="text"
          />
        </div>

        <div className="form-group">
          <textarea
            ref={ node => {this.new_message=node;} }
            // value={this.contents}
            className="form-control"
            defaultValue={this.props.comment.comment}
            name="message"
            rows="5"
          />
        </div>

        <div className="form-group">
          <button className="btn btn-primary">
            Done
          </button>
        </div>
      </form>
    )



  }

  readModeRender() {
    return (
      <div className="Comment-Field">
        {/* <img
          className="mr-3 bg-light rounded"
          width="48"
          height="48"
          src={`https://api.adorable.io/avatars/48/${name.toLowerCase()}@adorable.io.png`}
          alt={name}
        /> */}


          {/* <small className="float-right text-muted">{time}</small> */}
          {/* <h6 className="mt-0 mb-1 text-muted">{name}</h6> */}
          <div className="Comment-List-Field">
            <div className="Group-Name-Field">
              <span className="title5">{this.props.comment.name} </span>
            </div>
          <div className="Comment-Button-Field">
          {this.props.comment.auth
            // 댓글을 단 사람이면
            ? <div>
                <button className="button button_delete" onClick={() => this.deleteCommentCheck()}>DELETE</button>
                <button className="button button_edit" onClick={() => this.onClickEditComment()}>EDIT</button>
              </div>
            // 댓글을 단 사람이 아니면
            : this.comment.liked
              ? <button className="button button_unlike" onClick={() => toUnlikeComment(this.comment.id)}>좋아요 취소</button>
              : <button className="button button_like" onClick={() => toLikeComment(this.comment.id)}>좋아요 &#10084;</button>
          }
          </div>
          </div>
          {this.props.comment.comment} {this.props.comment.likes}

      </div>
    )
  }


  render() {
    return (
      <div>
        {
          this.state.editMode
          ? this.editModeRender()
          : this.readModeRender()
          // :<div></div>
        }
      </div>


    )
  }
}


export default Comment
