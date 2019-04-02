import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AddChannelForm from './AddChannelForm';
import { deleteChannel } from '../../actions/channel_actions';

class ChannelsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    }
    this.updateEdit = this.updateEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  updateEdit() {
    this.setState({
      edit: !this.state.edit
    });
  }

  handleDelete(id) {
    return () => {
      this.props.deleteChannel(id).then(() => {
        const redirectId = Object.values(this.props.channels)[0].id
        this.props.history.push(`/messages/${redirectId}`);
      })

    }
  }

  render() {
    const channelLis = this.props.channels.map((el, i) => {
      return (<li key={i} className={this.props.match.params.id == el.id ? "current-channel channel-li" : "channel-li"}>
        <Link to={`/messages/${el.id}`} className={this.props.match.params.id == el.id ? "channel-link selected-link" : "channel-link"}>
                  # {el.name}
                </Link>
                {el.creator_id == this.props.currentUser.id ? 
                  <button onClick={this.handleDelete(el.id)} className='delete-message-button'>Delete Channel</button>
                : ""}
              </li>);
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
              <button className='edit-message-button' onClick={this.updateEdit}>Add Channel</button>}
          </div>
        </div>
      </div>
    )
  }
}

const mdp = dispatch => ({
  deleteChannel: id => dispatch(deleteChannel(id))
});

export default withRouter(connect(null, mdp)(ChannelsContainer));