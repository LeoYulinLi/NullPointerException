import React, { useEffect, useState } from "react";
import { HashRouter, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/session_actions";
import { userIdSelector } from "../selectors/selectors";
import '@fortawesome/fontawesome-free/js/all';
import { queryQuestions, receiveQuery } from "../actions/post_actions";
import { useHistory } from "react-router";

const ControlNavGuest = () => {
  return <div className="control-nav">
    <Link to="/login" className="button button-login">Log in</Link>
    <Link to="/signup" className="button button-primary">Sign up</Link>
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

  const history = useHistory();

  const showUserControl = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const $control = $('#user-control');
    $control.toggleClass("show");
    $(event.target).toggleClass("active");
  }

  const dispatchLogout = (event) => {
    event.preventDefault();
    dispatch(logout())
      .then(() => history.push("/"));
  }

  return <ul className="user-nav">
    <li>
      <Link to={ `/users/${ userId }` }>
        <p>{ user.display_name }</p>
      </Link>
    </li>
    <li className="dropdown-button">
      <a href="#" onClick={ showUserControl }>
        <p><i className="fas fa-cog"/></p>
      </a>
      <div className="dropdown" id="user-control">
        <ul>
          <li><a href="#" onClick={ dispatchLogout }>Logout</a></li>
        </ul>
      </div>
    </li>
  </ul>
}

const SearchBar = () => {

  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  const history = useHistory();

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  function handleSubmit(event) {
    event.preventDefault();
    setQuery("");
    history.push(`/search/${query}`);
  }

  return <form className="nav-search" onSubmit={ handleSubmit }>
    <input
      required
      type="text"
      className="muted"
      autoComplete="off"
      value={ query }
      onChange={ event => setQuery(event.target.value) }
      placeholder={ "Search..." }/>
    <span className="icon-box"><i className="fas fa-search search-icon"/></span>
  </form>
}

const MainNav = () => {

  /**
   * @type {number}
   */
  const userId = useSelector(userIdSelector)


  return <nav className="header">
    <div className="nav-container">
      <ul className="main-nav">
        <li><Link to="/"><p>Logo</p></Link></li>
        <li><Link to="/questions"><p>Questions</p></Link></li>
      </ul>
      <SearchBar/>
      { !!userId ? <ControlNavLoggedIn userId={ userId }/> : <ControlNavGuest/> }
    </div>
  </nav>
};

export default MainNav;