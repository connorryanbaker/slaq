import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteChannel } from '../../actions/channel_actions';

class ChannelLi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    }
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  toggleEdit() {
    this.setState({
      edit: !this.state.edit
    });
  }

  handleDelete() {
    this.props.deleteChannel(this.props.channel.id).then(() => {
      return this.props.history.push(`/messages/1`);
    });
  }

  render() {
    if (!this.props.channel) return null;
    const current = this.props.match.params.id == this.props.channel.id && this.props.match.path.match(/messages/);
    const markup = this.state.edit ? (<li className="channel-edit-li">
                                        <button className="cancel-edit-message channel-btn" onClick={this.toggleEdit}>Cancel</button>
                                        <button className="delete-message-button channel-btn" onClick={this.handleDelete}>Delete Channel</button>
                                      </li>)
                                    : (<li className={current ? "current-channel channel-li" : "channel-li"}>
                                        <Link to={`/messages/${this.props.channel.id}`} className={current ? "channel-link selected-link" : "channel-link"}>
                                          # {this.props.channel.name}
                                        </Link>
                                        {this.props.channel.creator_id == this.props.currentUser.id ?
                                          <i className="fas fa-chevron-down" onClick={this.toggleEdit}></i>
                                          : ""}
                                      </li>);
    return markup;
  }
}


const mdp = dispatch => ({
  deleteChannel: id => dispatch(deleteChannel(id))
});

export default withRouter(connect(null, mdp)(ChannelLi));