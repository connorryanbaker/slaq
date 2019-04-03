import React from 'react';
import MessageForm from './MessageForm';
import Message from './Message';
import { Waypoint } from 'react-waypoint';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUsers } from '../../actions/session_actions';
import { receiveMessages, receiveMessage, 
         fetchMessages, updateReduxMessage, removeMessage, fetchPaginatedMessages } from '../../actions/message_actions';
import { fetchChannels } from '../../actions/channel_actions';
import SideBar from './SideBar';
import TopNavBar from './TopNavBar';


class ChatChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
    this.bottom = React.createRef();
    this.firstMessage = React.createRef();

    this.configureChannelSubscription = this.configureChannelSubscription.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.fetchChannelData = this.fetchChannelData.bind(this);
    this.fetchNextPage = this.fetchNextPage.bind(this);
  }

  configureChannelSubscription() {
    App.cable.subscriptions.create(
      { channel: 'ChatChannel', id: this.props.channelId },
      {
        received: data => {
          if (this.props.match.params.id == data.channel_id) {
            switch(data.type) {
              case "msg": 
                this.props.receiveMessage(data.message);
                break
              case "msgs":
                if (data.current_user_id === this.props.currentUser.id) {
                  this.props.receiveMessages(data.messages);
                }
                break
              case "update_msg":
                this.props.updateMessage(data.message);
                break
              case "remove_msg":
                this.props.removeMessage(data.message);
                break
            }
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
    return this.fetchChannelData()
      .then(() => {
        document.getElementById("bottom").scrollIntoView({ behavior: "smooth" });
      });
  }
    
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id != this.props.match.params.id) {
      this.fetchChannelData()
        .then(() => {
          this.configureChannelSubscription();
        });
    }
  }

  fetchChannelData() {
    return this.props.fetchUsers(this.props.channelId)
      .then(() => {
        this.props.fetchMessages(this.props.channelId);
      }).then(() => {
        this.props.fetchChannels()
      });
  }

  fetchNextPage() {
    this.props.fetchPaginatedMessages(this.props.channelId, this.state.page)
      .then(() => {
        this.setState({
          page: this.state.page + 1
        },() => {
          if (this.state.page > 2) {
            window.scroll({
              top: 1175,
              behavior: 'auto'
            });
          }
        });
      });
  }

  scrollToBottom() {
    this.bottom.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    console.log(this.state.page);
    const msgs = this.props.messages.map((msg, i) => {
      let lastUserId = i === 0 ? null : this.props.messages[i - 1].user_id;
      let id = i === 0 ? this.state.page : "";
      return (<div key={i} id={id}>
        <Message message={msg} user_id={msg.user_id} key={i} lastUserId={lastUserId} />
      </div>);
    });
    return (
      <div>
        <SideBar currentUser={this.props.currentUser} />
        <TopNavBar currentChannel={this.props.currentChannel}/>
        <ul className="messages-list">
          <Waypoint onEnter={this.fetchNextPage} />
          {msgs}
          <div ref={(e) => { this.bottom = e }} />
        </ul>
        <MessageForm user_id={this.props.currentUser.id}/>
        <div id="bottom"/>
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
  fetchPaginatedMessages: (channelId, page) => dispatch(fetchPaginatedMessages(channelId,page)),
});

export default withRouter(connect(msp, mdp)(ChatChannel));