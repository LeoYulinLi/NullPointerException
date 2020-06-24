import React from "react";
import { HashRouter, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/session_actions";
import { userIdSelector } from "../selectors/selectors";

const ControlNavGuest = () => {
  return <div className="control-nav">
    <Link to="/login" className="button login">Log in</Link>
    <Link to="/signup" className="button primary">Sign up</Link>
  </div>
}

/**
 * @param {number} userId
 */
const ControlNavLoggedIn = ({ userId }) => {

  const dispatch = useDispatch();

  /**
   * @param {RootState} state
   */
  const userSelector = state => state.users[userId]

  /**
   * @type {User}
   */
  const user = useSelector(userSelector);

  return <div className="control-nav">
    <Link to={ `/users/${ userId }` }>{ user.display_name }</Link>
    <button className="button primary" onClick={ () => dispatch(logout()) }>Log out</button>
  </div>
}

const MainNav = () => {

  /**
   * @type {number}
   */
  const userId = useSelector(userIdSelector)


  return <nav className="header">
    <div className="nav-container">
      <div className="main-nav">
        <Link to="/"><p>Logo</p></Link>
      </div>
      { !!userId ? <ControlNavLoggedIn userId={ userId }/> : <ControlNavGuest/> }
    </div>
  </nav>
};

export default MainNav;