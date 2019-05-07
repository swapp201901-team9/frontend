import { put, take, call, /*fork, */select, spawn } from 'redux-saga/effects'
import * as actions from './../../actions'

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
    switch(window.location.pathname) {
        case '/':
            yield spawn(mainPageSaga);
            break;
        case '/log_in/':
            yield spawn(loginPageSaga);
            break;
        case '/main/':
            yield spawn(mainPageSaga);
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

				//SA TODO: adding group url 
                //default:
                    // console.log("default state");
                    // alert("없는 장소");
                    // if(localStorage.getItem("auth") === null) {
                    //     localStorage.removeItem('parent');
                    //     yield put(actions.changeUrl('/'));
                    // } else {
                    //     localStorage.removeItem('parent');
                    //     yield put(actions.changeUrl('/main/'));
                    // }
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
//   (ex. 메인페이지 추가 - case '/main/': yield spawn(timeLinePageSaga); break;)
// 4. 페이지 이동은 yield put(actions.changeUrl('/target_path/'))를 이용하시면 됩니다.
//////////////////////////////////////////////////
function *loginPageSaga() {
    console.log("Login Page");
    yield spawn(watchLoginState);
    yield spawn(watchSignIn);
    yield spawn(watchSignUp);
}

function *signUpPageSaga() {
    console.log("Sign Up Page")
    yield spawn(watchLoginState);
    yield spawn(watchPostSignUp);
}

function *mainPageSaga() {
    console.log("Main Page");
    yield spawn(watchLoginState);

    yield spawn(watchSignOut);
    yield spawn(watchGoToMain);

    yield spawn(watchToProfile);

}


function *profilePageSaga() {
    console.log("[ProfilePageSaga]");
    yield spawn(watchLoginState);
    yield spawn(watchSignOut);
    yield spawn(watchGoToMain);
    yield spawn(watchPWChange);
    yield spawn(watchIntroChange);
    yield spawn(watchEscape);

}

function *groupPageSaga() {
	console.log("GroupPageSaga");
	yield spawn(watchLoginState);
	yield spawn(watchSignOut);
	yield spawn(watchGoToMain);

	//SA TODO: 더 추가될 가능성 있음
	yield spawn(watchCreateGroup);
	yield spawn(watchSearchGroup);
	yield spawn(watchJoinGroup);
	yield spawn(watchGoToGroupDetail);
}



///// Page별 saga함수에서 쓸 saga함수들 (watch 함수 편)
// watchLoginState: 브라우저에서의 로그인 여부 확인 및 state 업데이트
// <<주의>> 새로운 Page를 추가할 경우 PageSaga함수에 반드시 추가할 것
// <<주의>> 새로운 state를 추가할 경우 try-catch문을 이용해 정보를 받아온 후 스테이트에 업데이트 해야 함
function *watchLoginState() {
    if(window.location.pathname[window.location.pathname.length-1] !== '/') {
        yield put(actions.changeUrl(window.location.pathname+'/'));
        return;
    }
    if(window.location.pathname === '/' || window.location.pathname === '/sign_up/') {
        if(localStorage.getItem("auth") !== null) {
            localStorage.removeItem('parent');
            yield put(actions.changeUrl('/main/'));
        }
    }
    else {
        if(localStorage.getItem("auth") === null) {
            localStorage.removeItem('parent');
            yield put(actions.changeUrl('/'));
        }
        else {
            const path = window.location.pathname;
            let data, parent_data;
            if(path === '/main/') { // 여기가 바로 하드코딩된 부분입니다 여러분!
                localStorage.removeItem('parent');
                try {

                    console.log('Get data without exception');
                }
                catch(error) {
                    alert("main error");
                }
                yield put(actions.setState({
                    authorization: window.atob(localStorage['auth']),

                    loading: true,

                    load : 0
                    //TODO 이후 state 추가 시 여기에 스테이트 업데이트 추가
                }));
            }
            else { // username또는 id를 기준으로 backend에 겟을 날리는 경우
                const username = path.split("/")[2];
                const id = path.split("/")[2];//그냥..
                let profile_data = null;


                if (username === undefined || username === '') {
                    console.log("404 not found");
                    alert("없는 장소");
                    if(localStorage.getItem("auth") === null) {
                        localStorage.removeItem('parent');
                        yield put(actions.changeUrl('/'));
                    } else {
                        localStorage.removeItem('parent');
                        yield put(actions.changeUrl('/main/'));
                    }
                    return;
                }
                else if(path.split("/")[1] === 'profile'){
                    //프로필 정보를 get하는 부분
                    console.log("get profile details...");
                    try{
                        profile_data = yield call(xhr.get, fixed_url+'users/'+username+'/profile/',{
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Basic '+localStorage['auth'],
                            Accept: 'application/json'
                            },
                            responseType: 'json'
                         });
                         console.log('Get data without exception');
                    }catch(error){
                        alert("profile error");
                    }
                    yield put(actions.setState({
                        authorization: window.atob(localStorage['auth']),

                        profile_user: profile_data.body,
                        loading: true,
                        load: 0,

                    }));
                }
                else {
                    // 스테이트의 articles에 들어갈 내용을 받는 try-catch 문
                    try {
                        localStorage.setItem('parent', id);
                        data = yield call(xhr.get, fixed_url+'article/'+id+'/total/', {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Basic '+ localStorage['auth'],
                            Accept: 'application/json'
                            },
                            responseType: 'json'
                        });
                    }
                    catch(error) {
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
                    }
                    catch(error) {
                        alert("get parent article in state");
                        return;
                    }
                    //TODO 이후 state에 새로운 element를 추가할 경우 이 부분에 try-catch를 추가하면 됩니다
                    yield put(actions.setState({
                        authorization: window.atob(localStorage['auth']),

                        profile_user: profile_data !== null ? profile_data.body : null,
                        loading: true,
                        load: 0,
                        //TODO 이후 state 추가 시 여기에 스테이트 업데이트 추가
                    }));
                }
            }
        }
    }
    console.log(yield select());
    console.log(localStorage['parent']);
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
        localStorage.removeItem('parent');
        yield put(actions.changeUrl('/'));
    }
}

