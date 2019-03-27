import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class SplashEmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return (e) => {
      if (this.props.errors.length > 0) this.props.clearErrors();
      this.setState({
        [field]: e.target.value
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.input.length === 0) {
      this.props.receiveErrors(["Please fill out your email address!"])
    } else {
      return this.props.history.push({ pathname: '/signup', state: { email: this.state.input } });
    }
  }

  render() {
    const errors = this.props.errors.length > 0 ? <div class="splash-errors">{this.props.errors[0]}</div> : ""

    return (
      <div className="splash-email-wrapper">
        <div className="splash-email-form">
          {errors}
          <div className="splash-email">
            <input className="splash-input" type="text" placeholder="Email address" onChange={this.update("input")} />
            <Link to='/signup' className='splash-link'><button onClick={this.handleSubmit} className='btn-purple splash-btn'>GET STARTED</button></Link>
          </div>
          <p className="splash-footnote">Already using slaq? <Link className="splash-signin-link" to='/login'>Sign In.</Link></p>
        </div>
      </div>
    )
  }
}

const msp = state => ({
  errors: state.errors.session
});

export default withRouter(connect(msp, null)(SplashEmailForm));