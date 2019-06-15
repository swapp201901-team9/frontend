import { put, take, call, fork, select, spawn } from 'redux-saga/effects'
import * as actions from './../../actions/index'
import { CREATE_GROUP, SEARCH_GROUP, JOIN_GROUP, TO_GROUP_DETAIL, TO_ADMIN_GROUP, LIKE_DESIGN, CHANGE_GROUP_INFO, DELETE_GROUP_USER, DELETE_GRUOP_DESIGN, SAVE_DESIGN, POST_DESIGN, WITHDRAW_GROUP, UNLIKE_DESIGN, DELETE_GROUP, GIVE_ADMIN, NEW_DESIGN, TO_EDIT_DESIGN } from './../../actions/types'

var xhr = require('xhr-promise-redux');

const fixed_url = "http://localhost:8000/";
const auth_check_url = fixed_url+'auth/';

// 이제 backend에서 사용하는 url은 모두 'path_name/'의 형식을 따르고, frontend에서 사용하는 url은 모두 '/path_name/'의 형식을 따릅니다.

// localStorage: 현재 사용하고 있는 브라우저 상에 스테이트를 저장하는데 사용.
// 무려 크롬을 종료했다 시작해도 정보가 저장되어 있어요!
// state의 경우 현재 페이지에서만 유지됩니다. (다른 페이지로 이동 시 리셋되기 때문에 새로 스테이트를 세팅해줘야 합니다. - 이 기능을 하는게 watchLoginState)
// localStorage에 들어갈 정보
//   1. "auth" - 아이디 및 비밀번호 (Base64로 encoding된 버전)
//   2. "parent" - articleDetailPage에서 원글 확인 & writePage에서 댓글 / 일반 포스팅 구분을 위한 parent article의 id
// localStorage의 정보를 넣기/가져오기/삭제하기
//      (1) 가져오기: localStorage.getItem('data_name') / localStorage['data_name']
//      (2) 넣기: localStorage.setItem('data_name', data) / localStorage['data_name'] = data
//      (3) 삭제하기: localStorage.removeItem('data_name')
const localStorage = window.localStorage;


// saga: 미들웨어에서 돌아갈 함수
export default function *saga() {
    const path = window.location.pathname;
    console.log("pathname: ", window.location.pathname)
    switch(window.location.pathname) {
        case '/':
            yield spawn(mainPageSaga);
            break;
        case '/log_in/':
            yield spawn(loginPageSaga);
            break;
        case '/main/':
            yield spawn(loggedInMainPageSaga);
            break;
        case '/sign_up/':
            yield spawn(signUpPageSaga);
            break;
        default:
            const url = path.split("/");
            switch(url[1]) {
                case 'profile':
                    yield spawn(profilePageSaga);
                    break;
                case 'groups':
                    yield spawn(groupPageSaga);
                    break;
                case 'group':
                    yield spawn(groupDetailPageSaga);
                    break;
                case 'admin':
                    yield spawn(groupAdminPageSaga);
                    break;
                default:
                    console.log("default state");
                    alert("없는 장소");
                    if(localStorage.getItem("auth") === null) {
                        // localStorage.removeItem('parent');
                        yield put(actions.changeUrl('/'));
                    } else {
                        // localStorage.removeItem('parent');
                        yield put(actions.changeUrl('/main/'));
                    }
            }
    }
}


///// Page별 saga함수
// 여러 기능들을 한 함수에 묶어서 saga함수에 추가할 때 예쁘게 추가하는 용도
//////////////////////////////////////////////////
// Page별 saga함수 작성 규칙
// 1. 페이지명을 포함하는 직관적인 이름의 함수를 정의한다.
//   (ex. 로그인 페이지를 작성할 경우 loginPageSaga)
// 2. 페이지의 url을 예쁘게(<<<<<중요>>>>>) 정의한다.
//   (좋은 예: 메인 페이지의 url - '/main/', 나쁜 예: 메인 페이지의 url - '/sogaewonsil_real_geukhyum/')
// 3. switch문의 케이스에 추가한다.
//   (ex. 메인페이지 추가 - case '/main/': yield spawn(mainPageSaga); break;)
// 4. 페이지 이동은 yield put(actions.changeUrl('/target_path/'))를 이용하시면 됩니다.
//////////////////////////////////////////////////
function *loginPageSaga() {
    console.log("Login Page Saga");
    yield spawn(watchLoginState);
    yield spawn(watchSignIn);
    yield spawn(watchSignUp);
}

function *signUpPageSaga() {
    console.log("Sign Up Page Saga")
    yield spawn(watchLoginState);
    yield spawn(watchPostSignUp);
}

function *mainPageSaga() {
    console.log("Main Page Saga");
    yield spawn(watchLoginState);
    yield spawn(watchGoToMain);

    yield spawn(watchNewDesign);

    // yield spawn(watchChangeBody);
    // yield spawn(watchChangeSleeve);
    // yield spawn(watchChangeBanding);
    // yield spawn(watchChangeStripe);
    // yield spawn(watchChangeButton);
}

