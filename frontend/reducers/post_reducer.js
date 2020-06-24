import { RECEIVE_REVISIONS } from "../actions/post_actions";

const defaultState = {
  questions: [],
  posts: {},
  revisions: {}
}

/**
 * @typedef PostState
 * @property {Object.<number, {question_id: number, post_id: number}>} questions
 * @property {Object.<number, {post_id: number, revision_id: number}>} posts
 * @property {Object.<number, Revision>} revisions
 */

/**
 * @param {PostState} state
 * @param {PostActions} action
 */
export default function postReducer(state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_REVISIONS:
      const { questions, posts, revisions } = action.revisions;
      return { ...state, questions, posts, revisions };
    default:
      return state
  }
}