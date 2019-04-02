import React from 'react';
import { createChannel } from '../../actions/channel_actions';
import { connect } from 'react-redux';

class AddChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return (e) => {
      this.setState({
        [field]: e.target.value
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.input.length > 0) {
      this.props.createChannel(this.state.input)
        .then(channel => {
          this.props.updateEdit();
          this.props.history.push(`/messages/${channel.id}`);
        });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="add-channel-form">
        <input type="text"
               onChange={this.update('input')}
               value={this.state.input}
               className="add-channel-input"
               placeholder="New channel name..." />
        <div className="channel-edit-li">
          <input type="submit" value="Add Channel" className='edit-message-button channel-btn'/><button className='cancel-edit-message channel-btn' onClick={this.props.updateEdit}>Cancel</button>
        </div>
      </form>
    )
  }
  
}

const mdp = dispatch => ({
  createChannel: name => dispatch(createChannel(name))
});

export default connect(null, mdp)(AddChannelForm);