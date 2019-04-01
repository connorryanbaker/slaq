import { RECEIVE_CHANNELS, RECEIVE_CHANNEL, REMOVE_CHANNEL } from '../actions/channel_actions';

const channelsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_CHANNELS: 
      return action.channels;
    case RECEIVE_CHANNEL:
      let newState = Object.assign({}, state, action.channel);
      return newState;
    case REMOVE_CHANNEL:
      newState = Object.assign({}, state);
      const channelId = Object.values(action.channel)[0].id;
      delete newState[channelId];
      return newState;
    default:
      return state;
  }
}

export default channelsReducer;