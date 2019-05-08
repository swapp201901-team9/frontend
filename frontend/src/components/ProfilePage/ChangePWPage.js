import React from 'react';
import {connect} from 'react-redux';
import { toChangePW } from '../../actions/index.js';

class ChangePWPage extends React.Component {
    render() {
        const onChangeSubmit = () => {
            console.log("####"+this.props.profile_pw);
            if(this.currpw.value === "")
                alert("Enter the current password");
            else if(this.newpw.value === "")
                alert("Enter the new password");
            else if(this.newpwre.value === "")
                alert("Enter the new password verification");
            else if(this.newpw.value !== this.newpwre.value)
                alert("New password does not match");
            else if(this.props.profile_pw !== this.currpw.value)
                alert("Old password is not correct!");
            else this.props.onClick(this.props.profile_user,this.currpw.value, this.newpw.value)
        }
        return (
                <div>

                  <div className="Text-Field">
                      <label>
                      CURRENT PASSWORD
                      </label>
                      <input type="password" ref={ node=>{this.currpw = node;} } id="curr_pw" className="field" />
                  </div>
                    <div className="Text-Field">
                      <label>
                      NEW PASSWORD
                      </label>
                      <input type="password" ref={ node=> {this.newpw = node;}} id="new_pw" className="field" />
                    </div>
                    <div className="Text-Field">
                      <label>
                      NEW PASSWORD CHECK
                      </label>
                      <input type="password" ref={ node =>{this.newpwre = node;} } id="new_pw_RE" className="field" />
                    </div>
                    <div className="Button-Field">
                      <button type="submit" id="change_pw" onClick={onChangeSubmit}>바꾼다!</button>
                  </div>
                </div>
               )
    }
}

let mapStateToProps = (state) => {
    return {
        profile_user:Object.assign(state.authorization).split(":")[0],
        profile_pw : Object.assign(state.authorization).split(":")[1],
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onClick: (profuser, oldpw, newpw) => {
            console.log("ask for pw change");
            dispatch(toChangePW(profuser,oldpw, newpw));
        }
    }
}


export default ChangePWPage = connect(mapStateToProps,mapDispatchToProps)(ChangePWPage);
