/**
 * @typedef UiState
 * @property {boolean} loading
 */

import { RECEIVE_UI_LOADING } from "../actions/ui_actions";

/**
 * @type {UiState}
 */
const defaultState = {
  loading: false
};

/**
 * @param {UiState} state
 * @param {RootAction} action
 */
export default function uiReducer(state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_UI_LOADING:
      return { loading: action.loading };
    default:
      return state;
  }
}