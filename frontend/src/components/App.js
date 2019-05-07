import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import MainPage from './MainPage/MainPage.js';
import LoginPage from './LoginPage/LoginPage.js';
import SignUpPage from './SignUpPage/SignUpPage.js';
import TimeLinePage from './TimeLinePage/TimeLinePage.js';
import GroupPage from './GroupPage/GroupPage.js';
import ProfilePage from './ProfilePage/ProfilePage.js';

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
<<<<<<< HEAD
                    <Route exact path="/main" component={L_MainPage} />
                 	<Route exact path="/groups" component={GroupPage} />
					<Route path="/profile/:id" component={ProfilePage} />
                    <Route path="/group/:id" component={GroupDetailPage} />
=======
                    <Route exact path="/main" component={TimeLinePage} />
                 	<Route exact path="/group" component={GroupPage} />
					<Route path="/profile/:id" component={ProfilePage} />
>>>>>>> 6d725871358dd7d6de8904157b9d3ce52da3d9ba


                </div>
            </BrowserRouter>
        </Provider>
        )
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;
