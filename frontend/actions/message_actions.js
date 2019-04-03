import * as MessageApiUtil from '../util/message_util.js';

export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const REMOVE_MESSAGE = "REMOVE_MESSAGE";
export const UPDATE_MESSAGE = "UPDATE_MESSAGE";
export const RECEIVE_NEXT_PAGE = "RECEIVE_NEXT_PAGE";

export const receiveMessages = messages => ({
  type: RECEIVE_MESSAGES,
  messages
});

export const receiveMessage = message => {
  return {
  type: RECEIVE_MESSAGE,
  message
  }
};

export const updateReduxMessage = message => ({
  type: UPDATE_MESSAGE,
  message
});

export const removeMessage = message => ({
  type: REMOVE_MESSAGE,
  message 
})

export const receiveNextPage = messages => ({
  type: RECEIVE_NEXT_PAGE,
  messages
});

export const fetchMessages = channelId => dispatch => {
  return MessageApiUtil.fetchMessages(channelId)
    .then(msgs => {
      return dispatch(receiveMessages(msgs))
    });
}

export const fetchDmMessages = dmId => dispatch => {
  return MessageApiUtil.fetchDmMessages(dmId)
    .then(msgs => dispatch(receiveMessages(msgs)))
}

export const fetchPaginatedMessages = (channelId, page) => dispatch => {
  return MessageApiUtil.fetchPaginatedMessages(channelId,page)
    .then(msgs => {
      return dispatch(receiveNextPage(msgs))
    });
}

export const fetchPaginatedDmMessages = (dmId, page) => dispatch => {
  return MessageApiUtil.fetchPaginatedDmMessages(dmId, page)
    .then(msgs => dispatch(receiveNextPage(msgs)))
}

export const updateMessage = msg => dispatch => {
  return MessageApiUtil.updateMessage(msg)
    .then(msg => dispatch(receiveMessage(msg)));
}

export const deleteMessage = id => dispatch => {
  return MessageApiUtil.deleteMessage(id)
    .then(msg => dispatch(removeMessage(msg)));
}