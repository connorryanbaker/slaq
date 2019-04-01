import * as ChannelApiUtil from '../util/channel_util.js';

export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";

export const receiveChannels = channels => ({
  type: RECEIVE_CHANNELS,
  channels
});

export const receiveChannel = channel => ({
  type: RECEIVE_CHANNEL,
  channel
});


export const fetchChannels = () => dispatch => {
  return ChannelApiUtil.fetchChannels()
    .then(channels => dispatch(receiveChannels(channels)));
}

