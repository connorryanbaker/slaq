import React from 'react';

const MessageHeader = (props) => {
  return (
    <div className="message-user-img-row">
      {props.img_url.length > 0 ? <img className="avatar-img" src={props.img_url} /> : ""}
      <div className="msg-user-container">
        <div className="name-time"><b className="msg-username">{props.username}</b>
          <span className="msg-user-time">{props.message.time}</span>
        </div>
      </div>
    </div>
  )
}

export default MessageHeader;