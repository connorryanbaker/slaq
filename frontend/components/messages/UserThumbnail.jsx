import React from 'react';
import { connect } from 'react-redux';
import { createDm } from '../../actions/dm_actions';

class UserThumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.setupDm = this.setupDm.bind(this);
  }

  setupDm() {
    this.props.createDm(this.props.currentUserId, this.props.user_id);
  }

  render() {
    const klass = this.props.display == false ? "hidden-user-thumbnail" : "user-thumbnail";
    const dmLink = <div onClick={this.setupDm}>Direct Message</div>;
    const currentUser = this.props.currentUserId === this.props.user_id;
    return (
      <div className={klass}>
        <div>
          <div onClick={this.props.updateDisplay}>X</div>
          <div>
            <img src={this.props.img_url} />
            <h1>{this.props.username}</h1>
          </div>
          { currentUser ? "" : dmLink }
        </div>
      </div>
    )
  }
}

const msp = state => ({
  currentUserId: state.session.currentUserId
});

const mdp = dispatch => ({
  createDm: (creatorId,receiverId) => dispatch(createDm(creatorId,receiverId))
})

export default connect(msp, mdp)(UserThumbnail);