import { useDispatch } from "react-redux";
import React, { FormEvent } from "react";
import { login } from "../../actions/session_actions";

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
   * @param {FormEvent} event
   */
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(login({ username, password }))
  }

  return <div className="signup">
    <form onSubmit={handleSubmit}>
      <label>Username
        <input type="text" value={ username } onChange={ event => setUsername(event.target.value) }/>
      </label>
      <label>Password
        <input type="password" value={ password } onChange={ event => setPassword(event.target.value) }/>
      </label>
      <button>Login</button>
    </form>
  </div>

}

export default Login;