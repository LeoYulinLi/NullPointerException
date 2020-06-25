import React, { useState } from "react";
import { answerQuestion, askQuestion } from "../../actions/post_actions";
import { useDispatch } from "react-redux";
import ReactMarkdown from "react-markdown";

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
      <div className="form-group">
        <textarea rows={ 10 } id="body" value={ body } onChange={ event => setBody(event.target.value) }/>
        <ReactMarkdown className="post-text" source={ body }/>
      </div>
      <button className="button button-primary">Submit</button>
    </form>
  </div>

}

export default AnswerForm;