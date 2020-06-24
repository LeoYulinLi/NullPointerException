import { combineReducers } from "redux";
import sessionReducer from "./session_reducer";
import errorReducer from "./error_reducers";
import postReducer from "./post_reducer";

const rootReducer = combineReducers({
  session: sessionReducer,
  errors: errorReducer,
  posts: postReducer
});

export default rootReducer;

/**
 * @typedef {ReturnType<typeof rootReducer>} RootState
 */

/**
 * @typedef {SessionActions} RootAction
 */
