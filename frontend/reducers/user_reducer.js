import { RECEIVE_QUESTIONS, RECEIVE_THREAD } from "../actions/post_actions";
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
      return { ...state, ...action.questions.users };
    case RECEIVE_SESSION:
      return { ...state, [action.user.id]: action.user };
    case RECEIVE_THREAD:
      return { ...state, ...action.thread.users };
    default:
      return state;
  }
}