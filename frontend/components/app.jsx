import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Signup from "./session/signup";

const App = () => {
  return <HashRouter>
    <Route path="/signup" component={Signup} />
  </HashRouter>
}

export default App;