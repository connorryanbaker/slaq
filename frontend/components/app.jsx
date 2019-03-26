import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { logout } from '../actions/session_actions';
import SignupFormContainer from './session/SignupFormContainer';
import LoginFormContainer from './session/LoginFormContainer';

const MainComponent = (props) => {
  const user = props.currentUser;
  const btn = props.currentUser == "there" ? '' : <button onClick={props.logout}>Log Out!</button>;
  return (<div>
            <h1>Hello, {user}!</h1>
            {btn}
          </div>)
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

const mdp = dispatch => ({
  logout: () => dispatch(logout())
});

const MainComponentConnect = connect(msp, mdp)(MainComponent);

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