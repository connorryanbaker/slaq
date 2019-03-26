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
    this.props.action(this.state);
    this.props.history.push('/');
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
        <form onSubmit={this.handleSubmit}>
          {this.props.formType === "signup" ? 
          <fieldset>
            <label>
              Name: 
              <input type="text"
                     onChange={this.update("name")}
                     value={this.state.name}/>
            </label>
          </fieldset> : "" }
          <fieldset>
            <label>
              Email:
              <input type="text"
                onChange={this.update("email")}
                value={this.state.email} />
            </label>
          </fieldset>
          <fieldset>
            <label>
              Password:
              <input type="password"
                onChange={this.update("password")}
                value={this.state.password} />
            </label>
          </fieldset>
          <input type="submit" value={this.props.formType === "signup" ? "Create Account" : "Sign In"}/>
        </form>
      </div>
    )
  }
}

export default SessionForm;