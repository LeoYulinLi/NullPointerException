import { combineReducers } from "redux";
import sessionReducer from "./session_reducer";
import errorReducer from "./error_reducers";
import postReducer from "./post_reducer";
import userReducer from "./user_reducer";
import uiReducer from "./ui_reducer";

const rootReducer = combineReducers({
  session: sessionReducer,
  errors: errorReducer,
  posts: postReducer,
  users: userReducer,
  ui: uiReducer
});

export default rootReducer;

/**
 * @typedef RootState
 * @property {SessionState} session
 * @property {ErrorState} errors
 * @property {PostState} posts
 * @property {UserState} users
 * @property {UiState} ui
 */

/**
 * @typedef {SessionActions | PostActions | ErrorActions | UiActions} RootAction
 */
