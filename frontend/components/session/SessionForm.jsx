import React from 'react';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.formType === "login" ? { email: "", password: "" } : { name: "", email: "", password: "" };

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
    const errorFn = this.props.history.push;
    const formType = this.props.formType;


    this.props.action(this.state).then(() => {
      this.props.history.push('/messages')
    }, (e) => {
      errorFn(formType);
    });
  }



  componentDidMount() {
    if (this.props.errors.length === 0) this.props.clearErrors();
    if (this.props.location.state) {
      this.setState({
        email: this.props.location.state.email
      });
    }
  }

  render() {
    const name = this.props.formType === 'signup' ? <span><b>name</b>, </span> : "";
    const header = this.props.formType === 'signup' ? <h1 className="formh1">Sign Up</h1> : <h1 className="formh1">Sign In</h1>;

    let errClasses = this.props.errors.map((e) => e.split(" ")[0]);

    const nameErrors = errClasses.includes("Name") ? "session-error" : ""
    const emailErrors = errClasses.includes("Email") ? "session-error" : ""
    const passwordErrors = errClasses.includes("Password") ? "session-error" : ""
    const signInErr = errClasses.includes("Invalid") ? "session-error" : ""

   
    return (
      <div className="session-form-container">
        <div className="form-heading">
          {header}
          {<p>Enter your {name}<b>email</b> and <b>password</b>.</p>}
        </div>
        <form onSubmit={this.handleSubmit} className="session-form">
          {this.props.formType === "signup" ?
            <fieldset className='session-form-fieldset'>
              <input type="text"
                className={`session-input ${nameErrors} ${signInErr}`}
                onChange={this.update("name")}
                placeholder='Name'
                value={this.state.name} />
            </fieldset> : ""}
          <fieldset className='session-form-fieldset'>
            <input type="text"
              className={`session-input ${emailErrors} ${signInErr}`}
              onChange={this.update("email")}
              placeholder='Email address'
              value={this.state.email} />
          </fieldset>
          <fieldset className='session-form-fieldset'>
            <input type="password"
              className={`session-input ${passwordErrors} ${signInErr}`}
              onChange={this.update("password")}
              placeholder='Password'
              value={this.state.password} />
          </fieldset>
          <div className='button-wrapper'>
            <input className="session-button" type="submit" value={this.props.formType === "signup" ? "Create Account" : "Sign In"} />
          </div>
        </form>
      </div>
    )
  }
}

export default SessionForm;