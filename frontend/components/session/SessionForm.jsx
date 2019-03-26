import React from 'react';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    const loginState = { email: "", password: "" };
    const signupState = { name: "", email: "", password: "" };
    this.state = this.props.formType === "login" ? loginState : signupState;
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return (e) => {
      this.setState({
        [field]: e.target.value
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state).then(() => this.props.history.push('/')).catch(e => this.props.history.push(`/${this.props.formType}`));
  
    // if (this.props.errors.length === 0) this.props.history.push('/');
  }

  render() {
    let errors;
    if (Array.isArray(errors)) {
      errors = this.props.errors.map((e,i) => {
        return <li key={i}>{e}</li>
      });
    } else {
      errors = <li>{this.props.errors}</li>;
    }
    return (
      <div className="session-form-container">
        {errors.props.children.length > 0 ? <ul>{errors}</ul> : ""}
        {this.props.formtype === 'signup' ? <h1>Sign Up</h1> : <h1>Sign In</h1>}
        <form onSubmit={this.handleSubmit} className="session-form">
          {this.props.formType === "signup" ? 
          <fieldset className='session-form-fieldset'>
              <input type="text"
                     onChange={this.update("name")}
                     value={this.state.name}/>
          </fieldset> : "" }
          <fieldset className='session-form-fieldset'>
              <input type="text"
                onChange={this.update("email")}
                value={this.state.email} />
          </fieldset>
          <fieldset className='session-form-fieldset'>
              <input type="password"
                onChange={this.update("password")}
                value={this.state.password} />
          </fieldset>
          <input className="session-button" type="submit" value={this.props.formType === "signup" ? "Create Account" : "Sign In"}/>
        </form>
      </div>
    )
  }
}

export default SessionForm;