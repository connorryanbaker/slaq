import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Redirect } from 'react-router-dom';

const Auth = ({ render, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
    !loggedIn ? (
    render(props)
  ) : (
    <Redirect to="/" />
  )
  )}/>
)

const mapStateToProps = state => {
  return {loggedIn: Boolean(state.session.currentUserId)};
};

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));