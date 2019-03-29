import React from 'react';
import { connect } from 'react-redux';
import { updateMessage } from '../../actions/message_actions';
import MessageHeader from './MessageHeader';
import EditButton from './EditButton';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.message,
      hover: false
    }
    this.hover = this.hover.bind(this);
    this.noHover = this.noHover.bind(this);

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

  render() {
    return <li key={this.props.key} className="message-list-item" onMouseOver={this.hover} onMouseLeave={this.noHover}>
      {this.props.lastUserId === this.props.message.user_id ? "" : <MessageHeader img_url={this.props.img_url} 
                                                                        message={this.props.message} 
                                                                        username={this.props.username} />}
      <div className="msg-content" >
        {this.state.message.content}
        {this.state.hover ? <EditButton klass={"edit-message"} /> : ""}
      </div>
    </li>
  }
}

const msp = (state, ownProps) => {
  debugger
  console.log(state.entities.users[ownProps.user_id])
  console.log(state.entities.users[ownProps.user_id].name)
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
