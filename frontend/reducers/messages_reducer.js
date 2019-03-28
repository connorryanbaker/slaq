import { RECEIVE_MESSAGES, RECEIVE_MESSAGE } from '../actions/message_actions';

const messagesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_MESSAGES:
      let newState = {};
      action.messages.forEach((msg) => newState[msg.id] = msg);
      return newState;
    case RECEIVE_MESSAGE:
      newState = Object.assign({}, state);
      newState[action.message.id] = action.message;
      return newState;
    default:
      return state;
  }
};

export default messagesReducer;