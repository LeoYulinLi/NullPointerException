import { combineReducers } from "redux";
import sessionReducer from "./session_reducer";

const rootReducer = combineReducers({
  session: sessionReducer
});

export default rootReducer;

/**
 * @typedef {ReturnType<typeof rootReducer>} RootState
 */

/**
 * @typedef {SessionActions} RootAction
 */
