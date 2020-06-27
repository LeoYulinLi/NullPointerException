import React, { useState } from "react";
import { answerQuestion, askQuestion, getQuestionThread } from "../../actions/post_actions";
import { useDispatch } from "react-redux";
import ReactMarkdown from "react-markdown";
import { FormBodyEditor } from "./widgets";
import { useHistory } from "react-router";

/**
 * @param {number} id
 */
const AnswerForm = ({ id }) => {

  const [body, setBody] = useState();

  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(answerQuestion(id, { body }))
      .then(() => dispatch(getQuestionThread(id)));
  }

  return <div className="post-page">
    <h2>Your Answer</h2>
    <form onSubmit={ handleSubmit }>
      <FormBodyEditor body={ body } setBody={ setBody } rows={ 10 }/>
      <button className="button button-primary">Submit</button>
    </form>
  </div>

}

export default AnswerForm;