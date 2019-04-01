import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions'

class SideBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="sidebar-container">
        <div className="sidebar-channelName-wrapper">
          <div className="sidebar-main-header"><div>slaqq<img src="https://img.icons8.com/small/16/000000/expand-arrow.png"></img></div></div>
          <div className="sidebar-subtitle">
            <div className="sidebar-current-user">{this.props.currentUser.name}</div>
            <div onClick={this.props.logout} className="sidebar-sign-out">Sign Out</div>
          </div>
        </div>
        <div className="sidebar-chats-wrapper">
          <div className="sidebar-channels-wrapper">
            <div className="sidebar-channels-header">
              Channels
            </div>
            <div className="sidebar-channel-name current-channel"># main</div>
          </div>
          <div className="sidebar-dms-wrapper">
            <div className="sidebar-dms-header">
              Direct Messages
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const msp = state => ({
  currentUser: state.entities.users[state.session.currentUserId]
})

const mdp = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(msp, mdp)(SideBar);