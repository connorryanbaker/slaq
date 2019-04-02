import React from 'react';
import MessageForm from './MessageForm';
import Message from './Message';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUsers } from '../../actions/session_actions';
import { receiveMessages, receiveMessage, 
         fetchMessages, updateReduxMessage, removeMessage } from '../../actions/message_actions';
import { fetchChannels } from '../../actions/channel_actions';
import SideBar from './SideBar';
import TopNavBar from './TopNavBar';


class ChatChannel extends React.Component {
  constructor(props) {
    super(props);
    this.bottom = React.createRef();
    this.configureChannelSubscription = this.configureChannelSubscription.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.fetchChannelData = this.fetchChannelData.bind(this);
  }

  configureChannelSubscription() {
    App.cable.subscriptions.create(
      { channel: 'ChatChannel', id: this.props.channelId },
      {
        received: data => {
          debugger
          switch(data.type) {
            case "msg": 
              const { user_id, content, updated_at } = data.message;
              const msg = { user_id, content, updated_at };
              this.props.receiveMessage(data.message);
              break
            case "msgs":
              this.props.receiveMessages(data.messages);
              break
            case "update_msg":
              debugger
              this.props.updateMessage(data.message);
              break
            case "remove_msg":
              debugger 
              this.props.removeMessage
          }
        },
        speak: function(data) {
          return this.perform("speak", data);
        },
        load: function() {
          return this.perform("load", data.messageable_id)
        },
        unsubscribed: function() {
          return this.perform("unsubscribed")
        },
        subscribed: function() {
          return this.perform("subscribed")
        }
      });
  }
  
  componentDidMount() {
    this.configureChannelSubscription();
    return this.fetchChannelData();
  }
    
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id != this.props.match.params.id) {
      this.fetchChannelData()
        .then(() => {
          this.configureChannelSubscription();
        });
    } else if (prevProps != this.props && this.props.messages) {
      this.setState({
        messages: Object.values(this.props.messages)
      }, () => {
        this.scrollToBottom();
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
      });
  }

  scrollToBottom() {
    this.bottom.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    const msgs = this.props.messages.map((msg, i) => {
      let lastUserId = i === 0 ? null : this.props.messages[i - 1].user_id;
      return (<div key={i} >
        <Message message={msg} user_id={msg.user_id} key={i} lastUserId={lastUserId} />
      </div>);
    });
    return (
      <div>
        <SideBar currentUser={this.props.currentUser} />
        <TopNavBar currentChannel={this.props.currentChannel}/>
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
    messages: Object.values(state.entities.messages).length > 0 ? Object.values(state.entities.messages) : [],
    currentUser: state.entities.users[state.session.currentUserId] ? state.entities.users[state.session.currentUserId] : {name: "", id: 0},
    currentChannel: state.entities.channels[ownProps.match.params.id] ? state.entities.channels[ownProps.match.params.id] : {name: ""}
  }
};

const mdp = dispatch => ({
  fetchUsers: channelId => dispatch(fetchUsers(channelId)),
  receiveMessage: msg => dispatch(receiveMessage(msg)),
  receiveMessages: msgs => dispatch(receiveMessages(msgs)),
  fetchMessages: channelId => dispatch(fetchMessages(channelId)),
  fetchChannels: () => dispatch(fetchChannels()),
  updateMessage: message => dispatch(updateReduxMessage(message)),
  removeMessage: message => dispatch(removeMessage(message)),
});

export default withRouter(connect(msp, mdp)(ChatChannel));