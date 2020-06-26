import { useDispatch, useSelector } from "react-redux";
import React, { FormEvent } from "react";
import { login } from "../../actions/session_actions";
import ErrorAlert from "../error/error_alert";
import { Link } from "react-router-dom";

const { useState } = require("react");

/**
 * @typedef FormUser
 * @property {string} username
 * @property {string} password
 */

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  /**
   *
   * @param {RootState} state
   * @returns {string[]}
   */
  const errorsSelector = state => state.errors.session

  const errors = useSelector(errorsSelector);

  /**
   * @param {FormEvent} event
   */
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(login({ username, password }));
  }

  /**
   * @param {React.MouseEvent<HTMLButtonElement>} event
   */
  function loginAsDemo(event) {
    event.preventDefault();
    dispatch(login({ username: "demo", password: "demodemodemo" }));
  }

  return <div className="session-page">
    <ErrorAlert errors={ errors }/>
    <div className="session">
      <form onSubmit={ handleSubmit }>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input required id="username" type="text" value={ username } onChange={ event => setUsername(event.target.value) }/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input required id="password" type="password" value={ password } onChange={ event => setPassword(event.target.value) }/>
        </div>
        <button type="button" className="button button-muted" onClick={ loginAsDemo }>Login as Demo</button>
        <button className="button button-primary">Login</button>
      </form>
    </div>
    <p className="session-help">Don't have an account? <Link className="primary" to="/signup">Sign up</Link></p>
  </div>

}

export default Login;