import * as ACTIONTYPES from "./actionTypes"

export const fetchLogin = (username, password) => ({
  type: ACTIONTYPES.FETCH_LOGIN,
  data: { username, password },
})

export const updateLoginState = data => ({ type: ACTIONTYPES.SUCCESS_LOGIN, data })

export const logout = () => ({ type: ACTIONTYPES.LOGOUT })
