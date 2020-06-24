import { getQuestions, postQuestion } from "../utils/api_utlis";
import { refreshSession } from "./session_actions";
import { Action } from "redux";

export const RECEIVE_REVISIONS = 'RECEIVE_REVISIONS'

/**
 * @typedef Revision
 * @property {number} id
 * @property {string} title
 * @property {string} body
 * @property {string} note
 * @property {number} post_id
 * @property {number} user_id
 * @property {string} create_at
 */

/**
 * @typedef {Action<RECEIVE_REVISIONS>} ReceiveRevisionsAction
 * @property {QuestionIndexResponse} revisions
 */

/**
 * @typedef {ReceiveRevisionsAction} PostActions
 */

/**
 * @typedef QuestionIndexResponse
 * @property {Object.<number, {question_id: number, post_id: number}>} questions
 * @property {Object.<number, {post_id: number, revision_id: number}>} posts
 * @property {Object.<number, Revision>} revisions
 */


/**
 * @param {QuestionIndexResponse} revisions
 * @return {ReceiveRevisionsAction}
 */
function receiveRevision(revisions) {
  return {
    type: RECEIVE_REVISIONS,
    revisions: revisions
  }
}

/**
 * @typedef QuestionSummary
 * @property {Revision} revision
 * @property
 */

/**
 *
 * @param question
 */
function receiveQuestion(question) {

}

export function getQuestionIndex() {
  return function (dispatch) {
    return getQuestions()
      .then((response) => dispatch(receiveRevision(response)));
  };
}

export function askQuestion(question) {
  return function (dispatch) {
    postQuestion(question)
      .then(() => dispatch(refreshSession()))
  }
}