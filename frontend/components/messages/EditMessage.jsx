import React from 'react';
import { connect } from 'react-redux';
import { deleteMessage } from '../../actions/message_actions';

class EditMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.message.content,
      id: this.props.message.id
    }
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
  }

  delete() {
    this.props.updateEdit();
    this.props.deleteMessage(this.state.id);
  }

  update(field) {
    return e => {
      this.setState({
        [field]: e.target.value
      });
    }
  }

  render() {
    return (
      <div className="edit-message-container">
        <input type="text" 
               className="edit-message-bar"
               value={this.state.content} 
               onChange={this.update("content")} />
        <div className="edit-message-buttons-container">
          <button onClick={this.props.updateEdit} className="cancel-edit-message">
            Cancel
          </button>
          <button onClick={this.props.makeUpdate(this.state)} className="edit-message-button">
            Save Changes
          </button>
          <button onClick={this.delete} className="delete-message-button">
            Delete Message
          </button>
        </div>
      </div>
    )
  }
}

const mdp = dispatch => ({
  deleteMessage: id => dispatch(deleteMessage(id))
});

export default connect(null, mdp)(EditMessage);