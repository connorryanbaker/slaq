import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import DmLi from './DmLi';

class DmsContainer extends React.Component {
  render () {
    const dmLis = this.props.dms.map((el, i) => {
      return <DmLi dm={el} key={i} currentUser={this.props.currentUser} />
    });
    return (
      <>
      <div className="sidebar-dms-header">
        Direct Messages <i className="fas fa-plus-circle"></i>
      </div>
      <div className="sidebar-channel-name">
        <ul className="channels-list">
          {dmLis}
        </ul>
      </div>
      </>
    )
  }
}

const msp = state => ({
  dms: Object.values(state.entities.dms) ? Object.values(state.entities.dms) : [],
  currentUser: Object.values(state.entities.users).length > 0 && state.session.currentUserId ? 
                state.entities.users[state.session.currentUserId] : { name: ""}
});

export default withRouter(connect(msp, null)(DmsContainer));