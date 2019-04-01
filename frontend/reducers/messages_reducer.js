import { RECEIVE_MESSAGES, RECEIVE_MESSAGE, REMOVE_MESSAGE } from '../actions/message_actions';

const messagesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_MESSAGES:
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
    default:
      return state;
  }
};

export default messagesReducer;