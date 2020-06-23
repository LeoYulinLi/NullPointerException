import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { askQuestion } from "../../actions/post_actions";

/**
 * @typedef AskForm
 * @property {string} title
 * @property {string} body
 */

/**
 * @typedef EditQuestionForm
 * @property {number} id
 * @property {string} title
 * @property {string} body
 * @property {string} note
 */

/**
 * Ask Question Component
 */
const Ask = () => {

  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(askQuestion({ title, body }));
  }

  return <div className="post-page">
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">
          Title
          <small>Be specific and imagine you’re asking a question to another person</small>
        </label>
        <input id="title" type="text" value={ title } onChange={ event => setTitle(event.target.value) }/>
      </div>
      <div className="form-group">
        <label htmlFor="body">
          Body
          <small>Include all the information someone would need to answer your question</small>
        </label>
        <textarea id="body" value={ body } onChange={ event => setBody(event.target.value) }/>
      </div>
      <button>Submit</button>
    </form>
  </div>
};

export default Ask;