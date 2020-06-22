import Root from "./components/root";
import ReactDOM from "react-dom";
import React from "react";
import configureStore from "./store/store";

document.addEventListener("DOMContentLoaded", () => {
  const store = configureStore();
  ReactDOM.render(<Root store={store} />, document.getElementById("root"));
})