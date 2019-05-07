import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

const homepageInitialState = {
    authorization: "",
    profile_user: null,

    all_groups: [],
    my_groups: [],
    filtered_groups: [],

    my_requests: [],
    load : 0,
    loading: false,
    
};

const homepage = (state = homepageInitialState, action) => {
    switch (action.type) {
         
        case 'SIGN_OUT': {
            return homepageInitialState //go back to initial state when sign out
        }
        case 'CHANGE_URL': {
            window.location.pathname = action.path
            return state
        }
        case 'SET_STATE': {
            return Object.assign({}, state, {
                authorization: action.state.authorization,
                
                profile_user: action.state.profile_user,
                
                all_groups: action.state.all_groups,
                my_groups: action.state.my_groups,
                filtered_groups: action.state.filtered_groups,

                my_requests: action.state.my_requests,
                load : action.state.load,
                loading: action.state.loading,
                
            })
        }
       
        default: {
            return state
        }
   }
}

const homepageApp = homepage // If there are at least two reducers, use 'combineReducers' instead of this code.
export default homepageApp
