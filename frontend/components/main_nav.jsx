import { AuthRoute, ProtectedRoute } from "../utils/route_util";
import React from "react";
import { HashRouter, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/session_actions";

const MainNav = () => {

  const dispatch = useDispatch();

  const isLoggedInSelector = state => !!state.session.user
  const isLoggedIn = useSelector(isLoggedInSelector)

  return <nav className="main-nav">
    { isLoggedIn && <button className="primary-button" onClick={() => dispatch(logout()) }>Log out</button> }
  </nav>
};

export default MainNav;