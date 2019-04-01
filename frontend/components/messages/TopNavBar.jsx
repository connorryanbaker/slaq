import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class TopNavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="top-nav-wrapper">
        <div className="top-nav-left">
          <div className="main-top-nav-header">
            # {this.props.currentChannel.name}
          </div>
          <div className="top-nav-memberlist">
            <div id="star-icon"><i class="far fa-star"></i> | <i class="far fa-user"></i></div>
            <div className="top-nav-memberCount"> {this.props.userCount}</div>
          </div>
        </div>
        <div className="top-nav-right">
          <i class="fas fa-phone"></i>
          <i class="fas fa-info-circle"></i>
          <i class="fas fa-cog"></i>
          <div>
            <input type="text"></input>
          </div>
          <i class="fas fa-at"></i>
          <i class="far fa-star"></i>
        </div>
      </div>
    )
  }
}

const msp = (state, ownProps) => {
  return {
  userCount: Object.values(state.entities.users).length ? Object.values(state.entities.users).length : 0,
  }
};

export default withRouter(connect(msp, null)(TopNavBar));