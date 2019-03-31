import React from 'react';
import ChatChannel from './ChatChannel';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../../actions/session_actions'

const greeting = (props) => {
  return (
    <div>
      <ChatChannel room_id={props.room_id} />
    </div>
  );
}

const msp = (state,ownProps) => ({
  currentUser: state.entities.users[state.session.currentUserId].name,
  room_id: ownProps.match.params.id
});

const mdp = dispatch => ({
  logout: () => dispatch(logout())
});

export default withRouter(connect(msp,mdp)(greeting));