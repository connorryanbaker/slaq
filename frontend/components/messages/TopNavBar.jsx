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
            <div id="star-icon"><i className="far fa-star"></i> | <i className="far fa-user"></i></div>
            <div className="top-nav-memberCount"> {this.props.userCount}</div>
          </div>
        </div>
        <div className="top-nav-right">
          <div className="top-nav-right-1">
            <i className="fas fa-phone"></i>
            <i className="fas fa-info-circle"></i>
            <i className="fas fa-cog"></i>
          </div>
          <div className="top-nav-right-2">
            <i className="fas fa-search top-nav-search-icon"></i>
            <input type="text" placeholder="Search"></input>
          </div>
          <div className="top-nav-right-3">
            <i className="fas fa-at"></i>
            <i className="far fa-star"></i>
          </div>
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