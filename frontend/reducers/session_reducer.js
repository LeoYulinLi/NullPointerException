import { DELETE_SESSION, RECEIVE_SESSION } from "../actions/session_actions";

const defaultState = {
  user: null
}

/**
 * @typedef SessionState
 * @property {User | null} user
 */

/**
 * @param {{user: User | null}} state
 * @param {SessionActions} action
 */
export default function sessionReducer(state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_SESSION:
      return { user: action.user };
    case DELETE_SESSION:
      return defaultState;
    default:
      return state;
  }
}