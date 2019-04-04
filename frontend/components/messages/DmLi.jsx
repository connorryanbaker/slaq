import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class DmLi extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const current = this.props.match.params.id == this.props.dm.id && this.props.match.path.match(/dms/);
    return (<li className={current ? "current-channel channel-li" : "channel-li"}>
      <Link to={`/dms/${this.props.dm.id}`} className={current ? "channel-link selected-link dm-link" : "channel-link dm-link"}>
                {this.props.dm.name.join("")}
              </Link>
            </li>);
  }
}

export default withRouter(DmLi);