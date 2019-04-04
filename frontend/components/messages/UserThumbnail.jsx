import React from 'react';
import { connect } from 'react-redux';
import { createDm } from '../../actions/dm_actions';

class UserThumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.setupDm = this.setupDm.bind(this);
  }

  setupDm() {
    //createDm(currentUserId, this.props.user_id).
    // .then(() => {
    //  getLastInsertRowId and redirect to dm 
    //})  
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <img src={this.props.img_url} />
            <h1>{this.props.username}</h1>
          </div>
          <div onClick={this.setupDm}>
            Direct Message
          </div>
        </div>
      </div>
    )
  }
}