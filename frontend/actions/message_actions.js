import * as MessageApiUtil from '../util/message_util';

export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const REMOVE_MESSAGE = "REMOVE_MESSAGE"

export const receiveMessages = messages => ({
  type: RECEIVE_MESSAGES,
  messages
});

export const receiveMessage = message => ({
  type: RECEIVE_MESSAGE,
  message
});

export const removeMessage = message => ({
  type: REMOVE_MESSAGE,
  message 
})

export const fetchMessages = () => dispatch => {
  return MessageApiUtil.fetchMessages()
    .then(msgs => dispatch(receiveMessages(msgs)));
}

export const updateMessage = msg => dispatch => {
  return MessageApiUtil.updateMessage(msg)
    .then(msg => dispatch(receiveMessage(msg)));
}

export const deleteMessage = id => dispatch => {
  return MessageApiUtil.deleteMessage(id)
    .then(msg => dispatch(removeMessage(msg)));
}