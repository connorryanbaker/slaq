import React from 'react';
import MessageForm from './MessageForm';
import Message from './Message';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/session_actions';


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
              break
            case "msgs": 
              this.setState({
                messages: data.messages
              });
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
      return <Message message={msg} user_id={msg.user_id} key={i} />
      // console.log(msg);
      // return <li key={i}>{msg.user_id} : {msg.content} </li>;
    });
    return (
      <div>
        <ul>
          {msgs}
        </ul>
        <MessageForm />
      </div>
    );
  }
}

const mdp = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers())
});

export default connect(null, mdp)(ChatChannel);