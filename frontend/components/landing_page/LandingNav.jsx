import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/session_actions';
import { connect } from 'react-redux';
class LandingNav extends React.Component {

  render() {
    const welcomeText = this.props.currentUser ? `Welcome, ${this.props.currentUser.name}!` : ""
    const logoutBtn = this.props.currentUser ? <button className="btn-purple workspaces-btn" onClick={this.props.logout}>Sign Out</button> : ""
    return (
      <nav className='landing-nav'>
        <div className='nav-left'>
          <div className='nav-left-1'>
            <a href='/'><img className='logo-main' src='/assets/Slack_Mark-198390069136bd1758672f5f615435c2a2acfddf3f8deee425d83a1b1367a781.svg' /></a>
            <h1>slaq</h1>
          </div>
          <div className='nav-left-2'>
            <p>Why?</p>
            <p>Solutions</p>
            <p>Pricing</p>
            <p>Resources</p>
            <p>{welcomeText}</p>
          </div>
        </div>
        <div className='nav-right'>
          <button className="btn-purple workspaces-btn">Your Workspaces</button>
        </div>
      </nav>
    );
  }
}

const msp = state => {
  const currentUser = state.session.currentUserId ? state.entities.users[state.session.currentUserId] : null
  return {
    currentUser
  }
}

const mdp = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(msp,null)(LandingNav);