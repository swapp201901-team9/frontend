import React from 'react';
import SignOut from '../MainPage/SignOut.js';
import {connect} from 'react-redux';

class ProfilePage extends React.Component {
    render() {
        if (!this.props.loading) {
            return (
                    <div>
                        <SignOut />
                    </div>
                    )
        }
        return (
                <div>
                    <SignOut />


			                 <div className="Change">
                        <span>{this.props.profile_user}의 프로필</span>
                        <div className="Text-Field">
                          <label>
                          ID
                          </label>
                          <div className="bordered_textarea">{this.props.profile_user}</div>
                        </div>
                        <div className="Text-Field">
                          <label>
                          NAME
                          </label>
                          <div className="bordered_textarea">{this.props.profile_myname}</div>
                        </div>
                        <h2 id="p_name">이름:{this.props.profile_myname}</h2>
                        <h2 id="p_belong">소속:{this.props.profile_mybelong}</h2>

			                     </div>
                    
                </div>
               )
    }
}

let mapStateToProps = (state) => {
    return {
        loading: state.loading,
        profile_user : state.profile_user !== null ? Object.assign(state.profile_user.user) : null,
        profile_myname: state.profile_user !== null? Object.assign(state.profile_user.myname): null,
        profile_mybelong: state.profile_user !== null? Object.assign(state.profile_user.mybelong):null,

    }
}

export default ProfilePage = connect(mapStateToProps)(ProfilePage);
