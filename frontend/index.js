import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import { signUp, login, logout} from './actions/session_actions';
import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const store = configureStore();
  //TEST
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.signUp = signUp;
  window.login = login;
  window.logout = logout;


  ReactDOM.render(<Root store={store}/>,root);
});