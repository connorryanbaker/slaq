import * as SessionApiUtil from '../util/session_api_util.js';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';
export const RECEIVE_USERS = 'RECEIVE_USERS';

export const receiveCurrentUser = currentUser => {
  return {
  type: RECEIVE_CURRENT_USER,
  currentUser
  }
};

export const receiveUsers = users => {
  return {
    type: RECEIVE_USERS,
    users
  }
};

export const receiveErrors = errors => {
  return {
  type: RECEIVE_ERRORS,
  errors: errors
  }
};

export const clearErrors = () => ({
  type: CLEAR_SESSION_ERRORS
});

export const logoutUser = () => ({
  type: LOGOUT_CURRENT_USER
});

export const fetchUsers = (channelId) => dispatch => {
  return SessionApiUtil.fetchUsers(channelId)
    .then(users => dispatch(receiveUsers(users)));
}

export const fetchDmUsers = dmId => dispatch => {
  return SessionApiUtil.fetchDmUsers(dmId)
    .then(users => dispatch(receiveUsers(users)))
}

export const signUp = user => dispatch => {
  return SessionApiUtil.createUser(user)
    .then((user) => {
      dispatch(receiveCurrentUser(user));
    },(e) => {
      dispatch(receiveErrors(e.responseJSON));
      throw 'err';
    });
}

export const login = user => dispatch => {
  return SessionApiUtil.createSession(user)
    .then((user) => {
      dispatch(receiveCurrentUser(user));
    }, (e) => {
      dispatch(receiveErrors([e.responseText]))
      throw 'err';
    });
}

export const loginGuest = guest => dispatch => {
  return SessionApiUtil.createSession(guest)
    .then((user) => {
      dispatch(receiveCurrentUser(user));
    });
}

export const logout = () => dispatch => {
  return SessionApiUtil.destroySession()
    .then(() => dispatch(logoutUser()))
    .catch(e => dispatch(receiveErrors(e.responseJSON)))
}