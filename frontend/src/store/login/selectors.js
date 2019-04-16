export const initialState = {
  isLoggedIn: localStorage.hasOwnProperty('user') ? true : false,
  user: JSON.parse(localStorage.getItem('user')),
}
