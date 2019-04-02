import React from 'react';

class MessageHeader extends React.Component {
  constructor(props) {
    super(props)
    this.parseTime = this.parseTime.bind(this);
  }

  parseTime(time) {
    debugger
    const extractedTime = time.split("T")[1].slice(0, 5);
    let formattedTime;
    if (extractedTime[0] == "0") {
      formattedTime = extractedTime.slice(1);
    } else if (extractedTime[0] == "1") {
      formattedTime = parseInt(extractedTime.slice(0, 2)) > 12 ? (parseInt(extractedTime.slice(0, 2) - 12).toString().concat(extractedTime.slice(2))) : extractedTime;
    }
    debugger
    return formattedTime;
  }

  render() {
    return (
      <div className="message-user-img-row">
        {this.props.img_url.length > 0 ? <img className="avatar-img" src={this.props.img_url} /> : ""}
        <div className="msg-user-container">
          <div className="name-time"><b className="msg-username">{this.props.username}</b>
            <span className="msg-user-time">{this.parseTime(this.props.message.created_at)}</span>
          </div>
        </div>
      </div>
    )

  }
}
export default MessageHeader;