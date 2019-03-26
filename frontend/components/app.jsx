import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import SignupFormContainer from './session/SignupFormContainer';
import LoginFormContainer from './session/LoginFormContainer';

const MainComponent = (props) => {
  const user = props.currentUser;
  return (<div><h1>Hello, {user}!</h1></div>)
};

const msp = state => {
  if (state.session.currentUserId) {
    return {
      currentUser: state.entities.users[state.session.currentUserId].name
    }
  } else {
    return {
      currentUser: "there"
    }
  }
};

const MainComponentConnect = connect(msp, null)(MainComponent);

// const SignupFormContainer = (props) => (
//   <div>Signup mate!</div>
// );

// const LoginFormContainer = (props) => (
//   <div>Log in why don't you mate!</div>
// );


const App = (props) => (
  <div>
    <Route exact path='/' component={MainComponentConnect}/>
    <Route path='/signup' component={SignupFormContainer}/>
    <Route path='/login' component={LoginFormContainer}/>
  </div>
)

export default App;