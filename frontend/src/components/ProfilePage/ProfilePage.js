import React from 'react';
import {connect} from 'react-redux';
import NavBar from '../NavBar/NavBar';
import ChangePWPage from './ChangePWPage';
import EscapePage from './EscapePage';

class ProfilePage extends React.Component {

    render() {
        return (
              <div>
              <NavBar />
                  <section className="wrap clear">

                      <div className="main">
                      <h2 className="h_white">MY PAGE</h2>
                        <div className="Text-Field">
                          <label>
                          ID
                          </label>
                          <div className="bordered_textarea">{this.props.profile_user}</div>
                        </div>
                      
                          <ChangePWPage/>
                          <EscapePage/>
                          </div>

                  </section>
              </div>
             )
    }
}

let mapStateToProps = (state) => {
    return {

        profile_user : Object.assign(state.authorization).split(":")[0],
        profile_myname: state.profile_user !== null? Object.assign(state.profile_user.myname): null,
        profile_mybelong: state.profile_user !== null? Object.assign(state.profile_user.mybelong):null,

    }
}

export default ProfilePage = connect(mapStateToProps)(ProfilePage);
