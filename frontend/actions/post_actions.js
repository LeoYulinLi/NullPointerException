import { postQuestion } from "../utils/api_utlis";
import { refreshSession } from "./session_actions";
import React from "react";
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
 * @property {{[number]: Revision}}revisions
 */


/**
 * @param {{[number]: Revision}} revisions
 * @return {ReceiveRevisionsAction}
 */
function receiveRevisions(revisions) {
  return {
    type: RECEIVE_REVISIONS,
    revisions
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

export function askQuestion(question) {
  return function (dispatch) {
    postQuestion(question)
      .then(() => dispatch(refreshSession()))
  }
}