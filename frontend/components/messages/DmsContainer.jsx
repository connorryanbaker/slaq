import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import DmLi from './DmLi';

class DmsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false
    }
    this.showDmUsers = this.showDmUsers.bind(this);
  }

  showDmUsers() {
    this.setState({
      display: !this.state.display
    });
  }

  render () {
    const dmLis = this.props.dms.map((el, i) => {
      return <DmLi dm={el} key={i} currentUser={this.props.currentUser} />
    });
    const users = this.props.users.map((el, i) => {
      return <li key={i} className="channel-li dm-link">{el.name}</li>
    });

    const klass = this.state.display ? "dm-users" : "hidden-dms";
    return (
      <>
      <div className="sidebar-dms-header" onClick={this.showDmUsers}>
        Direct Messages <i className="fas fa-plus-circle"></i>
      </div>
      <div className="sidebar-channel-name">
        <ul className="channels-list">
          {this.state.display? users : dmLis}
        </ul>
      </div>
      </>
    )
  }
}

const msp = state => ({
  dms: Object.values(state.entities.dms) ? Object.values(state.entities.dms) : [],
  users: Object.values(state.entities.users) ? Object.values(state.entities.users) : [],
  currentUser: Object.values(state.entities.users).length > 0 && state.session.currentUserId ? 
                state.entities.users[state.session.currentUserId] : { name: ""}
});

export default withRouter(connect(msp, null)(DmsContainer));