function *loggedInMainPageSaga() {
    console.log("Logged In Main Page Saga");
    yield spawn(watchLoginState);

    yield spawn(watchSignOut);
    yield spawn(watchGoToMain);

    yield spawn(watchToProfile);
    yield spawn(watchGoToGroupDetail);
    yield spawn(watchGoToAdminGroup);

    yield spawn(watchNewDesign);
    yield spawn(watchSaveDesign);
    // yield spawn(watchChangeBody);
    // yield spawn(watchChangeSleeve);
    // yield spawn(watchChangeBanding);
    // yield spawn(watchChangeStripe);
    // yield spawn(watchChangeButton);
}

function *profilePageSaga() {
    console.log("Profile Page Saga");
    yield spawn(watchLoginState);
    yield spawn(watchSignOut);
    yield spawn(watchGoToMain);
    yield spawn(watchPWChange);
    yield spawn(watchIntroChange);
    yield spawn(watchEscape);
}

function *groupPageSaga() {
	console.log("Group Page Saga");
	yield spawn(watchLoginState);
	yield spawn(watchSignOut);
	yield spawn(watchGoToMain);

	//SA TODO: 더 추가될 가능성 있음
	yield spawn(watchCreateGroup);
	yield spawn(watchSearchGroup);
    yield spawn(watchJoinGroup);
    yield spawn(watchWithdrawGroup);
    yield spawn(watchGoToGroupDetail);
    yield spawn(watchGoToAdminGroup);
}

function *groupDetailPageSaga() {
    console.log("Group Detail Page Saga");
    yield spawn(watchLoginState);
    yield spawn(watchSignOut);
    yield spawn(watchGoToMain);

    yield spawn(watchToEditDesign);
    yield spawn(watchPostDesign);
    yield spawn(watchLikeDesign);
    yield spawn(watchUnlikeDesign);
    yield spawn(watchGoToGroupDetail);
    yield spawn(watchGoToAdminGroup);
    yield spawn(watchDeleteGroupDesign);
}

function *groupAdminPageSaga() {
    console.log("Group Admin Page Saga");
    yield spawn(watchLoginState);
    yield spawn(watchSignOut);
    yield spawn(watchGoToMain);

    yield spawn(watchChangeGrouInfo);
    yield spawn(watchDeleteGroupUser);
    yield spawn(watchGiveAdmin);
    yield spawn(watchDeleteGroupDesign);
    yield spawn(watchDeleteGroup);
}



