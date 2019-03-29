import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

const Message = (props) => {
  return <li key={props.key} className="message-list-item">
    {props.lastUserId === props.message.user_id ? "" : (<div className="message-user-img-row">
                                                          <img className="avatar-img" src={props.img_url} />
                                                            <div className="msg-user-container">
                                                              <div className="name-time"><b className="msg-username">{props.username}</b> 
                                                              <span className="msg-user-time">{props.message.time}</span>
                                                            </div>
                                                          </div>
                                                        </div>)}
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
