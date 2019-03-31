import React from 'react';
import { connect } from 'react-redux';
import { updateMessage } from '../../actions/message_actions';
import MessageHeader from './MessageHeader';
import MessageContent from './MessageContent';
import EditMessage from './EditMessage';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.message,
      hover: false,
      edit: false
    }
    this.hover = this.hover.bind(this);
    this.noHover = this.noHover.bind(this);
    this.updateEdit = this.updateEdit.bind(this);
    this.makeUpdate = this.makeUpdate.bind(this);
  }

  updateEdit() {
    this.setState({
      edit: !this.state.edit
    });
  }

  hover() {
    if (this.props.user_id !== this.props.currentUserId) return null;
    this.setState({
      hover: true
    });
  }

  noHover() {
    this.setState({
      hover: false
    })
  }

  makeUpdate(msg) {
    if (msg.content.length > 0) {
      return () => {
        const updated = { message: msg };
        this.props.updateMessage(updated).then(() => {
          this.updateEdit();
        });
      }
    }
  }

  render() {
    return <li key={this.props.key} className={this.state.edit ? "message-list-item edit-msg" : "message-list-item"} onMouseOver={this.hover} onMouseLeave={this.noHover}>
      {this.props.lastUserId === this.props.message.user_id ? "" : <MessageHeader img_url={this.props.img_url} 
                                                                        message={this.props.message} 
                                                                        username={this.props.username} />}
      
      {this.state.edit ? <EditMessage message={this.props.message}
                                      updateEdit={this.updateEdit}
                                      makeUpdate={this.makeUpdate} />
                        : <MessageContent message={this.props.message} 
                                          hover={this.state.hover} 
                                          edit={this.updateEdit} />}
    </li>
  }
}

const msp = (state, ownProps) => {
  return {
    username: state.entities.users[ownProps.user_id].name,
    img_url: state.entities.users[ownProps.user_id].avatar_url,
    currentUserId: state.session.currentUserId
  }
};

const mdp = dispatch => ({
  updateMessage: msg => dispatch(updateMessage(msg))
});

export default connect(msp, mdp)(Message);
