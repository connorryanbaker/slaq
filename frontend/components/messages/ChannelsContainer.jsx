import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class ChannelsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const channelLis = this.props.channels.map((el, i) => {
      return (<li key={i} className={this.props.match.params.id === el.id ? "current-channel" : ""}>
                <Link to={`/messages/${el.id}`}>
                  {el.name}
                </Link>
              </li>);
    });
    return (
      <div className="sidebar-channels-wrapper">
        <div className="sidebar-channels-header">
          Channels
          </div>
        <div className="sidebar-channel-name current-channel">
          <ul>
            {channelLis}
          </ul>
        </div>
      </div>
    )
  }
}

export default withRouter(ChannelsContainer);