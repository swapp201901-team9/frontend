import { CREATE_GROUP, SEARCH_GROUP, JOIN_GROUP, TO_GROUP_DETAIL } from './types.js'

export const showNavBar = () => {
  return{
    type: 'NAV_BAR',
  }
}

// When the user inputs username, password and clicks the 'Sign In' button, this action is invoked and Saga requests GET to 'auth' in backend page.
export const signIn = (username, password) => {
    return {
        type: 'SIGN_IN',
        username,
        password
    }
}

export const SIGN_IN = 'SIGN_IN'

// When the user is authenticated and succeeds to sign in, this action is invoked by Saga and reducer stores the user's authorization to its state.
export const authenticate = (auth) => {
    return {
        type: 'AUTHENTICATE',
        auth
    }
}

// When the user enters username, password and pwdverification and clicks the '회원가입', this action is invocked and Saga requests POST to 'User List' in backend page.
export const postSignUp = (username, password) => {
    return {
        type: 'POST_SIGN_UP',
        username,
        password
    }
}
//When the user clicks the 'Sign Out' button, this action is invoked
export const signOut = () => {
    return {
       type: 'SIGN_OUT',
    }
}
export const SIGN_OUT = 'SIGN_OUT'


// Move to another page
export const changeUrl = (pathname) => {
    return {
        type: 'CHANGE_URL',
        path: pathname
    }
}


export const setState = (state) => {
    return {
        type: 'SET_STATE',
        state: state
    }
}



export const gotoSignUpPage = () => {
    return {
        type: 'GOTO_SIGN_UP',
    }
}



export const toProfile = (profile_user) =>{
    return {
        type: 'TO_PROFILE',
        profuser: profile_user,
    }
}
export const toChangeIntro = (user,name,belong,intro, removeImg, changeImg, img)=>{
    return {
         type: 'TO_INTRO_CHANGE',
         user: user,
         myname: name,
         mybelong: belong,
         myintro: intro,
         removeImg: removeImg,
         changeImg: changeImg,
         img: img
    }
}
export const toChangePW = (profile_user, oldpw, newpw) => {
    return {
        type: 'TO_PW_CHANGE',
        profuser: profile_user,
        oldpw : oldpw,
        newpw : newpw,
    }
}
export const toEscape = (profile_user) => {
    return {
        type: 'TO_ESCAPE',
        profuser: profile_user,
    }
}

//GroupPage Actions
export const createGroup = (grouptype, groupname) => {
	return {
		type: CREATE_GROUP,
		grouptype: grouptype,
		groupname: groupname,
	}
}

export const searchGroup = (groupname) => {
	return {
		type: SEARCH_GROUP,
		groupname: groupname,
	}
}

export const joinGroup = (groupid) => {
	return {
		type: JOIN_GROUP,
		groupid: groupid,
	}
}

export const toGroupDetail = (groupid) => {
	return {
		type: TO_GROUP_DETAIL,
		groupid: groupid,
	}
}
