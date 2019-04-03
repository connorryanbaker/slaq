import React from 'react';

class MessageHeader extends React.Component {
  constructor(props) {
    super(props)
    this.parseTime = this.parseTime.bind(this);
    this.time = this.parseTime(this.props.message.created_at)
  }

  parseTime(time) {
    let extractedTime = time.split("T")[1].slice(0,5);
    if (extractedTime[0] == "0") {
      return extractedTime.slice(1).concat(" AM");
    } else {
      if (parseInt(extractedTime.slice(0, 2)) > 12) {
        return parseInt(extractedTime.slice(0, 2) - 12).toString().concat(extractedTime.slice(2)).concat(" PM")
      } else {
        return extractedTime.concat(" PM");
      }
    }
  }

  render() {
    return (
      <div className="message-user-img-row">
        {this.props.img_url.length > 0 ? <img className="avatar-img" src={this.props.img_url} /> : ""}
        <div className="msg-user-container">
          <div className="name-time"><b className="msg-username">{this.props.username}</b>
            <span className="msg-user-time">{this.time}</span>
          </div>
        </div>
      </div>
    )

  }
}
export default MessageHeader;