import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/session_actions';
import { connect } from 'react-redux';
class LandingNav extends React.Component {

  render() {
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
          </div>
        </div>
        <div className='nav-right'>
          <Link to={'/login'} className='nav-signin-link'>Sign in</Link>
          <Link to={'/signup'}><button className="btn-purple nav-btn">GET STARTED</button></Link>
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