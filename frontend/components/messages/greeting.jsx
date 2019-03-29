import React from 'react';
import ChatChannel from './ChatChannel';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../../actions/session_actions'

const greeting = (props) => {
  return (
    <div>
      <div className="dummy-greeting">
        <h1>Hello, {props.currentUser}! You are logged in!</h1>
        <button onClick={props.logout}>Log Out!</button>
      </div>
      <ChatChannel />
    </div>
  );
}

const msp = state => ({
  currentUser: state.entities.users[state.session.currentUserId].name
});

const mdp = dispatch => ({
  logout: () => dispatch(logout())
});

export default withRouter(connect(msp,mdp)(greeting));