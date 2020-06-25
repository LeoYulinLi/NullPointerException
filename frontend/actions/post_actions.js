import { getQuestion, getQuestions, patchPost, postQuestion, postQuestionAnswers } from "../utils/api_utlis";
import { refreshSession } from "./session_actions";
import { Action } from "redux";
import { receiveUiLoading } from "./ui_actions";

export const RECEIVE_QUESTIONS = 'RECEIVE_REVISIONS';
export const RECEIVE_THREAD = 'RECEIVE_THREAD';

/**
 * @typedef Revision
 * @property {number} id
 * @property {string} [title]
 * @property {string} body
 * @property {string} note
 * @property {number} post_id
 * @property {number} user_id
 * @property {string} created_at
 */

/**
 * @typedef PostCurrent
 * @property {number} question_id
 * @property {number} post_id
 * @property {number} revision_id
 * @property {string} [title]
 * @property {string} body
 * @property {string} note
 * @property {number} user_id
 * @property {string} created_at
 */

/**
 * @typedef {Action<RECEIVE_QUESTIONS>} ReceiveQuestionsAction
 * @property {QuestionIndexResponse} revisions
 */

/**
 * @typedef {Action<RECEIVE_THREAD>} ReceiveThreadAction
 * @property {ThreadResponse} thread
 */

/**
 * @typedef {ReceiveQuestionsAction | ReceiveThreadAction} PostActions
 */

/**
 * @typedef QuestionIndexResponse
 * @property {Object.<number, {question_id: number, post_id: number}>} questions
 * @property {Object.<number, {post_id: number, revision_id: number}>} posts
 * @property {Object.<number, Revision>} revisions
 * @property {Object.<number, User>} users
 */

/**
 * @typedef ThreadResponse
 * @property {Object.<number, PostCurrent>} post_currents
 * @property {Object.<number, User>} users
 */

/**
 * @param {QuestionIndexResponse} revisions
 * @return {ReceiveQuestionsAction}
 */
function receiveQuestions(revisions) {
  return {
    type: RECEIVE_QUESTIONS,
    revisions: revisions
  }
}

/**
 * @param  {ThreadResponse} thread
 * @returns {ReceiveThreadAction}
 */
function receiveThread(thread) {
  return {
    type: RECEIVE_THREAD,
    thread
  }
}

/**
 * @typedef QuestionSummary
 * @property {Revision} revision
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
      .then((response) => dispatch(receiveQuestions(response)));
  };
}

export function askQuestion(question) {
  return function (dispatch) {
    return postQuestion(question)
      .then(() => dispatch(refreshSession()));
  }
}

/**
 * @param {number} id
 */
export function getQuestionThread(id) {
  return function (dispatch) {
    dispatch(receiveUiLoading(true));
    return getQuestion(id)
      .then((response) => {
        dispatch(receiveThread(response));
        dispatch(receiveUiLoading(false));
      }, () => receiveUiLoading(false));
  };
}

/**
 * @param {number} id
 * @param {{body: string}} post
 */
export function answerQuestion(id, post) {
  return function (dispatch) {
    return postQuestionAnswers(id, post)
      .then(() => dispatch(refreshSession()));
  }
}

/**
 * @param {EditPostForm} post
 */
export function editPost(post) {
  return function (dispatch) {
    return patchPost(post)
      .then(() => dispatch(refreshSession()));
  }
}