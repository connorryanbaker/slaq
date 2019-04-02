import { RECEIVE_MESSAGES, RECEIVE_MESSAGE, REMOVE_MESSAGE, UPDATE_MESSAGE, RECEIVE_NEXT_PAGE } from '../actions/message_actions';
import { REMOVE_CHANNEL } from '../actions/channel_actions';

const messagesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_MESSAGES:
      let newState = {};
      return action.messages;
    case RECEIVE_NEXT_PAGE:
      debugger
      return Object.assign({},state,action.messages);
    case RECEIVE_MESSAGE:
      newState = Object.assign({}, state);
      newState[action.message.id] = action.message;
      return newState;
    case REMOVE_MESSAGE:
      newState = Object.assign({}, state);
      delete newState[action.message.id];
      return newState;
    case UPDATE_MESSAGE:
      newState = Object.assign({}, state);
      newState[action.message.id] = action.message;
      debugger
      return newState;
    case REMOVE_CHANNEL:
      newState = Object.assign({}, state);
      Object.values(action.channel)[0].messages.forEach(m => {
        delete newState[m];
      });
      return newState;
    default:
      return state;
  }
};

export default messagesReducer;