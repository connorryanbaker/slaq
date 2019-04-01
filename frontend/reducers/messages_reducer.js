import { RECEIVE_MESSAGES, RECEIVE_MESSAGE, REMOVE_MESSAGE, CLEAR_MESSAGES } from '../actions/message_actions';

const messagesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_MESSAGES:
      debugger
      let newState = {};
      return action.messages;
    case RECEIVE_MESSAGE:
      newState = Object.assign({}, state);
      newState[action.message.id] = action.message;
      return newState;
    case REMOVE_MESSAGE:
      newState = Object.assign({}, state);
      delete newState[action.message.id];
      return newState;
    case CLEAR_MESSAGES:
      return null;
    default:
      return state;
  }
};

export default messagesReducer;