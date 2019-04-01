import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/session_actions';
import Channels from './ChannelsContainer';

class SideBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const channels = this.props.channels.map((el, i) => {
      return <li key={i}><Link to={`/messages/${el.id}`}>{el.name}</Link></li>
    })
    return(
      <div className="sidebar-container">
        <div className="sidebar-channelName-wrapper">
          <div className="sidebar-main-header">slaqq<i class="fas fa-chevron-down"></i><i class="far fa-bell"></i></div>
          <div className="sidebar-subtitle">
            <div className="sidebar-current-user">{this.props.currentUser.name}</div>
            <div onClick={this.props.logout} className="sidebar-sign-out">Sign Out</div>
          </div>
        </div>
        <div className='sidebar-jumpto-container'>
          <i class="fas fa-search"></i>
          Jump To
        </div>
        <div className="all-threads"><i class="far fa-comments"></i>All Threads</div>
        <div className="sidebar-chats-wrapper">
          <Channels channels={this.props.channels} currentUser={this.props.currentUser} />
          <div className="sidebar-dms-wrapper">
            <div className="sidebar-dms-header">
              Direct Messages <i class="fas fa-plus-circle"></i>
            </div>
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