import { RECEIVE_CURRENT_USER, RECEIVE_USERS } from '../actions/session_actions';

const usersReducer = (state={}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_CURRENT_USER: 
      const currentUserId = Object.keys(action.currentUser)[0];
      const currentUserData = Object.values(action.currentUser)[0];
      return Object.assign({}, state, {[currentUserId]: currentUserData});
    case RECEIVE_USERS:
      return action.users;
    default:
      return state;
  }
}

export default usersReducer;