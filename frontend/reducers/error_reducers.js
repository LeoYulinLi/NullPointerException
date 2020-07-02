import {
  CLEAR_POST_ERROR,
  CLEAR_SESSION_ERROR,
  RECEIVE_POST_ERROR,
  RECEIVE_SESSION_ERROR
} from "../actions/error_actions";

/**
 * @typedef ErrorState
 * @property {string[]} session
 * @property {string[]} post
 */

/**
 * @type {ErrorState}
 */
const defaultState = {
  session: [],
  post: [],
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
    case RECEIVE_POST_ERROR:
      return { ...state, post: action.errors };
    case CLEAR_POST_ERROR:
      return { ...state, post: [] };
    default:
      return state;
  }
}