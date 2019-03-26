import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import { signUp, login, logout} from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const store = configureStore();
  //TEST
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.signUp = signUp;
  window.login = login;
  window.logout = logout;


  ReactDOM.render(<h1>holaa!!</h1>,root);
});