///// Page별 saga함수에서 쓸 saga함수들 (watch 함수 편)
// watchLoginState: 브라우저에서의 로그인 여부 확인 및 state 업데이트
// <<주의>> 새로운 Page를 추가할 경우 PageSaga함수에 반드시 추가할 것
// <<주의>> 새로운 state를 추가할 경우 try-catch문을 이용해 정보를 받아온 후 스테이트에 업데이트 해야 함
function *watchLoginState() {
    if(window.location.pathname[window.location.pathname.length-1] !== '/') {
        console.log("without /")
        yield put(actions.changeUrl(window.location.pathname+'/'));
        return;
    }

    if(window.location.pathname === '/' || window.location.pathname === '/sign_up/' || window.location.pathname === '/log_in/') {
        if(localStorage.getItem("auth") !== null) {
            yield put(actions.changeUrl('/main/'));
        }
        else {
            let now_design_data;

            try{
                now_design_data = yield call(xhr.get, fixed_url+'', {
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': 'Basic '+localStorage['auth'],
                        Accept: 'application/json'
                    },
                    responsetype: 'json',
                });
                console.log("GET now_design data: ", now_design_data.body)
            } catch(error) {
                console.log(error)
                alert("main now_design error")
            }

            yield put(actions.setState({
                authorization: "",
                now_design: now_design_data.body,
                load: 0,
                loading: true
            }))
        }
    }
    else {
        if(localStorage.getItem("auth") === null) {
            yield put(actions.changeUrl('/'));
        }
        else {
            const path = window.location.pathname;
            let username = window.atob(localStorage.getItem("auth")).split(":")[0]
            console.log("username: ", username)
            console.log(yield select())
            let data, parent_data;
            
            if(path === '/main/') { // 여기가 바로 하드코딩된 부분입니다 여러분!
                // localStorage.removeItem('parent');
                let my_groups_data, now_design_data;

                try{
                    now_design_data = yield call(xhr.get, fixed_url+'', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Basic '+localStorage['auth'],
                            Accept: 'application/json'
                        },
                        responsetype: 'json',
                    });
                    console.log("GET now_design data: ", now_design_data.body)
                } catch(error) {
                    console.log(error)
                    alert("main now_design error")
                }

                try {
                    my_groups_data = yield call(xhr.get, fixed_url+'groups/'+username+'/', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Basic '+localStorage['auth'],
                            Accept: 'application/json'
                        },
                        responseType: 'json',
                    });
                    console.log("GET my groups data: ", my_groups_data.body)
                } catch(error) {
                    console.log(error)
                    alert("main mygroups error");
                }

                yield put(actions.setState({
                    authorization: window.atob(localStorage['auth']),
                    now_design: now_design_data.body,
                    my_groups: my_groups_data.body,
                    load: 0,
                    loading: true
                    //TODO 이후 state 추가 시 여기에 스테이트 업데이트 추가
                }));
            }
            
            /* group 정보를 get 하는 부분
             * 1) profile_data backend에서 get (url: 'users/'+username+'/')
             * 2) all_groups_data backend에서 get (url: 'groups/')
             * 3) my_groups_data backend에서 get (url: 'users/'+username+'/groups/')
             */
            else if(path === '/groups/') {
                console.log("get group details...");
                let all_groups_data, my_groups_data;

                //all_groups data
                try{
                    all_groups_data = yield call(xhr.get, fixed_url+'groups/', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Basic '+localStorage['auth'],
                            Accept: 'application/json'
                        },
                        responseType: 'json',
                    });
                    console.log("GET all groups data: ", all_groups_data.body)
                } catch(error){
                    console.log(error)
                    alert("all groups data error")
                }
                
                //my_groups data
                try{
                    my_groups_data = yield call(xhr.get, fixed_url+'groups/'+username+'/', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Basic '+localStorage['auth'],
                            Accept: 'application/json'
                        },
                        responseType: 'json',
                    });
                    console.log("GET my groups data: ", my_groups_data.body)
                } catch(error){
                    alert("my groups data error")    
                }
                
                yield put(actions.setState({
                    authorization: window.atob(localStorage['auth']),
                    all_groups: all_groups_data.body,
                    my_groups: my_groups_data.body,
                    filtered_groups: all_groups_data.body,
                    load: 0,
                    loading: true,
                }))
            }

            // username또는 id를 기준으로 backend에 겟을 날리는 경우
            else { 
                const username = path.split("/")[2];
                const id = path.split("/")[2];

                if (username === undefined || username === '') {
                    console.log("404 not found");
                    alert("없는 장소");
                    if(localStorage.getItem("auth") === null) {
                        // localStorage.removeItem('parent');
                        yield put(actions.changeUrl('/'));
                    } else {
                        // localStorage.removeItem('parent');
                        yield put(actions.changeUrl('/main/'));
                    }
                    return;
                }

                //프로필 정보를 get하는 부분
                else if(path.split("/")[1] === 'profile'){
                    console.log("get profile details...");
                    let profile_data = null;
                    try{
                        profile_data = yield call(xhr.get, fixed_url+'users/'+username+'/',{
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Basic '+localStorage['auth'],
                            Accept: 'application/json'
                            },
                            responseType: 'json'
                            });
                            console.log('Get data without exception');
                    } catch(error){
                        alert("profile error");
                    }
                    yield put(actions.setState({
                        authorization: window.atob(localStorage['auth']),
                        profile_user: profile_data.body,
                        load: 0,
                        loading: true
                    }));
                }

                //group detail 정보를 get하는 부분
                else if(path.split("/")[1] === 'group') {
                    console.log("get group details...");
                    console.log("group id: ", id);
                    let username = window.atob(localStorage.getItem("auth")).split(":")[0]
                    let now_group_data, my_groups_data, group_designs_data = null;

                    //now_group data
                    try{
                        now_group_data = yield call(xhr.get, fixed_url+'groups/'+id+'/admin/',{
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Basic '+localStorage['auth'],
                            Accept: 'application/json'
                            },
                            responseType: 'json'
                            });
                            console.log('GET now group data: ', now_group_data.body[0]);
                    } catch(error){
                        alert("group data error");
                    }

                    //my_groups data
                    try{
                        my_groups_data = yield call(xhr.get, fixed_url+'groups/'+username+'/', {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Basic '+localStorage['auth'],
                                Accept: 'application/json'
                            },
                            responseType: 'json',
                        });
                        console.log("GET my groups data: ", my_groups_data.body)
                    } catch(error){
                        alert("my groups data error")    
                    }

                    //group designs
                    try{
                        group_designs_data = yield call(xhr.get, fixed_url+'groups/'+id+'/',{
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Basic '+localStorage['auth'],
                            Accept: 'application/json'
                            },
                            responseType: 'json'
                            });
                            console.log('Get group designs data without exception');
                    } catch(error) {
                        if(error.statusCode === 403) {
                            console.log("you are not permitted");
                            alert("가입하지 않은 그룹입니다")
                            yield put(actions.changeUrl('/groups/'))
                        }   
                        else {
                            console.log(error)
                            alert("group designs error");
                        }

                    }

                    yield put(actions.setState({
                        authorization: window.atob(localStorage['auth']),
                        now_group: now_group_data.body[0],
                        my_groups: my_groups_data.body,
                        group_designs: group_designs_data.body,
                        load: 0,
                        loading: true
                    }))
                }

                //group admin 정보를 get하는 부분
                else if(path.split("/")[1] === 'admin') {
                    console.log("get group admins...");
                    console.log("group id: ", id);
                    let now_group_data, group_users_data, group_designs_data = null;

                    try{
                        now_group_data = yield call(xhr.get, fixed_url+'groups/'+id+'/admin/',{
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Basic '+localStorage['auth'],
                            Accept: 'application/json'
                            },
                            responseType: 'json'
                            });
                            console.log('Get data without exception');
                    } catch(error){
                        alert("group data error");
                    }
                    
                    try{
                        group_users_data = yield call(xhr.get, fixed_url+'groups/'+id+'/members/',{
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Basic '+localStorage['auth'],
                            Accept: 'application/json'
                            },
                            responseType: 'json'
                            });
                            console.log('Get data without exception');
                    } catch(error){
                        alert("group users error");
                    }

                    try{
                        group_designs_data = yield call(xhr.get, fixed_url+'groups/'+id+'/',{
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Basic '+localStorage['auth'],
                            Accept: 'application/json'
                            },
                            responseType: 'json'
                            });
                            console.log('Get data without exception');
                    } catch(error){
                        alert("group designs error");
                    }

                    yield put(actions.setState({
                        authorization: window.atob(localStorage['auth']),
                        now_group: now_group_data.body[0],
                        group_users: group_users_data.body,
                        group_designs: group_designs_data.body,
                        load: 0,
                        loading: true
                    }))
                }

                else {
                    // 스테이트의 articles에 들어갈 내용을 받는 try-catch 문
                    let profile_data = null;
                    try {
                        // localStorage.setItem('parent', id);
                        data = yield call(xhr.get, fixed_url+'article/'+id+'/total/', {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Basic '+ localStorage['auth'],
                            Accept: 'application/json'
                            },
                            responseType: 'json'
                        });
                    } catch(error) {
                        alert("get article in state error");
                        return;
                    }
                    // 스테이트의 parent_article에 들어갈 내용을 받는 try-catch 문
                    try {
                        parent_data = yield call(xhr.get, fixed_url+'article/'+id+'/', {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Basic '+ localStorage['auth'],
                            Accept: 'application/json'
                            },
                            responseType: 'json'
                        });
                        console.log('Get data without exception');
                    } catch(error) {
                        alert("get parent article in state");
                        return;
                    }
                    //TODO 이후 state에 새로운 element를 추가할 경우 이 부분에 try-catch를 추가하면 됩니다
                    yield put(actions.setState({
                        authorization: window.atob(localStorage['auth']),

                        profile_user: profile_data !== null ? profile_data.body : null,
                        load: 0,
                        loading: true
                        //TODO 이후 state 추가 시 여기에 스테이트 업데이트 추가
                    }));
                }
            }
        }
    }
    console.log("after watchLoginState : ", yield select());
    // console.log(localStorage['parent']);
}

