import React, { useState } from "react";
import { answerQuestion, askQuestion, getQuestionThread } from "../../actions/post_actions";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { FormBodyEditor } from "./widgets";
import { useHistory } from "react-router";
import { isLoggedInSelector } from "../../selectors/selectors";
import { Link } from "react-router-dom";

/**
 * @param {number} id
 */
const AnswerForm = ({ id }) => {

  const [body, setBody] = useState();

  const dispatch = useDispatch();

  const loggedIn = useSelector(isLoggedInSelector);

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(answerQuestion(id, { body }))
      .then(() => dispatch(getQuestionThread(id)));
  }

  const form = <div className="post-page">
    <h2>Your Answer</h2>
    <form onSubmit={ handleSubmit }>
      <FormBodyEditor body={ body } setBody={ setBody } rows={ 10 }/>
      <button className="button button-primary">Submit</button>
    </form>
  </div>

  const pleaseLoginMessage = <div className="post-page">
    <h2>You must <Link to="/login" className="primary">log in</Link> to answer this question.</h2>
  </div>

  return loggedIn ? form : pleaseLoginMessage

}

export default AnswerForm;