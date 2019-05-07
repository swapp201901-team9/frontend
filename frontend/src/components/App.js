import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';

import MainPage from './MainPage/MainPage.js';
import LoginPage from './LoginPage/LoginPage.js';
import SignUpPage from './SignUpPage/SignUpPage.js';
import L_MainPage from './MainPage/L_MainPage.js';
import GroupPage from './GroupPage/GroupPage.js';
import ProfilePage from './ProfilePage/ProfilePage.js';
import GroupDetailPage from './GroupPage/GroupDetailPage.js';

import PropTypes from 'prop-types';


// Used for controlling multiple pages in one frontend project
// hard-coding : access of unlogged-in user to TimeLinePage
const App = ({store}) => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/log_in" component={LoginPage} />
                    <Route exact path="/sign_up" component={SignUpPage} />
                    <Route exact path="/main" component={L_MainPage} />
                 	<Route exact path="/group" component={GroupPage} />
					<Route path="/profile/:id" component={ProfilePage} />
                    <Route path="group/:id" component={GroupDetailPage} />


                </div>
            </BrowserRouter>
        </Provider>
        )
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;