// watchSignIn: 로그인 버튼 클릭 관찰
function *watchSignIn() {
    while(true) {
        const data = yield take(actions.SIGN_IN);
        yield call(signIn, data);
    }
}

// watchSignUp: 회원가입 버튼 클릭 관찰
function *watchSignUp() {
    while(true) {
        yield take('GOTO_SIGN_UP');
        yield put(actions.changeUrl('/sign_up/'));
    }
}

// watchSignOut: 로그아웃 버튼 클릭 관찰
function *watchSignOut() {
    while(true) {
        yield take('SIGN_OUT');
        localStorage.removeItem('auth');
        // localStorage.removeItem('parent');
        yield put(actions.changeUrl('/'));
    }
}

// watchPostSignUp: 회원가입 페이지에서 가입 버튼 클릭 관찰
function *watchPostSignUp() {
    while(true) {
      console.log("here");
        const data = yield take('POST_SIGN_UP');
        console.log(data);
        yield call(signUp, data);
    }
}



// watchGoToMain: 메인으로 돌아가기 버튼 클릭 관찰 및 리다이렉트
function *watchGoToMain() {
    while(true) {
        yield take('POST_BACK');
        yield put(actions.changeUrl('/main/'));
    }

}



function *watchToProfile() {
    while(true) {
        const data=yield take('TO_PROFILE');
        yield put(actions.changeUrl('/profile/' + data.profuser + '/'));
    }
}
function *watchIntroChange(){
    while(true){
        const data = yield take('TO_INTRO_CHANGE');
        console.log("##"+data.user);
        yield call(updateIntro, data.user, data.myname, data.mybelong, data.myintro, data.removeImg, data.changeImg, data.img);
    }
}
function *watchPWChange(){
    while(true){
        const data = yield take('TO_PW_CHANGE');
        console.log("**get PW change action");
        yield call(updatePW, data.profuser, data.newpw);
    }
}
function *watchEscape(){
    while(true){
        const data = yield take('TO_ESCAPE');
        console.log("**get excape action");
        yield call(escapeBook, data.profuser);
    }
}


