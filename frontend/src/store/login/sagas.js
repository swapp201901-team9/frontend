import { takeEvery, all, take, put, call, fork } from 'redux-saga/effects'
import api from 'services/api'
import * as actions from '../actions'
import * as ACTIONTYPES from "./actionTypes"

export function* loginAsync({data}) {
  try {
    const username = data.username;
    const response = yield call(api.post, "http://localhost:8000/users/login/", data);
    yield put(actions.updateLoginState({username, ...response}))
  } catch (e) {
    console.error(e)
  }
}

export function* watchLogin() {
  yield takeEvery(ACTIONTYPES.FETCH_LOGIN, loginAsync);
}

export default function* () {
  yield fork(watchLogin)
}
