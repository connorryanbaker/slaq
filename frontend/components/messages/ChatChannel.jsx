import React from 'react';
import MessageForm from './MessageForm';
import Message from './Message';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUsers } from '../../actions/session_actions';
import { receiveMessages, receiveMessage, fetchMessages, clearMessages } from '../../actions/message_actions';
import { clearUsers } from '../../actions/user_actions';
import { fetchChannels } from '../../actions/channel_actions';
import SideBar from './SideBar';
import TopNavBar from './TopNavBar';


class ChatChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: null, loaded: false }
    this.bottom = React.createRef();
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.fetchChannelData = this.fetchChannelData.bind(this);
  }
  
  componentDidMount() {
    this.state.messages = null;
    App.cable.subscriptions.create(
      { channel: 'ChatChannel', id: this.props.channelId },
      {
        received: data => {
          switch(data.type) {
            case "msg": 
            const { user_id, content, updated_at } = data.message;
            const msg = { user_id, content, updated_at };
            this.setState({
              messages: this.state.messages.concat(msg)
            });
            this.props.receiveMessage(data.message);
            break
          }
        },
        speak: function(data) {
          return this.perform("speak", data);
        },
        load: function() {
          return this.perform("load")
        }
      }
      )
    return this.fetchChannelData();
  }
    
  componentDidUpdate(prevProps) {
    if (!this.state.loaded) {
      return null;
    }
    if (prevProps.match.params.id != this.props.match.params.id) {
      this.state.messages = null;
      this.state.transition = true;
      this.props.clearMessages();
      this.props.clearUsers(this.props.currentUser);
      this.fetchChannelData();
     ;
    } else if (prevProps != this.props && this.props.messages) {
      this.setState({
        messages: Object.values(this.props.messages)
      });
    }
  }

  fetchChannelData() {
    return this.props.fetchUsers(this.props.channelId)
      .then(() => {
        this.props.fetchMessages(this.props.channelId);
      }).then(() => {
        this.props.fetchChannels()
      }).then(() => {
        this.setState({
        messages: Object.values(this.props.messages),
        loaded: true})
      }, () => this.scrollToBottom());
  }

  scrollToBottom() {
    if (this.state.loaded) {
      this.bottom.scrollIntoView({ behavior: "smooth" });
    }
  }

  render() {
    if (!this.state.messages) return null;
    if (!this.state.loaded) return <h1>HOLA CUNAO!</h1>
    const msgs = this.state.messages.map((msg, i) => {
      let lastUserId = i === 0 ? null : this.state.messages[i - 1].user_id;
      return (<div key={i} >
              <Message message={msg} user_id={msg.user_id} key={i} lastUserId={lastUserId} />
            </div>);
    });
    return (
      <div>
        <SideBar currentUser={this.props.currentUser} />
        <TopNavBar />
        <ul className="messages-list">
          {msgs}
          <div ref={(e) => { this.bottom = e }} />
        </ul>
        <MessageForm user_id={this.props.currentUser.id}/>
        <div ref={this.bottom}/>
      </div>
    );
  }
}

const msp = (state, ownProps) => {
  return {
  channelId: ownProps.match.params.id,
  messages: state.entities.messages,
  currentUser: state.entities.users[state.session.currentUserId]
  }
};

const mdp = dispatch => ({
  fetchUsers: channelId => dispatch(fetchUsers(channelId)),
  receiveMessage: msg => dispatch(receiveMessage(msg)),
  receiveMessages: msgs => dispatch(receiveMessages(msgs)),
  fetchMessages: channelId => dispatch(fetchMessages(channelId)),
  clearMessages: () => dispatch(clearMessages()),
  clearUsers: currentUser => dispatch(clearUsers(currentUser)),
  fetchChannels: () => dispatch(fetchChannels())
});

export default withRouter(connect(msp, mdp)(ChatChannel));