// watchPostSignUp: 회원가입 페이지에서 가입 버튼 클릭 관찰
function *watchPostSignUp() {
    while(true) {

        const data = yield take('POST_SIGN_UP');
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
		const data = yield take('CREATE_GROUP');
		yield call(createGroup, data);
		//SA TODO: groupname은 한글일텐데 url에 넣어도 되는가?
		yield put(actions.changeUrl('/group/' + data.groupname + '/')); 
	}
}

//watchSearchGroup: GroupPage에서 그룹 검색 버튼 클릭 관찰
function *watchSearchGroup() {
	while(true) {
		const data = yield take('SEARCH_GROUP');
		yield call(searchGroup, data);
		//SA TODO: 검색 결과로 리다이렉트??
	}
}
	
//watchJoinGroup: GroupPage에서 그룹 가입 버튼 클릭 관찰
function *watchJoinGroup() {
	while(true) {
		const data = yield take('JOIN_GROUP');
		yield call(joinGroup, data);
		//SA TODO: 가입 그룹 detail 페이지로 리다이렉트??
	}
}

//watchGoToGroupDetail: GroupPage 혹은 MainPage에서 MyGroupList의 그룹 클릭 관착 및 리다이렉트(클릭한 그룹 detail 페이지로)
function *watchGoToGroupDetail() {
	while(true) {
		const data = yield take('TO_GROUP_DETAIL');
		yield call(toGroupDetail, data);
		yield put(actions.changeUrl('/group/' + data.groupname + '/'));
	}
}




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
        yield put(actions.changeUrl('/main/'));
    }catch(error){

        alert("delete account error");
        return ;

    }
}

//SA TODO

// createGroup: 백엔드 groups에 POST를 날리는 함수
function *createGroup(data){
/*
TODO: not yet implemented
	try {
		yield call(xhr.post, fixed_url + 'groups/', {
*/
}

function *searchGroup(){
}

function *joinGroup(){

}

function *toGroupDetail(){
}

