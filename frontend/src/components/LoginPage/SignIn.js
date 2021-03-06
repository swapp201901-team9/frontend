import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../actions';

class SignIn extends React.Component {
    render() {
        const onSubmit = () => {
            if (this.username !== undefined && this.password !== undefined) {
                this.props.onClick(this.username.value, this.password.value)
            }
        };
        return (
         <div>
         <form onSubmit={e => {
             e.preventDefault()
             onSubmit()
           }}
           >


                    <div className="Text-Field">
                      <label>
                      ID
                      </label>
                      <input type="text" ref={ node => {this.username = node;} } id='username_field' className='field'></input>
                    </div>
                    <div className="Text-Field">
                      <label>
                      PASSWORD
                      </label>
                      <input type="password" ref={ node => {this.password = node;} } id='password_field' className='field'></input>
                      </div>
                      <div className="Button-Field">
                        <button type="submit" id='sign_in' className = "button" >LOGIN</button>
                      </div>
            </form>
          </div>
        )
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onClick: (username, password) => {
            dispatch(signIn(username, password))
        }
    }
}

SignIn = connect(undefined, mapDispatchToProps)(SignIn);

export default SignIn;
