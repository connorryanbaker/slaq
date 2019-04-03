import React from 'react';
import { Route } from 'react-router-dom';
import SessionPage from './session/SessionPage';
import LandingPage from './landing_page/LandingPage';
import ChatChannel from './messages/ChatChannel';
import DmChannel from './messages/DmChannel';
import { AuthRoute, ProtectedRoute } from '../util/route_util.js';

const App = (props) => (
  <div>
    <AuthRoute exact path='/' component={LandingPage}/>
    <AuthRoute path='/signup' component={SessionPage}/>
    <AuthRoute path='/login' component={SessionPage}/>
    <ProtectedRoute path='/messages/:id' component={ChatChannel}/>
    <ProtectedRoute path='/dms/:id' component={DmChannel}/>
  </div>
)

export default App;