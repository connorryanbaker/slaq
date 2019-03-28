import React from 'react';
import MessageForm from './MessageForm';
class ChatChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] }
    this.bottom = React.createRef();
  }

  componentDidMount() {
    App.cable.subscriptions.create(
      { channel: 'ChatChannel' },
      {
        received: data => {
          const { user_id, content, updated_at } = data;
          const msg = { user_id, content, updated_at };
          this.setState({
            messages: this.state.messages.concat(msg)
          });
        },
        speak: function(data) {
          return this.perform("speak", data);
        }
      }
    )
  }

  componentDidUpdate() {
    // this.bottom.current.scrollIntoView();
  }

  render() {
    console.log(this.state.messages);
    const msgs = this.state.messages.map((msg, i) => {
      return <li key={i}>{msg.user_id} : {msg.content} </li>;
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

export default ChatChannel;