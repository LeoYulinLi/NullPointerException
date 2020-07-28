import { getUser } from "../utils/api_utlis";
import { receiveUiLoading } from "./ui_actions";

export const RECEIVE_USER = 'RECEIVE_USER';

/**
 * @param {User} user
 * @returns {ReceiveSessionAction}
 */
export function receiveUser(user) {
  return {
    type: RECEIVE_USER,
    user
  }
}

/**
 * @param {number} userId
 */
export function fetchUser(userId) {
  return function (dispatch) {
    dispatch(receiveUiLoading(true));
    return getUser(userId)
      .then((user) => {
        dispatch(receiveUiLoading(false));
        return dispatch(receiveUser(user));
      })
  }
}