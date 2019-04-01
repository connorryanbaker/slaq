import React from 'react';
import { connect } from 'react-redux';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      user_id: this.props.user_id
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  update(field) {
    return (e) => {
      this.setState({
        [field]: e.target.value
      })
    }
  }
  
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.content.length > 0) {
      App.cable.subscriptions.subscriptions[0].speak({ message: this.state });
      this.setState({ content: "" });
    }
  }

  render() {
    return (
    <form onSubmit={this.handleSubmit} className="msg-input-form">
      <div className="msg-bar-wrapper">
        <button className="msg-plus-icon">+</button>
        <input type="text"
              value={this.state.content}
              onChange={this.update("content")}
              className="msg-bar"
              placeholder="Enter your message..." />
      </div>
    </form>
    );
  }
}

const msp = state => ({
  user: state.entities.users[state.session.currentUserId].id
});

export default connect(msp, null)(MessageForm);