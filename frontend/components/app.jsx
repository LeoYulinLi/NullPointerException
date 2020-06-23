import React, { useEffect } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Signup from "./session/signup";
import Login from "./session/login";
import { AuthRoute } from "../utils/route_util";
import { useDispatch, useSelector } from "react-redux";
import MainNav from "./main_nav";
import { refresh } from "../actions/session_actions";

const App = () => {

  const usernameSelector = state => state.session.user ? state.session.user.username : null;
  const username = useSelector(usernameSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refresh());
  })

  return <HashRouter>
    <MainNav />
    <Switch>
      <div className="main">
        <Route path="/" exact>
          <h1>Hello, { username ? username : "Guest" }</h1>
        </Route>
        <AuthRoute path="/signup" component={Signup} />
        <AuthRoute path="/login" component={Login} />
      </div>
    </Switch>
  </HashRouter>
}

export default App;