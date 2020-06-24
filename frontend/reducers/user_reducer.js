import { Action } from "redux";
import { RECEIVE_REVISIONS } from "../actions/post_actions";

/**
 * @typedef {Object<number, User>} UserState
 */

/**
 * @param {UserState} state
 * @param {RootAction} action
 */
export default function userReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_REVISIONS:
      return { ...state, ...action.revisions.users };
    default:
      return state;
  }
}