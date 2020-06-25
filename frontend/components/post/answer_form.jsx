import React, { useState } from "react";
import { answerQuestion, askQuestion } from "../../actions/post_actions";
import { useDispatch } from "react-redux";
import ReactMarkdown from "react-markdown";
import { FormBodyEditor } from "./widgets";

/**
 * @param {number} id
 */
const AnswerForm = ({ id }) => {

  const [body, setBody] = useState();

  const dispatch = useDispatch()

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(answerQuestion(id, { body }));
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