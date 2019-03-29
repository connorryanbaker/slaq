import React from 'react';
import { connect } from 'react-redux';

class SideBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="sidebar-container">
        <div className="sidebar-channelName-wrapper">
          <div className="sidebar-main-header">slaqq<img src="https://img.icons8.com/small/16/000000/expand-arrow.png"></img></div>
          <div className="sidebar-current-user">{this.props.currentUser.name}</div>
        </div>
        <div className="sidebar-chats-wrapper">
          <div className="sidebar-channels-wrapper">
            <div className="sidebar-channels-header">
              Channels
            </div>
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

export default connect(msp, null)(SideBar);