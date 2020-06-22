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

  return <div className="login">
    <ErrorAlert errors={errors} />
    <form onSubmit={handleSubmit}>
      <label>Username
        <input type="text" value={ username } onChange={ event => setUsername(event.target.value) }/>
      </label>
      <label>Password
        <input type="password" value={ password } onChange={ event => setPassword(event.target.value) }/>
      </label>
      <button className="button-primary">Login</button>
    </form>
  </div>

}

export default Login;