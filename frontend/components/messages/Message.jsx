import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment'

const Message = (props) => {
  const time = new moment(props.message.updated_at); 
  const hour = time.hour() - 7;
  time.set({h: hour});
  return <li key={props.key} className="message-list-item">
    {props.lastUserId === props.message.user_id ? "" : <div className="msg-user-container"><img className="avatar-img" src={props.img_url} /><div className="name-time"><b>{props.username}</b> <span className="msg-user-time">{time.format('hh:mm A')}</span></div></div>}
          <div className="msg-content">{props.message.content}</div>
         </li>
}


const msp = (state,ownProps) => {
  return {
    username: state.entities.users[ownProps.user_id].name,
    img_url: state.entities.users[ownProps.user_id].avatar_url
  }
};

export default connect(msp, null)(Message);
