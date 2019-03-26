import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { logout } from '../actions/session_actions';
import SignupFormContainer from './session/SignupFormContainer';
import LoginFormContainer from './session/LoginFormContainer';
import LandingPage from './landing_page/LandingPage';

const App = (props) => (
  <div>
    <Route exact path='/' component={LandingPage}/>
    <Route path='/signup' component={SignupFormContainer}/>
    <Route path='/login' component={LoginFormContainer}/>
  </div>
)

export default App;