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
          <div className="sidebar-main-header">slaqq<img src="https://img.icons8.com/small/16/000000/expand-arrow.png"></img></div>
          <div className="sidebar-subtitle">
            <div className="sidebar-current-user">{this.props.currentUser.name}</div>
            <div onClick={this.props.logout} className="sidebar-sign-out">Sign Out</div>
          </div>
        </div>
        <div className="sidebar-chats-wrapper">
          <Channels channels={this.props.channels} />
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
  currentUser: state.entities.users[state.session.currentUserId] ? state.entities.users[state.session.currentUserId] : "",
  channels: state.entities.channels ? Object.values(state.entities.channels) : []
})

const mdp = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(msp, mdp)(SideBar);