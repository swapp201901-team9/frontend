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
      editMode: false,
    }

    this.deleteCommentCheck = this.deleteCommentCheck.bind(this)
    this.onClickEditComment = this.onClickEditComment.bind(this)
    this.onClickCompleteEditComment = this.onClickCompleteEditComment.bind(this)
    this.editModeRender = this.editModeRender.bind(this)
    this.readModeRender = this.readModeRender.bind(this)
  }

  deleteCommentCheck() {

		if(confirm("정말 삭제하시겠습니까?") == true)
			return this.props.onDeleteComment(this.props.designid, this.props.comment.id)
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
      editMode: false,
    })
    this.props.onEditComment(this.props.designid, this.props.comment.id, this.new_name.value, this.new_message.value)
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

          <div className="Comment-List-Field">
            <div className="Group-Name-Field">
              <span className="title5">{this.props.comment.name} </span>
            </div>

          <div className="Comment-Button-Field">
          {this.props.comment.auth
            // 댓글을 단 사람이면
            ? <div>
                <button className="button button_comment_delete" onClick={() => this.deleteCommentCheck()}>DELETE</button>
                <button className="button button_comment_edit" onClick={() => this.onClickEditComment()}>EDIT</button>
              </div>
            // 댓글을 단 사람이 아니면

            : this.comment.liked
              ? <button className="button button_comment_unlike" onClick={() => this.props.onUnlikeComment(this.comment.id)}>좋아요 취소</button>
              : <button className="button button_comment_like" onClick={() => this.props.onLikeComment(this.comment.id)}>좋아요 &#10084; </button>

          }
          </div>
          </div>

            <span className="title4">{this.props.comment.comment}</span>
              <p className="likes">&#10084; {this.props.comment.likes}</p>

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

const mapDispatchToProps = (dispatch) => ({
	onEditComment: (designid, commentid, name, message) => dispatch(toEditComment(designid, commentid, name, message)),
  onDeleteComment: (designid, commentid) => dispatch(toDeleteComment(designid, commentid)),
  onLikeComment: (commentid) => dispatch(toLikeComment(commentid)),
  onUnlikeComment: (commentid) => dispatch(toUnlikeComment(commentid)),
})


export default connect(null, mapDispatchToProps)(Comment)
