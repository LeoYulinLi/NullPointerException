import { RECEIVE_QUESTIONS } from "../actions/post_actions";
import { RECEIVE_SESSION } from "../actions/session_actions";

/**
 * @typedef {Object<number, User>} UserState
 */

/**
 * @param {UserState} state
 * @param {RootAction} action
 */
export default function userReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return { ...state, ...action.revisions.users };
    case RECEIVE_SESSION:
      return { ...state, [action.user.id]: action.user };
    default:
      return state;
  }
}