import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Redirect } from 'react-router-dom';

const Auth = ({ component: Component, path, loggedIn, exact }) => {
  return (
    <Route path={path} exact={exact} render={(props) => (
      !loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/messages" />
    )
    )}/>
  )
}


const Protected = ({ component: Component, path, loggedIn, exact }) => {
  return (
    <Route path={path} exact={exact} render={(props) => (
      loggedIn ? (
        <Component {...props} />
        )  : (
          <Redirect to="/" />
        )   
    )
    }/>

  )
}


const mapStateToProps = (state, ownProps) => {
  return {loggedIn: Boolean(state.session.currentUserId)};
};

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));