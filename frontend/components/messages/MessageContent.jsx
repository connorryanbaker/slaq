import React from 'react';
import EditButton from './EditButton';

const MessageContent = (props) => {
  return (
    <div className="msg-content" >
      {props.message.content}
      {props.hover ? <EditButton klass={"edit-message"} onClick={props.edit} /> : ""}
    </div>
  );
}


export default MessageContent;