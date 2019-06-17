import React from "react";
import {connect} from 'react-redux';
import { toAddComment } from "../../actions";

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.name;
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

    this.props.onAddComment(this.props.designid, this.name.value, this.message.value)
  }

  /**
   * Simple validation
   */
  isFormValid() {
    return this.name !== "" && this.message !== "";
  }

  render() {

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          
            <input
              id="comment_name"
              ref={ node => {this.name=node;} }
              className="form-control"
              placeholder="Name"
              name="name"
              type="text"
            />

            <input
              id="comment_text"
              ref={ node => {this.message=node;} }
              // value={this.contents}
              className="form-control2"
              placeholder="Comment"
              name="message"
              rows="5"
            />
              <button className="button button_comment">
                Comment &#10148;
              </button>

        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onAddComment: (designid, name, message) => dispatch(toAddComment(designid, name, message)),
})

export default connect (null, mapDispatchToProps)(CommentForm)
