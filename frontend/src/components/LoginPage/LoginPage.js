import React, { Component } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import NavBar from '../NavBar/NavBar';

class LoginPage extends Component {
    render() {
        return (
           <body>
           < NavBar/>
           <section className="wrap clear">
            <div className = "main">
                <SignIn />
                <SignUp />
            </div>
            </section>
           </body>
    );
  }
}

export default LoginPage;
