import { RECEIVE_CHANNELS, RECEIVE_CHANNEL } from '../actions/channel_actions';

const channelsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_CHANNELS: 
      return action.channels;
    case RECEIVE_CHANNEL:
      // REVIEW THIS
      let newState = Object.assign({}, state, action.channel);
      return newState;
    default:
      return state;
  }
}

export default channelsReducer;