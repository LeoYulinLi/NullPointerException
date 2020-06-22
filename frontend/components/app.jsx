import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Signup from "./session/signup";
import Login from "./session/login";

const App = () => {
  return <HashRouter>
    <Route path="/signup" component={Signup} />
    <Route path="/login" component={Login} />
  </HashRouter>
}

export default App;