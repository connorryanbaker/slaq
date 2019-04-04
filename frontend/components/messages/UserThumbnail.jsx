import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { createDm, mostRecentUserDm  } from '../../actions/dm_actions';

class UserThumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.setupDm = this.setupDm.bind(this);
  }

  setupDm() {
    this.props.createDm(this.props.currentUserId, this.props.user_id)
      .then(() => {
        this.props.mostRecentUserDm(this.props.currentUserId)
          .then(dm => {
            let id = dm.id;
            this.props.history.push(`/dms/${id}`);
          })
      }, () => {
        let dm = this.props.dms.find(dm => dm.users.includes(this.props.user_id));
        this.props.history.push(`/dms/${dm.id}`);
      });
  }

  render() {
    const dmLink = <div onClick={this.setupDm}>Direct Message</div>;
    const currentUser = this.props.currentUserId === this.props.user_id;
    const component = !this.props.display ? "" : (<div className="user-thumbnail-wrapper" onClick={this.props.updateDisplay}>
                                                    <div className="user-thumbnail"> 
                                                      <img className='popup-avatar' src={this.props.img_url} />
                                                      <div className="thumbnail-content">
                                                        <h1 className="thumbnail-heading">{this.props.username}</h1>
                                                        {currentUser ? "" : dmLink}
                                                      </div>
                                                    </div>
                                                  </div>);
    return component;
  }
}

const msp = state => ({
  currentUserId: state.session.currentUserId,
  dms: state.entities.dms ? Object.values(state.entities.dms) : []
});

const mdp = dispatch => ({
  createDm: (creatorId,receiverId) => dispatch(createDm(creatorId,receiverId)),
  mostRecentUserDm: creatorId => dispatch(mostRecentUserDm(creatorId))
})

export default withRouter(connect(msp, mdp)(UserThumbnail));