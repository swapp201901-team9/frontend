import React from 'react';

import NavBar from '../NavBar/NavBar';
import MyGroupList from '../GroupPage/MyGroupList';
import SignOut from './SignOut';

class L_MainPage extends React.Component {
    render() {
      return(
        <div>
          <p>Logged in Main Page</p>
          <SignOut />
        </div>
        

      )

        // return (
        //   <div className="app">
          // < NavBar/>
          // <section className="wrap clear col3">
          // <div className="aside">
          //   <h2 className="h_white">SELECT STYLE</h2>
          //   <div className="content">
          //   <p> contents </p>
          //   </div>
          // </div>
          // <div className="main">
          //   <h2 className="h_white">SAMPLE VIEW</h2>
          //   <div className="content">
          //   <p> contents </p>
          //   </div>
          // </div>
          // <div className="aside">
          //   <h2 className="h_black">MY GROUP</h2>
          //   <div className="content">
          //   <MyGroupList />
          //   </div>
          // </div>
          // </section>
        // </div>


        // )
    }
}

export default L_MainPage
