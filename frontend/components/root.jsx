import React from "react";
import Store from 'redux';
import { Provider } from "react-redux";
import App from "./app";

/**
 * @param {Store<any, RootAction>} store
 */
const Root = ({store}) => {
  return <Provider store={store}>
    <App />
  </Provider>
}

export default Root;