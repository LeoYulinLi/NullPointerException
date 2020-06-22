import { Action } from 'redux';

export const RECEIVE_SESSION_ERROR = 'RECEIVE_SESSION_ERROR';
export const CLEAR_SESSION_ERROR = 'CLEAR_SESSION_ERROR';

/**
 * @typedef {Action<RECEIVE_SESSION_ERROR>} ReceiveSessionErrorAction
 * @property {string[]} errors
 */

/**
 * @typedef {Action<CLEAR_SESSION_ERROR>} ClearSessionErrorAction
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
 * @typedef {ReceiveSessionErrorAction | ClearSessionErrorAction} ErrorActions
 */
