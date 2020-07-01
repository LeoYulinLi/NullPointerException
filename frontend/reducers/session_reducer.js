import { DELETE_SESSION, RECEIVE_USER } from "../actions/session_actions";

const defaultState = {
  user_id: null
}

/**
 * @typedef SessionState
 * @property {number | null} user_id
 */

/**
 * @param {SessionState} state
 * @param {SessionActions} action
 */
export default function sessionReducer(state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_USER:
      return { user_id: action.user.id };
    case DELETE_SESSION:
      return defaultState;
    default:
      return state;
  }
}