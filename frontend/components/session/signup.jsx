import { useDispatch, useSelector } from "react-redux";
import React, { FormEvent, useEffect, useLayoutEffect } from "react";
import { signup } from "../../actions/session_actions";
import ErrorAlert from "../error/error_alert";
import { Link } from "react-router-dom";
import { clearSessionError } from "../../actions/error_actions";

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

  useLayoutEffect(() => {
    const $main = $('.main');
    $main.addClass('full-height');
    return () => $main.removeClass('full-height');
  }, []);

  useEffect(() => {
    return () => dispatch(clearSessionError());
  }, []);

  useLayoutEffect(() => {
    const $root = $('#root');
    $root.addClass("dim-background");
    return () => $root.removeClass("dim-background");
  }, [])

  /**
   * @param {FormEvent} event
   */
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(signup({ username, password, email }))
  }

  return <div className="session-page">
    <ErrorAlert errors={errors} />
    <div className="session">
      <form onSubmit={ handleSubmit }>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input required id="username" pattern=".{3,}" type="text" value={ username } onChange={ event => setUsername(event.target.value) }/>
          <small>Username must contain at least 3 characters</small>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input required id="email" type="email" value={ email } onChange={ event => setEmail(event.target.value) }/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input required id="password"  pattern=".{8,}" type="password" value={ password } onChange={ event => setPassword(event.target.value) }/>
          <small>Passwords must contain at least 8 characters</small>
        </div>
        <button className="button button-primary">Sign Up</button>
      </form>
    </div>
    <p className="session-help">Already have an account? <Link className="primary" to="/login">Log in</Link></p>
  </div>

}

export default Signup;