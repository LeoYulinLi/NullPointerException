import { RECEIVE_QUERY, RECEIVE_QUESTIONS, RECEIVE_THREAD } from "../actions/post_actions";

const defaultState = {
  questions: {},
  revisions: {}
}

/**
 * @typedef PostState
 * @property {Object<number, QuestionSummary>} questions
 * @property {Object<number, PostCurrent>} post_currents
 * @property {string} query
 */

/**
 * @param {PostState} state
 * @param {PostActions} action
 */
export default function postReducer(state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS: {
      const { questions } = action.questions;
      return { questions, query: state.query };
    }
    case RECEIVE_THREAD: {
      const { post_currents, revisions } = action.thread;
      return { post_currents, revisions };
    }
    default:
      return state;
  }
}