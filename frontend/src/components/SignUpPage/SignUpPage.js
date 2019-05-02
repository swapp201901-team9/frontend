import React from 'react'
import { connect } from 'react-redux';
import {changeUrl, postSignUp} from '../../actions';
import NavBar from '../NavBar/NavBar';

class SignUpPage extends React.Component {
    render() {
        const onCreateSubmit = () => {
            if(this.username.value === "")
                alert("아이디를 입력하세요.");
            else if(this.password.value === "")
                alert("비밀번호를 입력하세요.");
            else if(this.pwdverification.value === "")
                alert("비밀번호를 확인하세요.");
            else if(this.password.value !== this.pwdverification.value)
                alert("비밀번호가 일치하지 않습니다.");
            else
                this.props.onClick(this.username.value, this.password.value)
        }
        return (

          <div>
          < NavBar/>
          <section className="wrap clear">
           <div className = "main">
           <div>
             <div>
                <img alt="" />
             </div>
             <div >
             <div className="module_title"> JOIN </div>

                 <form onSubmit={e => {
                     e.preventDefault()
                     onCreateSubmit()
                 }}>
                 <div className="Text-Field">
                   <label>
                   USERNAME
                   </label>
                   <input type="text" ref={ node => {this.username = node;}} id="username_field" className="field" />
                 </div>
                   <div className="Text-Field">
                     <label>
                     PASSWORD
                     </label>
                     <input type="password" ref={ node => {this.password = node;}} id="password_field" className="field" />
                   </div>
                   <div className="Text-Field">
                     <label>
                     PASSWORD CHECK
                     </label>
                     <input type="password" ref={ node => {this.pwdverification = node;}} id="pwdverification_field" className="field" />
                   </div>
                  <div className="Button-Field">
                  <button type="submit" id="sign_up">SUBMIT</button>
                   </div>
                 </form>
             </div>
           </div>
           </div>
           </section>
          </div>

        );
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onClick: (username, password) => {
            console.log("ask for sign-up");
            dispatch(postSignUp(username, password))
        },
        onToLogin: () => dispatch(changeUrl('/'))
    }
}

SignUpPage = connect(undefined, mapDispatchToProps)(SignUpPage);

export default SignUpPage;
