import { Action } from "redux";

export const RECEIVE_UI_LOADING = "RECEIVE_UI_LOADING";

/**
 * @typedef {Action<RECEIVE_UI_LOADING>} ReceiveUiLoadingAction
 * @property {boolean} loading
 */

/**
 * @typedef {ReceiveUiLoadingAction} UiActions
 */

/**
 *
 * @param {boolean} loading
 * @returns
 */
export function receiveUiLoading(loading) {
  return {
    type: RECEIVE_UI_LOADING,
    loading
  }
}
