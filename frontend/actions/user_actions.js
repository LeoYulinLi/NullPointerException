import { getUser } from "../utils/api_utlis";
import { receiveUser } from "./session_actions";
import { receiveUiLoading } from "./ui_actions";

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