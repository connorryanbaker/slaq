import React from 'react';
import { connect } from 'react-redux';

const Message = (props) => {
  return <li><b>{props.username}</b> - {props.message.content} - {props.message.updated_at}</li>
}




const msp = (state,ownProps) => {
  return {
    username: state.entities.users[ownProps.user_id].name
  }
};

export default connect(msp, null)(Message);