import React, { useEffect } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Signup from "./session/signup";
import Login from "./session/login";
import { AuthRoute, ProtectedRoute } from "../utils/route_util";
import { useDispatch, useSelector } from "react-redux";
import MainNav from "./main_nav";
import { refreshSession } from "../actions/session_actions";
import { clearSessionError } from "../actions/error_actions";
import AskForm from "./post/ask_form";
import QuestionsIndex from "./post/questions_index";
import { isLoggedInSelector } from "../selectors/selectors";
import Thread from "./post/thread";
import EditForm from "./post/edit_form";
import SearchResult from "./search";
import UserInfo from "./user/user_info";

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
          { isLoggedIn ? <QuestionsIndex/> : <h1>Hello, Guest</h1> }
        </Route>
        <Route path="/questions" exact component={ QuestionsIndex }/>
        <Route path="/questions/:id" exact component={ Thread }/>
        <Route path="/search" exact component={ SearchResult }/>
        <Route path="/search/:query" exact component={ SearchResult }/>
        <Route path="/users/:id" exact component={ UserInfo }/>
        <AuthRoute path="/signup" component={ Signup }/>
        <AuthRoute path="/login" component={ Login }/>
        <ProtectedRoute path="/ask" component={ AskForm }/>
        <ProtectedRoute path="/posts/:id/edit" exact component={ EditForm }/>
        <Route path="/"><h1>Nothing to See Here owo</h1></Route>
      </Switch>
    </div>
  </HashRouter>
}

export default App;