/* GroupPage에서 관찰하는 watch 함수들 */
//watchCreateGroup: GroupPage에서 새로운 그룹 생성 버튼 클릭 관찰 및 리다이렉트(새로운 그룹 detail 페이지로)
function *watchCreateGroup() {
	while(true) {
        const data = yield take(CREATE_GROUP);
        console.log("watchCreateGroup");
        yield call(createGroup, data);
        //SA TODO: groupname은 한글일텐데 url에 넣어도 되는가?
        //backend에서 redierect 처리
		//yield put(actions.changeUrl('/group/' + data.groupname + '/')); 

	}
}

//watchSearchGroup: GroupPage에서 그룹 검색 버튼 클릭 관찰
function *watchSearchGroup() {
	while(true) {
        const data = yield take(SEARCH_GROUP);
        console.log("watchSearchGroup")
		yield call(searchGroup, data);
		//SA TODO: 검색 결과로 리다이렉트??
	}
}

//watchJoinGroup: GroupPage에서 그룹 가입 버튼 클릭 관찰
function *watchJoinGroup() {
	while(true) {
		const data = yield take(JOIN_GROUP);
        console.log("watchJoinGroup")
        yield call(joinGroup, data);
	}
}

function *watchWithdrawGroup() {
    while(true) {
        const data = yield take(WITHDRAW_GROUP);
        console.log("watchWithdrawGroup")
        yield call(withdrawGroup, data);
    }
}

//watchGoToGroupDetail: GroupPage 혹은 MainPage에서 MyGroupList의 그룹 클릭 관찰 및 리다이렉트(클릭한 그룹 detail 페이지로)
function *watchGoToGroupDetail() {
	while(true) {
        const data = yield take(TO_GROUP_DETAIL);
        console.log("watchGoToGroupDetail")
		yield call(toGroupDetail, data);
		//yield put(actions.changeUrl('/group/' + data.groupname + '/'));
	}
}

//watchGoToAdminGroup: GroupPage 혹은 MainPage에서 MyGroupList의 그룹 admin 클릭 관찰 및 리다이렉트(클릭한 그룹 admin 페이지로)
function *watchGoToAdminGroup() {
	while(true) {
        const data = yield take(TO_ADMIN_GROUP);
        console.log("watchGoToAdminGroup");
		yield call(toAdminGroup, data);
		//yield put(actions.changeUrl('/group/' + data.groupname + '/'));
	}
}


function *watchToEditDesign() {
    while(true) {
        const data = yield take(TO_EDIT_DESIGN);
        console.log("watchToEditDesign");
        yield call(toEditDesign, data);
    }
}

function *watchLikeDesign() {
    while(true) {
        const data = yield take(LIKE_DESIGN);
        console.log("watchLikeDesign");
        yield call(likeDesign, data);
    }
}

function *watchUnlikeDesign() {
    while(true) {
        const data = yield take(UNLIKE_DESIGN);
        console.log("watchUnlikeDesign");
        yield call(unlikeDesign, data);
    }
}




function *watchChangeGrouInfo() {
    while(true) {
        const data = yield take(CHANGE_GROUP_INFO);
        console.log("watchChangeGroupInfo");
        yield call(changeGroupInfo, data);
    }
}

function *watchDeleteGroupUser() {
    while(true) {
        const data = yield take(DELETE_GROUP_USER);
        console.log("watchDeleteGroupUser");
        yield call(deleteGroupUser, data);
    }
}

function *watchGiveAdmin() {
    while(true) {
        const data = yield take(GIVE_ADMIN);
        console.log("watchGiveAdmin");
        yield call(giveAdmin, data);
    }
}

function *watchDeleteGroupDesign() {
    while(true) {
        const data = yield take(DELETE_GRUOP_DESIGN);
        console.log("watchDeleteGroupDesign");
        yield call(deleteGroupDesign, data);
    }
}

function *watchDeleteGroup() {
    while(true) {
        const data = yield take(DELETE_GROUP);
        console.log("watchDeleteGroup");
        yield call(deleteGroup, data);
    }
}



function *watchNewDesign() {
    while(true) {
        const data = yield take(NEW_DESIGN);
        console.log("watchNewDesign");
        yield call(newDesign, data);
    }
}

function *watchSaveDesign() {
    while(true) {
        const data = yield take(SAVE_DESIGN);
        console.log("watchSaveDesign");
        yield call(saveDesign, data);
    }
}

function *watchPostDesign() {
    while(true) {
        const data = yield take(POST_DESIGN);
        console.log("watchPostDesign");
        yield call(postDesign, data);
    }
}





// function *watchChangeBody() {
//     while(true) {
//         const data = yield take(CHANGE_BODY);
//         console.log("watchChangeBody");
//         yield call(changeBody, data);
//     }
// }

// function *watchChangeSleeve() {
//     while(true) {
//         const data = yield take(CHANGE_SLEEVE);
//         console.log("watchChangeSleeve");
//         yield call(changeSleeve, data);
//     }
// }

// function *watchChangeBanding() {
//     while(true) {
//         const data = yield take(CHANGE_BANDING);
//         console.log("watchChangeBanding");
//         yield call(changeBanding, data);
//     }
// }

