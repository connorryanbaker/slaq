import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import AddChannelForm from './AddChannelForm';
import ChannelLi from './ChannelLi';

class ChannelsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    }
    // this.updateEdit = this.updateEdit.bind(this);
  }

  render() {
    const channelLis = this.props.channels.map((el, i) => {
      return <ChannelLi channel={el} key={i} currentUser={this.props.currentUser} />
    });

    return (
      <div className="sidebar-channels-wrapper">
        <div className="sidebar-channels-header">
          Channels
          </div>
        <div className="sidebar-channel-name">
          <ul className="channels-list">
            {channelLis}
          </ul>
          {/* <div>
            {this.state.edit ? <AddChannelForm updateEdit={this.updateEdit} /> : 
              <button className='edit-message-button' onClick={this.updateEdit}>Add Channel</button>}
          </div> */}
        </div>
      </div>
    )
  }
}

export default withRouter(ChannelsContainer);