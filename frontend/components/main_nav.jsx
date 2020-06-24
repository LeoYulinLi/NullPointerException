import React from "react";
import { HashRouter, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/session_actions";

const ControlNavGuest = () => {
  return <div className="control-nav">
    <Link to="/login" className="button login">Log in</Link>
    <Link to="/signup" className="button primary">Sign up</Link>
  </div>
}

const ControlNavLoggedIn = () => {

  const dispatch = useDispatch();

  return <div className="control-nav">
     <button className="button primary" onClick={ () => dispatch(logout()) }>Log out</button>
  </div>
}

const MainNav = () => {

  const isLoggedInSelector = state => !!state.session.user
  const isLoggedIn = useSelector(isLoggedInSelector)

  return <nav className="header">
    <div className="nav-container">
      <div className="main-nav">
        <Link to="/"><p>Logo</p></Link>
      </div>
      { isLoggedIn ? <ControlNavLoggedIn /> : <ControlNavGuest /> }
    </div>
  </nav>
};

export default MainNav;