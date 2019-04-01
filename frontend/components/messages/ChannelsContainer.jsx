import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import AddChannelForm from './AddChannelForm';

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
      return (<li key={i} className={this.props.match.params.id == el.id ? "current-channel" : ""}>
                <Link to={`/messages/${el.id}`}>
                  {el.name}
                </Link>
              </li>);
    });

    return (
      <div className="sidebar-channels-wrapper">
        <div className="sidebar-channels-header">
          Channels
          </div>
        <div className="sidebar-channel-name">
          <ul>
            {channelLis}
          </ul>
          <div>
            {this.state.edit ? <AddChannelForm updateEdit={this.updateEdit} /> : 
              <button className='edit-message-button' onClick={this.updateEdit}>Add Channel</button>}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ChannelsContainer);