// function *watchChangeStripe() {
//     while(true) {
//         const data = yield take(CHANGE_STRIPE);
//         console.log("watchChangeStripe");
//         yield call(changeStripe, data);
//     }
// }

// function *watchChangeButton() {
//     while(true) {
//         const data = yield take(CHANGE_BUTTON);
//         console.log("watchChangeButton");
//         yield call(changeButton, data);
//     }
// }




///// Page별 saga함수에서 쓸 saga함수 (그 외)
// signIn: 백엔드에 get을 날리는 함수
function *signIn(data) {
    const encodedData = window.btoa(data.username + ":" + data.password);
    try {
        yield call(xhr.get, auth_check_url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic '+ encodedData,
                Accept: 'application/json'
            },
            responseType: 'json'
        })
        console.log("Login Success without exception");
        localStorage.setItem("auth", encodedData);
        yield put(actions.changeUrl('/main/'));
    }
    catch(error) {
        alert("watch singIn error");
    }
}

// signUp: 백엔드 users POST를 날리는 함수
function *signUp(data) {
    try {
        yield call(xhr.post, fixed_url + 'users/', {
            headers: {
                "Content-Type": 'application/json',
                Accept: 'application/json'
            },
            contentType:'json',
            body: JSON.stringify({"username": data.username, "password": data.password})
        });
        console.log("post article succeed 1");
        localStorage.setItem("auth", window.btoa(data.username + ":" + data.password));
        yield put(actions.changeUrl('/main/'));
    }
    catch(error) {
        console.log(error)
        alert("backend singup post error");
    }

}



// 비밀번호 바꾼 걸 put 요청 보내는 함수
function *updatePW(profuser, newpw){
    const backPath = 'users/'+profuser+'/';
    try{
        yield call(xhr.send, fixed_url+backPath, {
            method: 'PUT',
            headers: {
                "Authorization": "Basic "+localStorage['auth'],
                "Content-Type": 'application/json',
                Accept: 'application/json',
            },
            responseType:'json',
            body: JSON.stringify({"username": profuser, "password": newpw})
        });
        console.log("put password succeed ");
        //auto sign out
        localStorage.removeItem('auth');
        yield put(actions.changeUrl('/main/'));
    }catch(error){
        alert("updatePW error");
        return;
    }
}
// profile을 수정한걸 post요청보내는 함수
function *updateIntro(profuser, myname, mybelong, myintro, removeImg, changeImg, img){
    const backPath = 'users/'+profuser+'/profile/';
    try {
        let form = new FormData();
        form.append('user', profuser);
        form.append('myname', myname);
        form.append('mybelong', mybelong);
        form.append('myintro', myintro);
        if(removeImg === true && changeImg === true && img !== null)
            form.append('myimage', img);
        else if(removeImg === true)
            form.append('myimage', null);
        yield call(xhr.send, fixed_url + backPath, {
            method: 'PUT',
            headers: {
                "Authorization": "Basic " + localStorage['auth'],
            },
            async: true,
            crossDomain: true,
            processData: false,
            contentType: false,
            mimeType: "multipart/form-data",
            body: form
        });
        console.log("put profile succeed");

        yield put(actions.changeUrl('/profile/'+profuser+'/'))
    } catch(error){

            console.log("change profile error");
            return ;

    }
}
function *escapeBook(profuser){
    const backPath = 'users/'+profuser+'/';
    try{
        yield call(xhr.send, fixed_url+backPath,{
            method : 'DELETE',
            headers:{
                'Authorization': 'Basic '+localStorage['auth'],
                Accept: 'application/json'
            },
            responseType: 'json',
        });
        console.log("delete account succeed!");
        localStorage.removeItem('auth');
        yield put(actions.changeUrl('/'));
    }catch(error){
        alert("delete account error");
        return ;

    }
}

// createGroup: 백엔드 groups에 POST를 날리는 함수
function *createGroup(data){
    const path = 'create_group/'
	try {
		yield call(xhr.post, fixed_url + path, {
            headers: {
                "Authorization": "Basic " + localStorage['auth'],
                "Content-Type": 'application/json',
                Accept: 'application/json'
            },
            contentType: 'json',
            body: JSON.stringify({"grouptype": data.grouptype.value, "groupname": data.groupname.value})
        });
        yield put(actions.changeUrl('/groups/'));
    } catch(error){
        if(error.statusCode === 409) {
            console.log("already existing name");
            alert("이미 있는 이름입니다")
            yield put(actions.changeUrl('/groups/'))
        }        
        else {
            console.log(error)
            alert("*createGroup error")
        }
    }
}

