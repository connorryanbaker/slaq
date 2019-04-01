import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      user_id: this.props.user_id,
      messageable_id: this.props.messageable_id
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

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.setState({
        messageable_id: this.props.match.params.id
      });
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
const msp = (state, ownProps) => ({
  messageable_id: ownProps.match.params.id
});
export default withRouter(connect(msp, null)(MessageForm));