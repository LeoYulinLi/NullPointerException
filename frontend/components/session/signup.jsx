import { useDispatch, useSelector } from "react-redux";
import React, { FormEvent } from "react";
import { signup } from "../../actions/session_actions";
import ErrorAlert from "../error/error_alert";

const { useState } = require("react");

/**
 * @typedef SignupFormUser
 * @property {string} username
 * @property {string} email
 * @property {string} password
 */

const Signup = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
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
    dispatch(signup({ username, password, email }))
  }

  return <div className="signup">
    <ErrorAlert errors={errors} />
    <form onSubmit={ handleSubmit }>
      <label>Username
        <input type="text" value={ username } onChange={ event => setUsername(event.target.value) }/>
      </label>
      <label>Email
        <input type="text" value={ email } onChange={ event => setEmail(event.target.value) }/>
      </label>
      <label>Password
        <input type="password" value={ password } onChange={ event => setPassword(event.target.value) }/>
      </label>
      <button>Sign Up</button>
    </form>
  </div>

}

export default Signup;