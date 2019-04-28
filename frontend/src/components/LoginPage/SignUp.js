import React from 'react';
import { connect } from 'react-redux';
import {gotoSignUpPage} from '../../actions'

class SignUp extends React.Component {
    render() {
        const onNewTab = () => {
            console.log("Redirect to signup page...");
            this.props.onClick();
        };
        return (
            <div>
              <div className="Button-Field">
                   <button id="sign_up" className="button button_white" onClick={onNewTab}>입BooK 하기</button>
              </div>
            </div>
                )
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onClick: () => dispatch(gotoSignUpPage())
    }
}

SignUp = connect(undefined, mapDispatchToProps)(SignUp);

export default SignUp;
