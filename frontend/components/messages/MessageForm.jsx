import React from 'react';
import { connect } from 'react-redux';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      user_id: this.props.user
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
    App.cable.subscriptions.subscriptions[0].speak({ message: this.state });
    this.setState({ content: "" });
  }

  render() {
    return (
    <form onSubmit={this.handleSubmit} className="msg-input-form">
      <input type="text"
             value={this.state.content}
             onChange={this.update("content")}
             className="msg-bar" />
      <input type="submit" value="send!" className="msg-form-submit"/>
    </form>
    );
  }
}

const msp = state => ({
  user: state.entities.users[state.session.currentUserId].id
});

export default connect(msp, null)(MessageForm);