import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import DmLi from './DmLi';
import { createDm, mostRecentUserDm } from '../../actions/dm_actions';


class DmsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false
    }
    this.showDmUsers = this.showDmUsers.bind(this);
    this.setupDm = this.setupDm.bind(this);
  }

  setupDm(id) {
    return () => {
      console.log(id);
      console.log(this.props.currentUser.id);
      this.props.createDm(this.props.currentUser.id, id)
        .then(() => {
          this.props.mostRecentUserDm(this.props.currentUser.id)
            .then(dm => {
              let dmId = dm.id;
              this.props.history.push(`/dms/${dmId}`);
            })
        }, () => {
          let dm = this.props.dms.find(dm => dm.users.includes(id));
          this.props.history.push(`/dms/${dm.id}`);
        });
    }
  }

  showDmUsers() {
    if (this.props.match.path.match(/messages/)) {
      this.setState({
        display: !this.state.display
      });
    }
  }

  render () {
    const dmLis = this.props.dms.map((el, i) => {
      return <DmLi dm={el} key={i} currentUser={this.props.currentUser} />
    });
    const users = this.props.users.map((el, i) => {
      return <li key={i} className="channel-li dm-link" onClick={this.setupDm(el.id)}>{el.name}</li>
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

const mdp = dispatch => ({
  createDm: (creatorId, receiverId) => dispatch(createDm(creatorId, receiverId)),
  mostRecentUserDm: creatorId => dispatch(mostRecentUserDm(creatorId))
})

export default withRouter(connect(msp, mdp)(DmsContainer));