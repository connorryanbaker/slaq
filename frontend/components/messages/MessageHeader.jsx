import React from 'react';
import UserThumbnail from './UserThumbnail';
class MessageHeader extends React.Component {
  constructor(props) {
    super(props)
    this.parseTime = this.parseTime.bind(this);
    this.time = this.parseTime(this.props.message.created_at)
    this.state = {
      display: false
    }
    this.updateDisplay = this.updateDisplay.bind(this);
  }

  parseTime(time) {
    let extractedTime = time.split("T")[1].slice(0,5);
    if (extractedTime[0] == "0") {
      return extractedTime.slice(1).concat(" AM");
    } else if (parseInt(extractedTime.slice(0,2)) < 12) {
      return extractedTime.concat(" AM");
    } else {
      if (parseInt(extractedTime.slice(0, 2)) > 12) {
        return parseInt(extractedTime.slice(0, 2) - 12).toString().concat(extractedTime.slice(2)).concat(" PM")
      } else {
        return extractedTime.concat(" PM");
      }
    }
  }

  updateDisplay() {
    this.setState({
      display: !this.state.display
    });
  }

  render() {
    debugger
    return (
      <div className="message-user-img-row" onClick={this.updateDisplay}>
        {this.props.img_url.length > 0 ? <img className="avatar-img" src={this.props.img_url} /> : ""}
        <div className="msg-user-container">
          <div className="name-time"><b className="msg-username">{this.props.username}</b>
            <span className="msg-user-time">{this.time}</span>
          </div>
        </div>
        <UserThumbnail username={this.props.username}
                       user_id={this.props.user_id}
                       img_url={this.props.img_url}
                       display={this.state.display}
                       removeDisplay={this.removeDisplay}/>
      </div>
    )

  }
}
export default MessageHeader;