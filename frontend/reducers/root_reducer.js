import { combineReducers } from "redux";
import sessionReducer from "./session_reducer";
import errorReducer from "./error_reducers";

const rootReducer = combineReducers({
  session: sessionReducer,
  errors: errorReducer
});

export default rootReducer;

/**
 * @typedef {ReturnType<typeof rootReducer>} RootState
 */

/**
 * @typedef {SessionActions} RootAction
 */
