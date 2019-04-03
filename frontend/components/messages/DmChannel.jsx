import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class DmChannel extends React.Component {
  constructor(props) {
    super(props);
  }

  configureDmSubscription() {
    App.cable.subscriptions.create(
      { channel: 'DmChannel', id: this.props.dmId},
      {
        received: data => {
          if (this.props.dmId === data.dm_id) {
            switch(data.type) {
              case "msg":
               this.props.receiveMessage(data.message);
               break 
            }
          }
        },
        speak: function(data) {
          return this.perform("speak",data);
        }
      }
    )
  }


}