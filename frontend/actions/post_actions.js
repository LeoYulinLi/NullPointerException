import { postQuestion } from "../utils/api_utlis";
import { refreshSession } from "./session_actions";


export function askQuestion(question) {
  return function (dispatch) {
    postQuestion(question)
      .then(() => dispatch(refreshSession()))
  }
}