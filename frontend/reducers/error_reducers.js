import { CLEAR_SESSION_ERROR, RECEIVE_SESSION_ERROR } from "../actions/error_actions";

/**
 * @typedef ErrorState
 * @property {string[]} session
 */

/**
 * @type {ErrorState}
 */
const defaultState = {
  session: []
}

/**
 * @param {ErrorState} state
 * @param {ErrorActions} action
 */
export default function errorReducer(state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_SESSION_ERROR:
      return { ...state, session: action.errors };
    case CLEAR_SESSION_ERROR:
      return { ...state, session: [] };
    default:
      return state;
  }
}