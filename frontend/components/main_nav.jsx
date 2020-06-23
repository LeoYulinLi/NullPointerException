import React from "react";
import { HashRouter, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/session_actions";

const MainNav = () => {

  const dispatch = useDispatch();

  const isLoggedInSelector = state => !!state.session.user
  const isLoggedIn = useSelector(isLoggedInSelector)

  return <nav className="main-nav">
    { isLoggedIn ? (<button className="button primary" onClick={() => dispatch(logout()) }>Log out</button>) :
      (<>
        <Link to="/login" className="button secondary">Log in</Link>
        <Link to="/signup" className="button primary">Sign up</Link>
      </>) }
  </nav>
};

export default MainNav;