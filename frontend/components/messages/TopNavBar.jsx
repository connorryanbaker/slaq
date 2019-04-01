import React from 'react';
import { connect } from 'react-redux';

class TopNavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="top-nav-wrapper">
        <div className="top-nav-left">
          {/* {this.props.channelName} */}
          <div className="main-top-nav-header">
            main
          </div>
          <div className="top-nav-memberlist">
            <div id="star-icon">*</div>
            <div className="top-nav-memberCount">
              <i class="fa fa-user"></i>
              {this.props.userCount}
            </div>
          </div>
        </div>
        <div className="top-nav-right"></div>
      </div>
    )
  }
}

const msp = state => ({
  userCount: Object.values(state.entities.users).length
});

export default connect(msp, null)(TopNavBar);