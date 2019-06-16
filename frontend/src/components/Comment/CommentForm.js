import React from "react";
import {connect} from 'react-redux';
import { toAddComment } from "../../actions";

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.message;
    // bind context to methods
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Form submit handler
   */
  onSubmit(e) {
    // prevent default form submission
    e.preventDefault();

    if (!this.isFormValid()) {
      this.setState({ error: "All fields are required." });
      return;
    }

    this.props.onAddComment(this.props.designid, this.message.value)
  }

  /**
   * Simple validation
   */
  isFormValid() {
    return this.message !== "";
  }

  render() {

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          {/* <div className="form-group">
            <input
              onChange={this.handleFieldChange}
              value={this.state.comment.name}
              className="form-control"
              placeholder="😎 Your Name"
              name="name"
              type="text"
            />
          </div> */}

          <div className="form-group">
            <textarea
              ref={ node => {this.message=node;} }
              // value={this.contents}
              className="form-control"
              placeholder="Your Comment"
              name="message"
              rows="5"
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary">
              Comment &#10148;
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onAddComment: (designid, contents) => dispatch(toAddComment(designid, contents)),
})

export default connect (null, mapDispatchToProps)(CommentForm)
