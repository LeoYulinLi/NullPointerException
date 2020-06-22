import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Signup from "./session/signup";
import Login from "./session/login";
import { AuthRoute } from "../utils/route_util";
import { useSelector } from "react-redux";

const App = () => {

  const usernameSelector = state => state.session.user.username;

  const username = useSelector(usernameSelector);

  return <div className="main">
    <HashRouter>
      <Switch>
        <Route path="/">
          <h1>Hello, { username ? username : "Guest" }</h1>
        </Route>
        <AuthRoute path="/signup" component={Signup} />
        <AuthRoute path="/login" component={Login} />
      </Switch>
    </HashRouter>
  </div>
}

export default App;