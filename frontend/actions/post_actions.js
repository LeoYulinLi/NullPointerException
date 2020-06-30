import {
  deletePost,
  getQuestion,
  getQuestions,
  patchPost,
  postQuestion,
  postQuestionAnswers, queryQuestion
} from "../utils/api_utlis";
import { refreshSession } from "./session_actions";
import { Action } from "redux";
import { receiveUiLoading } from "./ui_actions";

export const RECEIVE_QUESTIONS = 'RECEIVE_REVISIONS';
export const RECEIVE_THREAD = 'RECEIVE_THREAD';
export const RECEIVE_QUERY = 'RECEIVE_QUERY';

/**
 * @typedef PostCurrent
 * @property {number} question_id
 * @property {number} post_id
 * @property {number} revision_id
 * @property {boolean} is_question
 * @property {string} [title]
 * @property {string} body
 * @property {string} note
 * @property {{user_id: number, at: string}} create
 * @property {{[user_id]: number, at: string}} [update]
 * @property {{score: number, voted: "up"|"down"}} votes
 */

/**
 * @typedef {Action<RECEIVE_QUESTIONS>} ReceiveQuestionsAction
 * @property {QuestionIndexResponse} questions
 */

/**
 * @typedef {Action<RECEIVE_THREAD>} ReceiveThreadAction
 * @property {ThreadResponse} thread
 */

/**
 * @typedef {Action<RECEIVE_QUERY>} ReceiveQuery
 * @property {string} query
 */

/**
 * @typedef {ReceiveQuestionsAction | ReceiveThreadAction | ReceiveQuery} PostActions
 */

/**
 * @typedef QuestionSummary
 * @property {number} question_id
 * @property {number} answer_count
 * @property {number} vote_count
 * @property {string} title
 * @property {{action: string, user_id: number, at: string}} last_action
 */

/**
 * @typedef QuestionIndexResponse
 * @property {Object.<number, QuestionSummary>} questions
 * @property {Object.<number, User>} users
 */

/**
 * @typedef ThreadResponse
 * @property {Object.<number, PostCurrent>} post_currents
 * @property {Object.<number, User>} users
 */

/**
 * @param {QuestionIndexResponse} questions
 * @return {ReceiveQuestionsAction}
 */
function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
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
 * @param  {string} query
 * @returns {ReceiveThreadAction}
 */
export function receiveQuery(query) {
  return {
    type: RECEIVE_QUERY,
    query
  };
}


export function getQuestionIndex() {
  return function (dispatch) {
    dispatch(receiveUiLoading(true));
    return getQuestions()
      .then((response) => {
        dispatch(receiveQuestions(response));
        dispatch(receiveUiLoading(false));
      });
  };
}

export function queryQuestions(query) {
  return function (dispatch) {
    dispatch(receiveUiLoading(true));
    return queryQuestion(query)
      .then((response) => {
        dispatch(receiveQuestions(response));
        dispatch(receiveUiLoading(false));
      });
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
