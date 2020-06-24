import { Action, Dispatch } from 'redux';
import { deleteSessionCurrent, getSession, postSession, postUser } from "../utils/api_utlis";
import { clearSessionError, receiveSessionError } from "./error_actions";

export const RECEIVE_SESSION = 'RECEIVE_SESSION';
export const DELETE_SESSION = 'DELETE_SESSION';

/**
 * @typedef User
 * @property {number} id
 * @property {string} username
 * @property {string} display_name
 */

/**
 * @typedef {Action<RECEIVE_SESSION>} ReceiveSessionAction
 * @property {User} user
 */

/**
 * @typedef {Action<DELETE_SESSION>} DeleteSessionAction
 */

/**
 * @typedef {ReceiveSessionAction | DeleteSessionAction} SessionActions
 */

/**
 * @param {User} user
 * @returns {ReceiveSessionAction}
 */
function receiveSession(user) {
  return {
    type: RECEIVE_SESSION,
    user
  }
}

/**
 * @returns {DeleteSessionAction}
 */
function deleteSession() {
  return {
    type: DELETE_SESSION
  };
}

/**
 * @param {SignupFormUser} user
 */
export function signup(user) {
  return (dispatch) => {
    return postUser(user)
      .then(/** @param {User} user*/(user) => {
        dispatch(clearSessionError());
        dispatch(receiveSession(user));
      }, (err) => {
        dispatch(receiveSessionError(err));
      });
  }
}

/**
 * @param {FormUser} user
 */
export function login(user) {
  return (dispatch) => {
    return postSession(user)
      .then(/** @param {User} user*/(user) => {
        dispatch(clearSessionError());
        dispatch(receiveSession(user));
      }, (err) => {
        dispatch(receiveSessionError(err));
      });
  };
}

export function logout() {
  return (dispatch) => {
    return deleteSessionCurrent()
      .then(() => {
        dispatch(deleteSession());
      }, (err) => {
        dispatch(receiveSessionError(err));
      });
  }
}

export function refreshSession() {
  return (dispatch) => {
    return getSession()
      .then(() => {}, () => {
        dispatch(deleteSession());
      })
  }
}