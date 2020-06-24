import { RECEIVE_REVISIONS } from "../actions/post_actions";

const defaultState = {
  questions: [],
  posts: {},
  revisions: {}
}

/**
 * @param {QuestionIndexResponse} state
 * @param {PostActions} action
 */
export default function postReducer(state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_REVISIONS:
      return { ...state, ...action.revisions };
    default:
      return state
  }
}