function *searchGroup(data){
    console.log("searchGroup", data.newList)
    let username = window.atob(localStorage.getItem("auth")).split(":")[0]
    let all_groups_data, my_groups_data;
                
    //all_groups data
    try{
        all_groups_data = yield call(xhr.get, fixed_url+'groups/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic '+localStorage['auth'],
                Accept: 'application/json'
            },
            responseType: 'json',
        });
        console.log("GET all groups data: ", all_groups_data.body)
    } catch(error){
        console.log(error)
        alert("all groups data error")
    }
    
    //my_groups data
    try{
        my_groups_data = yield call(xhr.get, fixed_url+'groups/'+username+'/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic '+localStorage['auth'],
                Accept: 'application/json'
            },
            responseType: 'json',
        });
        console.log("GET my groups data: ", my_groups_data.body)
    } catch(error){
        alert("my groups data error")    
    }
    
    yield put(actions.setState({
        authorization: window.atob(localStorage['auth']),
        all_groups: all_groups_data.body,
        my_groups: my_groups_data.body,
        filtered_groups: data.newList,
        load: 0,
        loading: true
    }));
    
}

function *joinGroup(data){
    console.log("joinGroup")
    const path = 'join_group/'+data.groupid+'/'
	try {
		yield call(xhr.get, fixed_url + path, {
            headers: {
                "Authorization": "Basic " + localStorage['auth'],
                "Content-Type": 'application/json',
                Accept: 'application/json'
            },
            contentType: 'json'
        });
        alert("SUCCESS")
        yield put(actions.changeUrl('group/' + data.groupid + '/'));
    } catch(error){
        console.log(error)
        alert("*joinGroup error")
    }
}

function *withdrawGroup(data){
    console.log("withdrawGroup")
    const path = 'groups/'+data.groupid+'/drop/'
    try {
        yield call(xhr.get, fixed_url + path, {
            headers: {
                "Authorization": "Basic " + localStorage['auth'],
                "Content-Type": 'application/json',
                Accept: 'application/json'
            },
            contentType: 'json'
        });
        alert("WITHDRAW SUCCESS")
        yield put(actions.changeUrl('groups/'));
    } catch(error) {
        console.log(error)
        alert("*withdrawGroup error")
    }
}

function *toGroupDetail(data){
    console.log("toGroupDetail")
    try {
        yield put(actions.changeUrl('group/' + data.groupid + '/'));
    } catch(error) {
        console.log(error)
        alert("*toGroupDetail error")
    }
}

function *toAdminGroup(data){
    console.log("toAdminGroup")
    try {
        yield put(actions.changeUrl('admin/' + data.groupid + '/'));
    } catch(error) {
        console.log(error)
        alert("*toGroupDetail error")
    }
}



function *toEditDesign(data) {
    console.log("toEditDesign")
    // const path = 'groups/like/' + data.designid + '/';
    try {
		// yield call(xhr.get, fixed_url + path, {
        //     headers: {
        //         "Authorization": "Basic " + localStorage['auth'],
        //         "Content-Type": 'application/json',
        //         Accept: 'application/json'
        //     },
        //     contentType: 'json'
        // });
        // yield put(actions.changeUrl(window.location.pathname));
    } catch(error){
        console.log(error)
        alert("*toEditDesign error")
    }
}


function *likeDesign(data) {
    console.log("likeDesign")
    const path = 'groups/like/' + data.designid + '/';
    try {
		yield call(xhr.get, fixed_url + path, {
            headers: {
                "Authorization": "Basic " + localStorage['auth'],
                "Content-Type": 'application/json',
                Accept: 'application/json'
            },
            contentType: 'json'
        });
        yield put(actions.changeUrl(window.location.pathname));
    } catch(error){
        console.log(error)
        alert("*liikeDesign error")
    }
}

function *unlikeDesign(data) {
    console.log("unlikeDesign")
    const path = 'groups/unlike/' + data.designid + '/';
    try {
        yield call(xhr.get, fixed_url + path, {
            headers: {
                "Authorization": "Basic " + localStorage['auth'],
                "Content-Type": 'application/json',
                Accept: 'application/json'
            },
            contentType: 'json'
        });
        yield put(actions.changeUrl(window.location.pathname));
    } catch(error){
        console.log(error)
        alert("*unliikeDesign error")
    }
}




function *changeGroupInfo(data) {
    console.log("chageGroupInfo")
    const backPath = 'groups/'+data.groupid+'/admin/';
    let form = new FormData();
    try{
        console.log("data.grouptype: ", data.grouptype)
        form.append('group_type', data.grouptype);
        form.append('group_name', data.groupname);
        console.log("form: ", form, data.grouptype, data.groupname)
        yield call(xhr.send, fixed_url+backPath, {
            method: 'PUT',
            headers: {
                "Authorization": "Basic "+localStorage['auth'],
            },
            async: true,
            crossDomain: true,
            processData: false,
            contentType: false,
            mimeType: "multipart/form-data",
            body: form
          });
        console.log("change groupinfo succeed ");
        yield put(actions.changeUrl('/admin/'+data.groupid+'/'));
    }catch(error){
        console.log(error)
        console.log("form: ", form['group_type'])
        alert("chage groupinfo error");
        return;
    }
}           

