import { RECEIVE_QUESTIONS, RECEIVE_THREAD } from "../actions/post_actions";

const defaultState = {
  questions: {},
  posts: {},
  revisions: {}
}

/**
 * @typedef QuestionSummary
 * @property {number} question_id
 * @property {number} post_id
 * @property {boolean} edited
 * @property {number} answer_count
 * @property {number} vote_count
 */

/**
 * @typedef PostState
 * @property {Object.<number, QuestionSummary>} questions
 * @property {Object.<number, {post_id: number, revision_id: number}>} posts
 * @property {Object<number, PostCurrent>} post_currents
 * @property {Object.<number, Revision>} revisions
 */

/**
 * @param {PostState} state
 * @param {PostActions} action
 */
export default function postReducer(state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS: {
      const { questions, posts, revisions } = action.revisions;
      return { questions, posts, revisions };
    }
    case RECEIVE_THREAD: {
      const { post_currents, revisions } = action.thread;
      return { post_currents, revisions };
    }
    default:
      return state;
  }
}