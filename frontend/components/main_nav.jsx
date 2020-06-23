import React from "react";
import { HashRouter, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/session_actions";

const MainNav = () => {

  const dispatch = useDispatch();

  const isLoggedInSelector = state => !!state.session.user
  const isLoggedIn = useSelector(isLoggedInSelector)

  return <nav className="header">
    <div className="nav-container">
      <div className="main-nav">
        <Link to="/"><p>Logo</p></Link>
      </div>
      <div className="control-nav">
        { isLoggedIn ? (<button className="button primary" onClick={() => dispatch(logout()) }>Log out</button>) :
          (<>
            <Link to="/login" className="button login">Log in</Link>
            <Link to="/signup" className="button primary">Sign up</Link>
          </>) }
      </div>
    </div>
  </nav>
};

export default MainNav;