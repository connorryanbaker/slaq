import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class TopNavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.channels || Object.values(this.props.channels).length == 0) return null;
    debugger
    return (
      <div className="top-nav-wrapper">
        <div className="top-nav-left">
          <div className="main-top-nav-header">
            {this.props.channels[this.props.match.params.id].name}
          </div>
          <div className="top-nav-memberlist">
            <div id="star-icon">*</div>
            <div className="top-nav-memberCount">Users: {this.props.userCount}</div>
          </div>
        </div>
        <div className="top-nav-right"></div>
      </div>
    )
  }
}

const msp = (state, ownProps) => {
  return {
  userCount: Object.values(state.entities.users).length,
  channels: state.entities.channels
  }
};

export default withRouter(connect(msp, null)(TopNavBar));