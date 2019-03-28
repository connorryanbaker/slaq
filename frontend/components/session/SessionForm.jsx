import React from 'react';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.formType === "login" ? { email: "", password: "" } : { name: "", email: "", password: "" };

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.guestLogIn = this.guestLogIn.bind(this);
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

  guestLogIn() {
    this.props.loginGuest({ 
      "email": "guest@gmail.com", "password": "youguessedit"
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

    const errors = this.props.errors.map((e) => {
      return <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="warning"><path fill-rule="evenodd" d="M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z" /></svg>
              {e}</li>
    });
    const heading = (<p>Enter your {name}<b>email</b> and <b>password</b>.</p>)
    const errClassname = this.props.errors.length > 0 ? "session-form-container red-left" : ""


    return (
      <div>
        <div>
          <div className={errClassname}>
            {this.props.errors.length > 0 ? <ul className="session-error-list">{errors}</ul> : ""}
          </div>
        </div>
        <div className="session-form-container">
          <div className="form-heading">
            {header}
            {heading}
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
          {this.props.formType === "signup" ? <button className="session-button guest" onClick={this.guestLogIn}>Log In as Guest!</button> : ""}
        </div>
      </div>
    )
  }
}

export default SessionForm;