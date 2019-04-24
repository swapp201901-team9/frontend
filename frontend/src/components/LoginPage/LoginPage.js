import React, { Component } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

class LoginPage extends Component {
    render() {
        return (
           <body>
            <div>
                <SignIn />
                <SignUp />
            </div>
           </body>
    );
  }
}

export default LoginPage;
