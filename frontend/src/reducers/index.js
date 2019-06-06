import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

const homepageInitialState = {
    authorization: "",
    profile_user: null,

    all_groups: [], //존재하는 모든 그룹 정보
    my_groups: [], //내가 가입된 그룹 정보
    filtered_groups: [], //검색 결과 필터링된 그룹 정보

    group_users: [], //특정 그룹에 속한 모든 유저 리스트
    group_designs: [], //특정 그룹에 속한 모든 디자인 리스트

    now_group: null, //현재 작업 or 구경(?) 중인 그룹

    now_design: {}, //현재 메인 페이지에서 작업 중인(화면에 보이는) 디자인

   /* now_design: {
        detail_body: "#001c58",
        detail_sleeve: "#fcfcfc",
        detail_banding: "#001c58",
        detail_stripes: "#fcfcfc",
        detail_buttons: "#fcfcfc"
    }, */


    my_requests: [],
    load : 0,
    loading: false,
    
};

const homepage = (state = homepageInitialState, action) => {
    switch (action.type) {

        case 'AUTHENTICATE': {
            return Object.assign({}, state, {
                authorization: window.atob(action.auth)
            })
        }
         
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

                group_users: action.state.group_users,
                group_designs: action.state.group_designs,

                now_group: action.state.now_group,
                now_design: action.state.now_design,
                
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
