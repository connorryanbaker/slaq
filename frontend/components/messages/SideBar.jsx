import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/session_actions';
import Channels from './ChannelsContainer';
import Dms from './DmsContainer';

class SideBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    debugger
    return(
      <div className="sidebar-container">
        <div className="sidebar-channelName-wrapper">
          <div className="channelName-top">
            <div>
              <div className="sidebar-main-header">slaqq<i className="fas fa-chevron-down"></i></div>
            </div>
            <i className="far fa-bell"></i>
          </div>
          <div className="sidebar-subtitle">
            <div className="sidebar-current-user">{this.props.currentUser.name}</div>
            <div onClick={this.props.logout} className="sidebar-sign-out">Sign Out</div>
          </div>
        </div>
        <div className='sidebar-jumpto-container'>
          <i className="fas fa-search"></i>
          Jump To...
        </div>
        <div className="all-threads"><i className="far fa-comments"></i>All Threads</div>
        <div className="sidebar-chats-wrapper">
          <Channels channels={this.props.channels} currentUser={this.props.currentUser} />
          <div className="sidebar-dms-wrapper">
            <Dms />
          </div>
        </div>
      </div>
    )
  }
}

const msp = state => ({
  currentUser: state.entities.users[state.session.currentUserId] ? state.entities.users[state.session.currentUserId] : "",
  channels: state.entities.channels ? Object.values(state.entities.channels) : []
})

const mdp = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(msp, mdp)(SideBar);