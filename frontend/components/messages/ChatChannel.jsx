import React from 'react';
import MessageForm from './MessageForm';
import Message from './Message';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/session_actions';
import { receiveMessages, receiveMessage } from '../../actions/message_actions';


class ChatChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] }
    this.bottom = React.createRef();
  }
  
  componentDidMount() {
    this.props.fetchUsers();
    App.cable.subscriptions.create(
      { channel: 'ChatChannel' },
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
            case "msgs": 
              this.setState({
                messages: data.messages
              });
              this.props.receiveMessages(data.messages);
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
  }



  render() {
    const msgs = this.state.messages.map((msg, i) => {
      return (<div>
              <Message message={msg} user_id={msg.user_id} key={i} />
            </div>);
    });
    return (
      <div>
        <ul>
          {msgs}
        </ul>
        <MessageForm />
        <div ref={this.bottom}/>
      </div>
    );
  }
}

const mdp = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  receiveMessage: msg => dispatch(receiveMessage(msg)),
  receiveMessages: msgs => dispatch(receiveMessages(msgs))
});

export default connect(null, mdp)(ChatChannel);