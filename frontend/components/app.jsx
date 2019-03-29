import React from 'react';
import { Route } from 'react-router-dom';
import SessionPage from './session/SessionPage';
import LandingPage from './landing_page/LandingPage';
import Greeting from './messages/greeting';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = (props) => (
  <div>
    <AuthRoute exact path='/' component={LandingPage}/>
    <AuthRoute path='/signup' component={SessionPage}/>
    <AuthRoute path='/login' component={SessionPage}/>
    <ProtectedRoute path='/messages' component={Greeting}/>
  </div>
)

export default App;