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
    this.updateEdit = this.updateEdit.bind(this);
  }

  updateEdit() {
    this.setState({
      edit: !this.state.edit
    });
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
          <div>
            {this.state.edit ? <AddChannelForm updateEdit={this.updateEdit} /> : 
              <div className="add-channel" onClick={this.updateEdit}><i className="fas fa-plus"></i>Add Channel</div>}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ChannelsContainer);