/**
 * @type {{user: User | null}}
 */
import { DELETE_SESSION, RECEIVE_SESSION } from "../actions/session_actions";

/**
 * @type RootState
 */
const defaultState = {
  user: null
}

/**
 * @param {RootState} state
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