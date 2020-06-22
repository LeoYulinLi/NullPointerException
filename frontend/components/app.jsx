import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Signup from "./session/signup";
import Login from "./session/login";
import { AuthRoute } from "../utils/route_util";

const App = () => {
  return <HashRouter>
    <AuthRoute path="/signup" component={Signup} />
    <AuthRoute path="/login" component={Login} />
  </HashRouter>
}

export default App;