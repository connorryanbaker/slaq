import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});

export const logoutUser = () => ({
  type: LOGOUT_CURRENT_USER
});

export const signUp = user => dispatch => {
  return SessionApiUtil.createUser(user)
    .then(user => dispatch(receiveCurrentUser(user)))
    .catch(e => dispatch(receiveErrors(e.responseText)))
}

export const login = user => dispatch => {
  return SessionApiUtil.createSession(user)
    .then(user => dispatch(receiveCurrentUser(user)))
    .catch(e => dispatch(receiveErrors(e.responseText)))
}

export const logout = () => dispatch => {
  return SessionApiUtil.destroySession()
    .then(() => dispatch(logoutUser()))
    .catch(e => dispatch(receiveErrors(e.responseText)))
}