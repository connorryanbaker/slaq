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
          // console.log(data);
          switch(data.type) {
            case "msg": 
              const { user_id, content, updated_at } = data.message;
              const msg = { user_id, content, updated_at };
              this.setState({
                messages: this.state.messages.concat(msg)
              });
              break
            case "msgs": 
            console.log(data);
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

  componentDidUpdate() {
    // this.bottom.current.scrollIntoView();
    if (this.state.messages.length === 0) {
      App.cable.subscriptions.subscriptions[0].load();
    }
  }

  render() {
    // console.log(this.state.messages);
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