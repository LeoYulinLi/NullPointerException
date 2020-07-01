import React, { useState } from "react";
import { answerQuestion, askQuestion, getQuestionThread } from "../../actions/post_actions";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { FormBodyEditor } from "../widgets";
import { useHistory } from "react-router";
import { isLoggedInSelector } from "../../selectors/selectors";
import { Link } from "react-router-dom";

/**
 * @param {number} id
 */
const AnswerForm = ({ id }) => {

  const [body, setBody] = useState();

  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();

  const loggedIn = useSelector(isLoggedInSelector);

  function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    dispatch(answerQuestion(id, { body }))
      .then(() => {
        setBody("");
        dispatch(getQuestionThread(id));
        setSubmitting(false);
      }, () => setSubmitting(false));
  }

  const form = <div className="post-page">
    <h2>Your Answer</h2>
    <form onSubmit={ handleSubmit }>
      <FormBodyEditor body={ body } setBody={ setBody } rows={ 10 } disabled={ submitting }/>
      <button className="button button-primary" disabled={ submitting }>
        { submitting ? <div className="loading-ring-small" /> : "Submitting" }
      </button>
    </form>
  </div>

  const pleaseLoginMessage = <div className="post-page">
    <h2>You must <Link to="/login" className="primary">log in</Link> to answer this question.</h2>
  </div>

  return loggedIn ? form : pleaseLoginMessage

}

export default AnswerForm;