import React from 'react';
import MessageForm from './MessageForm';
import Message from './Message';
import { Waypoint } from 'react-waypoint';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { fetchChannels } from '../../actions/channel_actions';
import { fetchDms } from '../../actions/dm_actions';
import { fetchDmUsers } from '../../actions/session_actions';
import { fetchDmMessages, fetchPaginatedDmMessages, removeMessage, 
         receiveMessage, receiveMessages, updateReduxMessage } from '../../actions/message_actions';
import SideBar from './SideBar';
import TopNavBar from './TopNavBar';

class DmChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    }
    this.configureDmSubscription = this.configureDmSubscription.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.fetchDmData = this.fetchDmData.bind(this);
    this.fetchNextPage = this.fetchNextPage.bind(this);
  }

  configureDmSubscription() {
    if (App.cable.subscriptions['subscriptions'].length > 0) {
      App.cable.subscriptions.remove(App.cable.subscriptions['subscriptions'][0])
    };
      App.cable.subscriptions.create(
        { channel: this.props.channelType, id: this.props.dmId},
        {
          received: data => {
            if (this.props.dmId == data.dm_id) {
              switch(data.type) {
                case "dm_msg":
                  this.props.receiveMessage(data.message);
                  break; 
                case "update_msg":
                  this.props.updateMessage(data.message);
                  break
                case "remove_msg":
                  this.props.removeMessage(data.message);
                  break
                default: 
                  return;
              }
            }
          },
          speak: function(data) {
            return this.perform("speak",data);
          },
          unsubscribe: function() {
            return this.perform("unsubscribed");
          }
        }
      )
    // }
  }
  
  componentDidMount () {
    this.configureDmSubscription();
    return this.fetchDmData()
      .then(() => {
        if (!Object.keys(this.props.dms).includes(this.props.match.params.id)) {
          this.props.history.push('/messages/1');
        } else {
          this.scrollToBottom();
        }
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id != this.props.match.params.id) {
      this.fetchDmData()
        .then(() => {
          if (!Object.keys(this.props.dms).includes(this.props.match.params.id)) {
            this.props.history.puhs('/messages/1');
          } else {
            this.configureDmSubscription();
            App.cable.subscriptions.remove(App.cable.subscriptions['subscriptions'][0])
          }
        });
    } else {
      this.scrollToBottom();
    }
  }

  fetchDmData() {
    return this.props.fetchDmUsers(this.props.dmId)
      .then(() => this.props.fetchDmMessages(this.props.dmId))
      .then(() => this.props.fetchChannels())
      .then(() => this.props.fetchDms(this.props.currentUser.id))
  }

  fetchNextPage() {
    this.props.fetchPaginatedDmMessages(this.props.dmId, this.state.page)
      .then(() => {
        this.setState({
          page: this.state.page + 1
        }, () => {
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
    window.scroll({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  render() {
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
        <TopNavBar currentChannel={this.props.currentDm} />
        <ul className="messages-list">
          <Waypoint onEnter={this.fetchNextPage} />
          {msgs}
          <div ref={(e) => { this.bottom = e }} />
        </ul>
        <MessageForm user_id={this.props.currentUser.id} 
                     channelType={this.props.channelType}
                     id={this.props.dmId}/>
        <div id="bottom" />
      </div>
    );
  }
}

const msp = (state, ownProps) => {
  return {
    channelType: 'DmChannel',
    dmId: ownProps.match.params.id,
    messages: Object.values(state.entities.messages).length > 0 ? Object.values(state.entities.messages) : [],
    currentUser: state.entities.users[state.session.currentUserId] ? state.entities.users[state.session.currentUserId] : { name: "", id: 0 },
    dms: state.entities.dms,
    currentDm: state.entities.dms[ownProps.match.params.id] ? state.entities.dms[ownProps.match.params.id] : { name: "" }
  }
};

const mdp = dispatch => ({
  fetchDmUsers: dmId => dispatch(fetchDmUsers(dmId)),
  receiveMessage: msg => dispatch(receiveMessage(msg)),
  receiveMessages: msgs => dispatch(receiveMessages(msgs)),
  fetchDmMessages: dmId => dispatch(fetchDmMessages(dmId)),
  fetchChannels: () => dispatch(fetchChannels()),
  updateMessage: message => dispatch(updateReduxMessage(message)),
  removeMessage: message => dispatch(removeMessage(message)),
  fetchPaginatedDmMessages: (dmId, page) => dispatch(fetchPaginatedDmMessages(dmId, page)),
  fetchDms: userId => dispatch(fetchDms(userId)),
});

export default withRouter(connect(msp, mdp)(DmChannel));

