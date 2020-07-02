import { Action } from 'redux';

export const RECEIVE_SESSION_ERROR = 'RECEIVE_SESSION_ERROR';
export const CLEAR_SESSION_ERROR = 'CLEAR_SESSION_ERROR';
export const RECEIVE_POST_ERROR = 'RECEIVE_POST_ERROR';
export const CLEAR_POST_ERROR = 'CLEAR_POST_ERROR';

/**
 * @typedef {Action<RECEIVE_SESSION_ERROR>} ReceiveSessionErrorAction
 * @property {string[]} errors
 */

/**
 * @typedef {Action<CLEAR_SESSION_ERROR>} ClearSessionErrorAction
 */

/**
 * @typedef {Action<RECEIVE_POST_ERROR>} ReceivePostErrorAction
 * @property {string[]} errors
 */

/**
 * @typedef {Action<CLEAR_POST_ERROR>} ClearPostErrorAction
 */

/**
 * @param {string[]} errors
 * @returns ReceiveSessionErrorAction
 */
export function receiveSessionError(errors) {
  return {
    type: RECEIVE_SESSION_ERROR,
    errors: errors.responseJSON
  }
}

/**
 * @returns ClearSessionErrorAction
 */
export function clearSessionError() {
  return {
    type: CLEAR_SESSION_ERROR
  }
}

/**
 * @param errors
 * @returns ReceivePostErrorAction
 */
export function receivePostError(errors) {
  return {
    type: RECEIVE_POST_ERROR,
    errors: errors.responseJSON
  }
}

/**
 * @returns ClearPostErrorAction
 */
export function clearPostError() {
  return {
    type: CLEAR_POST_ERROR
  }
}

/**
 * @typedef {ReceiveSessionErrorAction | ClearSessionErrorAction | ReceivePostErrorAction | ClearPostErrorAction} ErrorActions
 */
