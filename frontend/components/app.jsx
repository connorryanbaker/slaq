import React from 'react';
import { Route } from 'react-router-dom';
import SessionPage from './session/SessionPage';
import LandingPage from './landing_page/LandingPage';
import Greeting from './messages/greeting';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = (props) => (
  <div>
    <Route exact path='/' component={LandingPage}/>
    <AuthRoute path='/signup' render={(props) => <SessionPage match={props.match} cpt={"signup"} />}/>
    <AuthRoute path='/login' render={(props) => <SessionPage cpt={"login"} />}/>
    <ProtectedRoute path='/messages' component={Greeting} />
  </div>
)

export default App;