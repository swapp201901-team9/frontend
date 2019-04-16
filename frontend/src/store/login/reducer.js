import { initialState } from './selectors'
import * as ACTIONTYPES from "./actionTypes"

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case ACTIONTYPES.SUCCESS_LOGIN:
    const user = action.data
    // you can use sessionStorage instead of localStorage
    localStorage.setItem('user', JSON.stringify(action.data))
    return Object.assign({}, state, {
      isLoggedIn: true,
      user,
    })
  case ACTIONTYPES.LOGOUT:
    localStorage.removeItem('user')
    return Object.assign({}, state, {
      isLoggedIn: false,
      user: null,
    })
  default:
    return state
  }
}

export default loginReducer
