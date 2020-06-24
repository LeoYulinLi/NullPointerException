import React, { useState } from "react";
import { answerQuestion, askQuestion } from "../../actions/post_actions";
import { useDispatch } from "react-redux";

/**
 * @param {number} id
 */
const AnswerForm = ({ id }) => {

  const [body, setBody] = useState();

  const dispatch = useDispatch()

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(answerQuestion(id,{ body }));
  }

  return <div className="post-page">
    <form onSubmit={ handleSubmit }>
      <textarea id="body" value={ body } onChange={ event => setBody(event.target.value) }/>
      <button>Submit</button>
    </form>
  </div>

}

export default AnswerForm;