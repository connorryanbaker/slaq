import { combineReducers } from 'redux';
import users from './users_reducer';
import messages from './messages_reducer';
import channels from './channels_reducer';
import dms from './dms_reducer';

export default combineReducers({
  users,
  messages,
  channels,
  dms
});