import React, { useEffect } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Signup from "./session/signup";
import Login from "./session/login";
import { AuthRoute, ProtectedRoute } from "../utils/route_util";
import { useDispatch, useSelector } from "react-redux";
import MainNav from "./main_nav";
import { refreshSession } from "../actions/session_actions";
import { clearSessionError } from "../actions/error_actions";
import Ask from "./post/ask";
import QuestionsIndex from "./post/questions_index";
import { isLoggedInSelector } from "../selectors/selectors";

const App = () => {

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(isLoggedInSelector)

  useEffect(() => {
    dispatch(refreshSession());
    dispatch(clearSessionError());
  })

  return <HashRouter>
    <MainNav/>
    <div className="main">
      <Switch>
        <Route path="/" exact>
          { isLoggedIn ? <QuestionsIndex/> : <h1>Hello, Guest</h1>}
        </Route>
        <Route path="/questions" exact component={ QuestionsIndex }/>
        <AuthRoute path="/signup" component={ Signup }/>
        <AuthRoute path="/login" component={ Login }/>
        <ProtectedRoute path="/ask" component={ Ask }/>
        <Route path="/"><h1>Nothing to See Here owo</h1></Route>
      </Switch>
    </div>
  </HashRouter>
}

export default App;