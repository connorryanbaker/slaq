import React from 'react';
import { Route } from 'react-router-dom';

const MainComponent = (props) => (
  <div><h1>Welcome!</h1></div>
);

const SignupFormContainer = (props) => (
  <div>Signup mate!</div>
);

const LoginFormContainer = (props) => (
  <div>Log in why don't you mate!</div>
);


const App = (props) => (
  <div>
    <Route exact path='/' component={MainComponent}/>
    <Route path='/signup' component={SignupFormContainer}/>
    <Route path='/login' component={LoginFormContainer}/>
  </div>
)

export default App;