import React from 'react';
import { Link } from 'react-router-dom';

class DmLi extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<li>
              <Link to={`/dms/${this.props.dm.id}`}>
                {this.props.dm.name.join("")}
              </Link>
            </li>);
  }
}

export default DmLi;