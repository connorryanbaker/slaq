import React from 'react';

class EditMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.message.content,
      id: this.props.message.id
    }
    this.update = this.update.bind(this);
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
        </div>
      </div>
    )
  }
}

export default EditMessage;