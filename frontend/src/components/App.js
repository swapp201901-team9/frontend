import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage.js';
import SignUpPage from './SignUpPage/SignUpPage.js';
import TimeLinePage from './TimeLinePage/TimeLinePage.js';

import ProfilePage from './ProfilePage/ProfilePage.js';
import GroupListContainer from './GroupPage/GroupList.js';
import CreateGroupPage from './GroupPage/CrateGroupPage.js';

import PropTypes from 'prop-types';


// Used for controlling multiple pages in one frontend project
// hard-coding : access of unlogged-in user to TimeLinePage
const App = ({store}) => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={LoginPage} />
                    <Route exact path="/sign_up" component={SignUpPage} />
                    <Route exact path="/main" component={TimeLinePage} />
				    <Route exact path="/grouplist" component={GroupListContainer} />               
                    <Route exact path="/create_group" compoent={CreateGroupPage} />

					<Route path="/profile/:id" component={ProfilePage} />


                </div>
            </BrowserRouter>
        </Provider>
        )
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;
