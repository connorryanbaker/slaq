import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment'

const Message = (props) => {
  const updatedAt = props.message.updated_at.split("T")[1].slice(0, 2);
  const time = new moment(props.message.updated_at).format('hh:mm') + (parseInt(updatedAt - 4) > 11 ? " PM" : " AM");

  return <li key={props.key}>
          {props.lastUserId === props.message.user_id ? "" : <div className="msg-user-time"><b>{props.username}</b> <span>{time}</span></div>}
          <div className="msg-content">{props.message.content}</div>
         </li>
}


const msp = (state,ownProps) => {
  return {
    username: state.entities.users[ownProps.user_id].name
  }
};

export default connect(msp, null)(Message);