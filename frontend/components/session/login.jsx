import { useDispatch, useSelector } from "react-redux";
import React, { FormEvent } from "react";
import { login } from "../../actions/session_actions";
import ErrorAlert from "../error/error_alert";

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
    dispatch(login({ username, password }))
  }

  /**
   * @param {React.MouseEvent<HTMLButtonElement>} event
   */
  function fillDemo(event) {
    event.preventDefault();
    setUsername("demo");
    setPassword("demodemodemo");
  }

  return <div className="session">
    <ErrorAlert errors={ errors }/>
    <form onSubmit={ handleSubmit }>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input id="username" type="text" value={ username } onChange={ event => setUsername(event.target.value) }/>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={ password } onChange={ event => setPassword(event.target.value) }/>
      </div>
      <button className="button secondary" onClick={ event => fillDemo(event) }>Fill Demo Login</button>
      <button className="button primary">Login</button>
    </form>
  </div>

}

export default Login;