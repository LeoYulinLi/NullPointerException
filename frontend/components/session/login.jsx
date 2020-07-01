import { useDispatch, useSelector } from "react-redux";
import React, { FormEvent, useEffect, useLayoutEffect, useRef } from "react";
import { login, refreshSession } from "../../actions/session_actions";
import ErrorAlert from "../error/error_alert";
import { Link } from "react-router-dom";
import { clearSessionError } from "../../actions/error_actions";
import { LoadingButton } from "../widgets";

const { useState } = require("react");

/**
 * @typedef FormUser
 * @property {string} username
 * @property {string} password
 */

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const unmounted = useRef(false);

  const dispatch = useDispatch();

  const clearLoading = () => {
    !unmounted.current && setLoading(false)
  };

  /**
   *
   * @param {RootState} state
   * @returns {string[]}
   */
  const errorsSelector = state => state.errors.session

  const errors = useSelector(errorsSelector);

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    dispatch(login({ username, password }))
  }

  /**
   * @param {React.MouseEvent<HTMLButtonElement>} event
   */
  function loginAsDemo(event) {
    event.preventDefault();
    setLoading(true);
    setUsername('demo');
    setPassword('demodemodemo');
    dispatch(login({ username: "demo", password: "demodemodemo" }))
  }

  useLayoutEffect(() => {
    const $main = $('.main');
    $main.addClass('full-height');
    return () => {
      $main.removeClass('full-height');
      unmounted.current = true;
    };
  }, []);

  useEffect(() => {
    dispatch(refreshSession());
    return () => dispatch(clearSessionError());
  }, []);

  useLayoutEffect(() => {
    const $root = $('#root');
    $root.addClass("dim-background");
    return () => $root.removeClass("dim-background");
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [errors]);

  return <div className="session-page">
    <ErrorAlert errors={ errors }/>
    <div className="session">
      <form onSubmit={ handleSubmit }>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input required id="username" type="text" value={ username }
                 onChange={ event => setUsername(event.target.value) }/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input required id="password" type="password" value={ password }
                 onChange={ event => setPassword(event.target.value) }/>
        </div>
        <LoadingButton type="button" style="button-muted" onClick={ loginAsDemo } loading={ loading }>
          Log In as Demo
        </LoadingButton>
        <LoadingButton loading={ loading }>Login</LoadingButton>
      </form>
    </div>
    <p className="session-help">Don't have an account? <Link className="primary" to="/signup">Sign up</Link></p>
  </div>

}

export default Login;