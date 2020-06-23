import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import React from "react";
import { withRouter } from "react-router-dom";

const isLoggedInSelector = state => !!state.session.user

const Auth = ({ path, component: Component }) => {
  const isLoggedIn = useSelector(isLoggedInSelector);
  return <Route path={ path } render={ props =>
    isLoggedIn ? <Redirect to="/" /> : <Component { ...props } />
  } />;
};

const Protected = ({ path, component: Component }) => {
  const isLoggedIn = useSelector(isLoggedInSelector);
  return <Route path={ path } render={ props =>
    isLoggedIn ? <Component { ...props } /> : <Redirect to="/login" />
  } />;
};

export const AuthRoute = withRouter(Auth);
export const ProtectedRoute = withRouter(Protected);