function *deleteGroupUser(data) {
    console.log("deleteGroupUser groupid: ", data.groupid, " userid: ", data.userid)
    const backPath = 'groups/'+data.groupid+'/members/'+data.userid+'/';
    try{
        yield call(xhr.send, fixed_url+backPath,{
            method : 'DELETE',
            headers:{
                'Authorization': 'Basic '+localStorage['auth'],
                Accept: 'application/json'
            },
            responseType: 'json',
        });
        console.log("delete user succeed!");
        alert("Delete Success!")
        yield put(actions.changeUrl('/admin/'+data.groupid+'/'));
    }catch(error){
        console.log(error)
        alert("delete user error");
        return ;
    }
}

function *giveAdmin(data) {
    console.log("giveAdmin groupid: ", data.groupid, " userid: ", data.userid)
    const backPath = 'groups/'+data.groupid+'/members/'+data.userid+'/';
    try {
        yield call(xhr.send, fixed_url+backPath, {
            method: 'PUT',
            headers: {
                "Authorization": "Basic "+localStorage['auth'],
                "Content-Type": 'application/json',
                Accept: 'application/json',
            },
            responseType:'json',
            // body: JSON.stringify({"username": profuser, "password": newpw})
        });
        console.log("give admin to userid: ", data.userid);
        yield put(actions.changeUrl(window.location.pathname));
    }catch(error){
        console.log(error)
        alert("giveAdmin error");
        return;
    }
}

function *deleteGroupDesign(data) {
    console.log("deleteGroupDesign groupid: ", data.groupid, " designid: ", data.designid)
    const backPath = 'groups/delete/'+data.designid+'/';
    try{
        yield call(xhr.get, fixed_url+backPath,{
            headers:{
                "Authorization": "Basic " + localStorage['auth'],
                "Content-Type": 'application/json',
                Accept: 'application/json'
            },
            responseType: 'json',
        });
        console.log("delete design succeed!");
        alert("Delete Success!")
        yield put(actions.changeUrl('/admin/'+data.groupid+'/'));
    }catch(error){
        console.log(error)
        alert("delete design error");
        return ;

    }
}

function *deleteGroup(data) {
    console.log("deleteGroup groupid: ", data.groupid)
    const backPath = 'groups/'+data.groupid+'/admin/';
    try{
        yield call(xhr.send, fixed_url+backPath,{
            method : 'DELETE',
            headers:{
                'Authorization': 'Basic '+localStorage['auth'],
                Accept: 'application/json'
            },
            responseType: 'json',
        });
        console.log("delete group succeed!");
        alert("Delete Success!")
        yield put(actions.changeUrl('/groups/'));
    }catch(error){
        console.log(error)
        alert("delete group error");
        return ;
    }
}



function *newDesign(data) {
    console.log("newDesign")
    const backPath = '';
    try {
        yield call(xhr.send, fixed_url+backPath,{
            method : 'DELETE',
            headers:{
                'Authorization': 'Basic '+localStorage['auth'],
                Accept: 'application/json'
            },
            responseType: 'json',
        });
        console.log("new design succeed!");
        yield put(actions.changeUrl('/main/'));
    }catch(error) {
        console.log(error);
        alert("new design error");
        return;
    }
}

function *saveDesign(data) {
    console.log("saveDesign designid: ", data.designid, " design: ", data.design, " text: ", data.text, " image: ", data.image)
    const backPath = '';
    try{
        yield call(xhr.send, fixed_url+backPath, {
            method: 'PUT',
            headers: {
                "Authorization": "Basic "+localStorage['auth'],
                "Content-Type": 'application/json',
                Accept: 'application/json',
            },
            responseType:'json',
            body: JSON.stringify({
                "id": data.designid,
                "design": {
                    "body": data.design["body"], 
                    "sleeve": data.design["sleeve"], 
                    "banding": data.design["banding"], 
                    "stripe": data.design["stripe"], 
                    "button": data.design["button"], 
                },
                "text": data.text,
                "image": {
                    "front": data.image["front"],
                    "back": data.image["back"]
                },
                "logo": {
                    "front": data.logo["front"],
                    "back": data.logo["back"]
                }
            })
        });
        console.log("save design succeed ");
        yield put(actions.changeUrl('/main/'));
    }catch(error){
        console.log(error)
        alert("save design error");
        return;
    }
}

function *postDesign(data) {
    console.log("postDesign designid: ", data.designid, " groupid: ", data.groupid, " design: ", data.design, " text: ", data.text)
    const backPath = 'groups/'+data.groupid+'/post/'+data.designid+'/';
    try{
        yield call(xhr.get, fixed_url+backPath,{
            headers:{
                "Authorization": "Basic " + localStorage['auth'],
                "Content-Type": 'application/json',
                Accept: 'application/json'
            },
            responseType: 'json',
        });
        console.log("post design succeed!");
        alert("POST Success!")
        yield put(actions.changeUrl('group/'+data.groupid+'/'));
    }catch(error){
        console.log(error)
        alert("post design error");
        return ;
    }
}


