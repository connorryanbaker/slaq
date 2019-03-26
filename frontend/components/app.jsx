import React from 'react';
import { Route } from 'react-router-dom';
import SessionPage from './session/SessionPage';
import LandingPage from './landing_page/LandingPage';

const App = (props) => (
  <div>
    <Route exact path='/' component={LandingPage}/>
    <Route path='/signup' render={(props) => <SessionPage cpt={"signup"} />}/>
    <Route path='/login' render={(props) => <SessionPage cpt={"login"} />}/>
  </div>
)

export default App;